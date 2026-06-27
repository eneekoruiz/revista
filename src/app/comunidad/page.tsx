import React from "react";
import { client } from "@/sanity/client";
import Link from "next/link";
import BrutalistSubmitForm from "@/components/BrutalistSubmitForm";

export const metadata = {
  title: "Comunidad | RAK$ CLUB",
  description: "Aportes y artículos de la comunidad RAK$ CLUB.",
};

interface Contribution {
  _id: string;
  title: string;
  contributorName: string;
  contributorLink?: string;
  excerpt?: string;
  publishedAt: string;
}

async function getPublishedContributions(): Promise<Contribution[]> {
  if (client.config().projectId === 'your-project-id') return [];

  const query = `*[_type == "contribution" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    contributorName,
    contributorLink,
    excerpt,
    publishedAt
  }`;
  try {
    return await client.fetch<Contribution[]>(query);
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return [];
  }
}

export default async function ComunidadPage() {
  const contributions = await getPublishedContributions();

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12 relative z-20 font-poppins">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 text-center md:text-left">
          <div>
            <h1 className="text-[#FC352E] font-anton text-[clamp(4rem,10vw,10rem)] leading-[0.8] tracking-tighter uppercase mb-4">
              COMUNIDAD
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-bold tracking-widest uppercase">
              Voces de la escena underground.
            </p>
          </div>
          
          <Link 
            href="/unete"
            className="inline-block brutal-shadow bg-[#FC352E] text-white font-poppins font-bold text-xl uppercase tracking-[0.2em] py-4 px-10 hover:bg-white hover:text-[#FC352E] transition-colors whitespace-nowrap"
          >
            ÚNETE A LA ESCENA
          </Link>
        </div>

        <h2 className="text-white font-anton text-4xl uppercase mb-10 border-b-2 border-white/20 pb-4">
          ARTÍCULOS DE LA COMUNIDAD
        </h2>

        {contributions.length === 0 ? (
          <div className="mb-20">
            <p className="text-white/40 italic text-xl">Aún no hay artículos publicados. Sé el primero en compartir tu voz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {contributions.map((item: Contribution) => (
              <div key={item._id} className="brutal-shadow bg-[#111] border-2 border-white/20 p-8 flex flex-col transition-all duration-300 hover:border-[#FC352E]">
                <h3 className="text-white font-anton text-3xl uppercase tracking-tight mb-4">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[#FC352E] font-bold text-sm tracking-wider uppercase">POR:</span>
                  {item.contributorLink ? (
                    <a href={item.contributorLink} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white underline decoration-[#FC352E] decoration-2 underline-offset-4">
                      {item.contributorName}
                    </a>
                  ) : (
                    <span className="text-white/80">{item.contributorName}</span>
                  )}
                </div>
                <p className="text-white/70 leading-relaxed text-sm mb-6 flex-grow">
                  {item.excerpt || "Sin extracto disponible."}
                </p>
                <div className="text-white/40 text-xs font-bold tracking-widest uppercase">
                  {new Date(item.publishedAt).toLocaleDateString('es-ES')}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Send your article CTA / Submit Form */}
        <BrutalistSubmitForm />
        
      </div>
    </main>
  );
}
