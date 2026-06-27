import React from "react";

export const metadata = {
  title: "Política de Cookies | RAK$ CLUB",
  description: "Política de Cookies de RAK$ CLUB",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12 relative z-20 font-poppins">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-[#FC352E] font-anton text-5xl md:text-7xl uppercase mb-12 tracking-tight">
          Política de Cookies
        </h1>
        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4 tracking-widest">¿Qué son las cookies?</h2>
            <p>
              Una cookie es un pequeño archivo de texto que un sitio web almacena en su ordenador o dispositivo móvil 
              cuando usted lo visita. Permite al sitio web recordar sus acciones y preferencias (como inicio de sesión, idioma, etc.) 
              durante un período de tiempo, para que no tenga que volver a introducirlos cada vez que regrese al sitio o navegue de una página a otra.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4 tracking-widest">¿Qué tipo de cookies usamos?</h2>
            <ul className="list-disc pl-6 mt-4 space-y-4">
              <li>
                <strong>Cookies técnicas (esenciales):</strong> Son aquellas que permiten la navegación a través de la página web y 
                la utilización de las diferentes opciones o servicios que en ella existen. Son estrictamente necesarias para el 
                funcionamiento de la plataforma.
              </li>
              <li>
                <strong>Cookies de análisis:</strong> Permiten el seguimiento y análisis del comportamiento de los usuarios en los 
                sitios web a los que están vinculadas. Se utilizan para medir la actividad y elaborar perfiles de navegación 
                con el fin de introducir mejoras en función del análisis de los datos de uso que hacen los usuarios del servicio.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4 tracking-widest">Gestión y Bloqueo de Cookies</h2>
            <p>
              Puede usted permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las 
              opciones del navegador instalado en su ordenador. También puede usar nuestro panel de configuración de cookies 
              para ajustar sus preferencias de consentimiento.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
