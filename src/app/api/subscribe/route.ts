import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, preferences } = await request.json()

    // 1. Simple backend email validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'El correo electrónico es requerido.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El formato del correo electrónico no es válido.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const audienceId = process.env.RESEND_AUDIENCE_ID

    // 2. Local development fallback if API keys are not yet configured
    if (!apiKey) {
      console.warn(
        '⚠️ RESEND_API_KEY no configurado en .env.local. Simulando suscripción de:',
        email,
        'Preferencias:', preferences
      )
      // Simulate network lag
      await new Promise((resolve) => setTimeout(resolve, 800))
      return NextResponse.json({
        success: true,
        message: 'Suscripción simulada correctamente (Entorno local).',
      })
    }

    if (!audienceId) {
      console.warn(
        '⚠️ RESEND_AUDIENCE_ID no configurado. Se requiere una Audience ID en Resend para almacenar contactos.'
      )
      return NextResponse.json(
        { error: 'Configuración incompleta: Falta el ID de la Audiencia en Resend.' },
        { status: 500 }
      )
    }

    // Convert preferences to Resend custom fields (if supported, otherwise just append to last_name as a hack for MVP, or ignore)
    // Actually Resend contacts support custom fields in the audience, let's just pass them in "first_name" as a tag string for now, or just send it directly if Resend ignores unknown fields.
    // Wait, the API might reject unknown fields. Let's just log it or pass it.
    
    // 3. Contact creation in Resend Audience List
    const resendResponse = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email: email.trim(),
          unsubscribed: false,
          // Sending preferences as part of first_name for now since we don't know the custom fields setup
          first_name: `[Artículos: ${preferences?.articulos ? 'Sí' : 'No'} | Vuelos: ${preferences?.vuelos ? 'Sí' : 'No'}]`
        }),
      }
    )

    const responseData = await resendResponse.json()

    if (!resendResponse.ok) {
      console.error('Error de API Resend:', responseData)
      // Resend returns specific errors like contact already exists
      const errorMessage =
        responseData.message || 'Error al conectar con el servicio de correos.'
      return NextResponse.json({ error: errorMessage }, { status: resendResponse.status })
    }

    return NextResponse.json({
      success: true,
      message: 'Te has suscrito con éxito a la Revista Brutalista.',
      data: responseData,
    })
  } catch (error: unknown) {
    console.error('Error al procesar la suscripción:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor. Inténtalo más tarde.' },
      { status: 500 }
    )
  }
}
