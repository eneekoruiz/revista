import React from "react";

export const metadata = {
  title: "Servicios | RAK$ CLUB",
  description: "Servicios integrales de producción musical, eventos y representación de artistas de RAK$ CLUB.",
};

const services = [
  {
    id: 1,
    title: "Producción de Eventos",
    description: "Organización integral de conciertos y shows musicales. Desde la planificación logística hasta la coordinación de proveedores, garantizando el éxito del evento.",
    icon: "🎤",
  },
  {
    id: 2,
    title: "Organización de Festivales",
    description: "Diseño y ejecución de festivales de música urbana a gran escala. Gestionamos line-ups, escenarios y la experiencia completa del asistente.",
    icon: "🎪",
  },
  {
    id: 3,
    title: "Eventos Privados",
    description: "Servicios a medida para lanzamientos de marca, aniversarios, fiestas privadas y bodas con nuestro sello distintivo y la mejor música.",
    icon: "🍾",
  },
  {
    id: 4,
    title: "Gestión y Booking",
    description: "Representación de artistas de la escena urbana, gestión de contrataciones (booking) y apoyo técnico durante las giras.",
    icon: "🤝",
  },
  {
    id: 5,
    title: "Alquiler Técnico",
    description: "Alquiler de equipos profesionales de sonido, iluminación y backline. Proveemos la infraestructura necesaria para que todo suene perfecto.",
    icon: "🎛️",
  }
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12 relative z-20 font-poppins">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-[#FC352E] font-anton text-[clamp(4rem,10vw,10rem)] leading-[0.8] tracking-tighter uppercase mb-6 text-center md:text-left">
          NUESTROS SERVICIOS
        </h1>
        <p className="text-white/60 text-lg md:text-xl font-bold tracking-widest uppercase mb-20 text-center md:text-left max-w-3xl">
          Soluciones integrales para la escena urbana. Del estudio al escenario principal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`brutal-shadow bg-[#111] border-2 border-[#FC352E] p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:bg-black group ${index === 3 || index === 4 ? 'lg:col-span-1' : ''}`}
            >
              <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110 origin-left">
                {service.icon}
              </div>
              <h3 className="text-[#FC352E] font-anton text-3xl uppercase tracking-tight mb-4 group-hover:text-white transition-colors duration-300">
                {service.title}
              </h3>
              <div className="w-12 h-1 bg-[#FC352E] mb-6 group-hover:w-full transition-all duration-500"></div>
              <p className="text-white/80 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <a href="mailto:raksclubcontact@gmail.com" className="inline-block brutal-shadow bg-[#FC352E] text-white font-poppins font-bold text-xl uppercase tracking-[0.2em] py-4 px-10 hover:bg-white hover:text-[#FC352E] transition-colors">
            CONTACTA CON NOSOTROS
          </a>
        </div>
      </div>
    </main>
  );
}
