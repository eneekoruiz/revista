"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CookieBanner() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const cookieConsent = localStorage.getItem("raks_cookie_consent");
    if (!cookieConsent) {
      setTimeout(() => setIsVisible(true), 0);
    } else if (cookieConsent === "accepted") {
      // Logic to enable non-essential scripts could go here
      // e.g., window.gtag(...)
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("raks_cookie_consent", "accepted");
    setIsVisible(false);
    // Initialize analytics or other non-essential scripts here
  };

  const handleDecline = () => {
    localStorage.setItem("raks_cookie_consent", "declined");
    setIsVisible(false);
    // Ensure no non-essential scripts are loaded
  };

  if (pathname?.startsWith('/studio')) return null;
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9999] p-4 pointer-events-none flex justify-center">
      <div className="bg-[#FC352E] brutal-shadow-white p-6 max-w-4xl w-full pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-white font-anton text-2xl uppercase tracking-widest mb-2">
            Acepta el Trato
          </h2>
          <p className="text-white/90 font-poppins text-sm leading-relaxed">
            Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar nuestro tráfico y personalizar el contenido. 
            Al hacer clic en &quot;Aceptar&quot;, consientes el uso de todas las cookies.{" "}
            <Link href="/cookies" className="underline font-bold hover:text-black transition-colors">
              Leer más
            </Link>.
          </p>
        </div>
        <div className="flex gap-4 shrink-0 w-full md:w-auto">
          <button
            onClick={handleDecline}
            className="flex-1 md:flex-none border-2 border-black bg-transparent text-white font-poppins text-sm font-bold uppercase tracking-wider py-3 px-6 hover:bg-black transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none brutal-shadow bg-black text-white font-poppins text-sm font-bold uppercase tracking-wider py-3 px-6 hover:bg-white hover:text-[#FC352E] transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
