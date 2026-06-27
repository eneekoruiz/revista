import React from "react";

export const metadata = {
  title: "Aviso Legal | RAK$ CLUB",
  description: "Aviso Legal de RAK$ CLUB",
};

export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12 relative z-20 font-poppins">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-[#FC352E] font-anton text-5xl md:text-7xl uppercase mb-12 tracking-tight">
          Aviso Legal
        </h1>
        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4 tracking-widest">1. Datos Identificativos</h2>
            <p>
              En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de 
              Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), le informamos que este 
              sitio web es titularidad de RAK$ CLUB, con correo electrónico de contacto: info@raksclub.com.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4 tracking-widest">2. Usuarios</h2>
            <p>
              El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, 
              las Condiciones Generales de Uso aquí reflejadas.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4 tracking-widest">3. Uso del Portal</h2>
            <p>
              El sitio web proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, &quot;los contenidos&quot;) 
              en Internet pertenecientes a RAK$ CLUB o a sus licenciantes a los que el USUARIO pueda tener acceso. 
              El USUARIO asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro que fuese necesario 
              para acceder a determinados servicios o contenidos.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4 tracking-widest">4. Propiedad Intelectual e Industrial</h2>
            <p>
              RAK$ CLUB por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial 
              de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, 
              audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, etc.).
              Todos los derechos reservados.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
