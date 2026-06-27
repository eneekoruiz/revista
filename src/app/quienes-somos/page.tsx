import React from "react";
import ProfileCard from "@/components/ProfileCard";

export const metadata = {
  title: "Quiénes Somos | RAK$ CLUB",
  description: "Conoce a los participantes de RAK$ CLUB.",
};

export default function QuienesSomosPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12 relative z-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-[#FC352E] font-anton text-[clamp(4rem,12vw,10rem)] leading-[0.8] tracking-tighter uppercase mb-12 break-words text-center md:text-left">
          PARTICIPANTES
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <ProfileCard
            name="Sara Beguiristain"
            role="Directora de Contenidos"
            description="Liderando la línea editorial y asegurando que la esencia cruda de la calle se transmita en cada artículo y publicación. Experta en descubrir talento emergente y dar voz a la escena underground."
          />
          <ProfileCard
            name="Alejandro 'Tito' Llanos"
            role="Fundador"
            description="Identificó la necesidad de impulsar la música urbana en el norte, creando espacios para trap, dancehall y hip hop al nivel de las grandes capitales."
          />
          <ProfileCard
            name="Telmo Charro"
            role="Cofundador & Promotor"
            description="Responsable de la organización de showcases y eventos de gran formato, conectando artistas de primer nivel con el público del País Vasco."
          />
        </div>
      </div>
    </main>
  );
}
