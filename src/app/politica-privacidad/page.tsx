import React from "react";

export const metadata = {
  title: "Política de Privacidad | RAK$ CLUB",
  description: "Política de Privacidad de RAK$ CLUB",
};

export default function PoliticaPrivacidadPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12 relative z-20 font-poppins">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-[#FC352E] font-anton text-5xl md:text-7xl uppercase mb-12 tracking-tight">
          Política de Privacidad
        </h1>
        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4 tracking-widest">1. Información General</h2>
            <p>
              En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, 
              relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales 
              (Reglamento General de Protección de Datos o RGPD), informamos sobre cómo recopilamos, usamos y protegemos 
              su información personal en RAK$ CLUB.
            </p>
          </section>
          
          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4 tracking-widest">2. Responsable del Tratamiento</h2>
            <p>
              El responsable del tratamiento de los datos recabados en este sitio web es RAK$ CLUB. Puede contactarnos en info@raksclub.com para cualquier gestión sobre sus datos personales.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4 tracking-widest">3. Finalidad del Tratamiento</h2>
            <p>
              Los datos personales recabados a través de este sitio web serán tratados con las siguientes finalidades:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Gestionar suscripciones a boletines o newsletters.</li>
              <li>Responder a consultas enviadas mediante formularios de contacto.</li>
              <li>Analizar el tráfico web para mejorar la experiencia del usuario (solo si acepta las cookies analíticas).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4 tracking-widest">4. Legitimación</h2>
            <p>
              La base legal para el tratamiento de sus datos es el consentimiento explícito que otorga al rellenar los 
              formularios y al aceptar nuestra política de cookies.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4 tracking-widest">5. Derechos de los Usuarios</h2>
            <p>
              Usted tiene derecho a acceder, rectificar o suprimir sus datos, así como otros derechos como la limitación del tratamiento 
              o la portabilidad de los datos. Para ejercerlos, envíe un correo electrónico a info@raksclub.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
