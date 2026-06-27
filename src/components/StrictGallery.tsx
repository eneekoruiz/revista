"use client";

import React, { useState, useEffect } from "react";
import { urlFor } from "@/sanity/client";

// Sanity Types
type SanityImage = {
  asset?: {
    url?: string;
  };
  [key: string]: unknown;
};

export type GalleryAlbum = {
  _id: string;
  title: string;
  description?: string;
  date: string;
  flightName?: string;
  images: SanityImage[];
};

// Fallback dummy data if Sanity is not connected
const fallbackAlbums: GalleryAlbum[] = [
  {
    _id: "1",
    title: "VUELO N°53: DABADABA",
    description: "La locura desatada en Donosti. El mejor moshpit del año.",
    date: new Date().toISOString(),
    flightName: "VUELO N°53",
    images: [
      { asset: { url: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=800" } },
      { asset: { url: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f4b5?auto=format&fit=crop&q=80&w=800" } },
    ]
  },
  {
    _id: "2",
    title: "CONEXIÓN URBANA",
    description: "Foto suelta capturada por @shooterraks",
    date: new Date().toISOString(),
    images: [
      { asset: { url: "https://images.unsplash.com/photo-1516280440502-861f5c6b6534?auto=format&fit=crop&q=80&w=800" } }
    ]
  }
];

export default function StrictGallery({ albums = [] }: { albums?: GalleryAlbum[] }) {
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    if (selectedAlbum) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedAlbum]);

  const displayAlbums = albums.length > 0 ? albums : fallbackAlbums;

  const openAlbum = (album: GalleryAlbum) => {
    setSelectedAlbum(album);
    setCurrentPhotoIndex(0);
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
    setCurrentPhotoIndex(0);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedAlbum && currentPhotoIndex < selectedAlbum.images.length - 1) {
      setCurrentPhotoIndex(prev => prev + 1);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedAlbum && currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prev => prev - 1);
    }
  };

  // Helper to safely resolve image url (either from Sanity object or direct URL)
  const resolveImageUrl = (img: SanityImage) => {
    if (!img) return "";
    if (img.asset?.url) return img.asset.url; // Unoptimized fallback URL or raw URL
    try {
      return urlFor(img).width(1200).url(); // Optimized Sanity URL
    } catch {
      return "";
    }
  };
  return (
    <section className="relative w-full min-h-screen bg-[#111111] font-poppins text-white">
      {!selectedAlbum ? (
        <div className="relative w-full min-h-screen flex flex-col items-center py-20 px-4 md:px-12 overflow-hidden">
          {/* GIANT ROTATED WATERMARK TEXT */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-5">
            <h2 className="text-white font-anton text-[clamp(10rem,35vw,35rem)] leading-none uppercase tracking-tighter -rotate-12 whitespace-nowrap mix-blend-overlay">
              GALERÍA
            </h2>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-wrap justify-center gap-12 pt-10">
            {displayAlbums.map((album, index) => {
              const isStack = album.images && album.images.length > 1;
              const coverUrl = resolveImageUrl(album.images?.[0]);
              
              return (
                <div
                  key={album._id}
                  onClick={() => openAlbum(album)}
                  className={`group cursor-pointer brutal-shadow bg-black p-3 transform transition-transform hover:scale-105 hover:z-20 ${
                    index % 2 === 0 ? "rotate-2" : "-rotate-3"
                  }`}
                  style={{ width: "clamp(280px, 35vw, 450px)", height: "auto" }}
                >
                  <div className="relative">
                    {/* Simulated Stack Effect */}
                    {isStack && (
                      <>
                        <div className="absolute inset-0 bg-white/20 rotate-[-4deg] translate-y-2 translate-x-2 -z-10 brutal-shadow"></div>
                        <div className="absolute inset-0 bg-white/40 rotate-[3deg] translate-y-4 translate-x-4 -z-20 brutal-shadow"></div>
                      </>
                    )}
                    
                    <img
                      src={coverUrl}
                      alt={album.title}
                      className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    
                    {/* Hover overlay with Info */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                      {album.flightName && (
                        <span className="bg-[#FC352E] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-3">
                          {album.flightName}
                        </span>
                      )}
                      <h3 className="text-white font-anton text-3xl uppercase tracking-tighter leading-[0.9]">
                        {album.title}
                      </h3>
                      {isStack && (
                        <p className="mt-4 text-[#FC352E] font-bold text-xs uppercase tracking-[0.2em] bg-black px-3 py-1 border border-[#FC352E]/30">
                          PAQUETE ({album.images.length} FOTOS)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* SINGLE PAGE ALBUM VIEWER */
        <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col animate-raks-fade-in overflow-hidden">
          {/* Top Bar with Close Button */}
          <div className="absolute top-0 w-full flex justify-end p-6 z-50">
            <button
              onClick={closeAlbum}
              className="text-white/60 hover:text-white transition-all flex items-center gap-3 group"
            >
              <span className="font-poppins font-bold text-xs tracking-[0.2em] uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">CERRAR</span>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Main Content */}
          <div className="relative flex-1 w-full h-full flex items-center justify-center p-4 md:p-16">
            
            {/* Prev Button */}
            {selectedAlbum.images.length > 1 && (
              <button 
                onClick={prevPhoto}
                disabled={currentPhotoIndex === 0}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors disabled:opacity-0 z-20 p-4"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            {/* Photo */}
            <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-center relative z-10">
              <img 
                key={currentPhotoIndex}
                src={resolveImageUrl(selectedAlbum.images[currentPhotoIndex])}
                alt={`${selectedAlbum.title} - Foto ${currentPhotoIndex + 1}`}
                className="max-w-full max-h-full object-contain animate-[fade_0.5s_ease-out]"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
              />
            </div>

            {/* Next Button */}
            {selectedAlbum.images.length > 1 && (
              <button 
                onClick={nextPhoto}
                disabled={currentPhotoIndex === selectedAlbum.images.length - 1}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors disabled:opacity-0 z-20 p-4"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}
          </div>

          {/* Bottom Info Bar */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 pt-32 flex flex-col md:flex-row justify-between items-end gap-6 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-30">
            <div className="max-w-2xl pointer-events-auto">
              {selectedAlbum.flightName && (
                <p className="text-[#FC352E] font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3">
                  {selectedAlbum.flightName}
                </p>
              )}
              <h2 className="font-anton text-4xl md:text-6xl uppercase tracking-wider text-white leading-[0.9] mb-4">
                {selectedAlbum.title}
              </h2>
              {selectedAlbum.description && (
                <p className="text-white/60 font-poppins text-sm leading-relaxed max-w-xl">
                  {selectedAlbum.description}
                </p>
              )}
            </div>
            
            {/* Counter */}
            {selectedAlbum.images.length > 1 && (
              <div className="text-white/40 font-poppins text-sm tracking-[0.4em] pointer-events-auto">
                {String(currentPhotoIndex + 1).padStart(2, '0')} <span className="mx-2 opacity-20">/</span> {String(selectedAlbum.images.length).padStart(2, '0')}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
