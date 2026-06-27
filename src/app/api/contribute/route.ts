import { NextResponse } from 'next/server';
import { client } from '@/sanity/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, contributorName, contributorLink, excerpt, content } = body;

    // Validate minimal required fields
    if (!title || !contributorName) {
      return NextResponse.json(
        { error: 'El título y tu nombre son obligatorios.' },
        { status: 400 }
      );
    }

    // Check if Sanity API Token is configured
    if (!process.env.SANITY_API_TOKEN) {
      console.error('SANITY_API_TOKEN is not set in environment variables.');
      return NextResponse.json(
        { error: 'Falta configurar el Token de Sanity en el servidor.' },
        { status: 500 }
      );
    }

    // Create a write client
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    });

    // Generate a basic slug from the title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // Construct the document matching the contributionType schema
    const doc = {
      _type: 'contribution',
      title,
      slug: {
        _type: 'slug',
        current: `${slug}-${Date.now().toString().slice(-6)}`
      },
      contributorName,
      contributorLink: contributorLink || undefined,
      excerpt: excerpt || undefined,
      status: 'in_review', // Start in review mode
      // If content is provided as plain text, we can map it to a basic block
      content: content ? [
        {
          _type: 'block',
          children: [{ _type: 'span', text: content, marks: [] }],
          markDefs: [],
          style: 'normal',
        }
      ] : undefined,
    };

    // Save to Sanity
    const result = await writeClient.create(doc);

    return NextResponse.json({ success: true, documentId: result._id }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error submitting contribution:', error);
    return NextResponse.json(
      { error: 'Error submitting contribution', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
