"use client";

import React, { useState } from "react";

export default function BrutalistSubmitForm() {
  const [formData, setFormData] = useState({
    title: "",
    contributorName: "",
    contributorLink: "",
    excerpt: "",
    content: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contribute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Hubo un error al enviar tu artículo.");
      }

      setStatus("success");
      setFormData({
        title: "",
        contributorName: "",
        contributorLink: "",
        excerpt: "",
        content: "",
      });
    } catch (error: unknown) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : String(error));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="brutal-shadow bg-[#0A0A0A] border-l-8 border-[#FC352E] p-8 md:p-12 w-full max-w-4xl mx-auto mt-20">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-[#FC352E] uppercase font-anton text-[clamp(2.5rem,6vw,4rem)] leading-[0.9] tracking-tighter mb-4">
          ¿QUIERES ENVIAR TUS ARTÍCULOS?
        </h2>
        <p className="text-white/60 font-poppins text-sm md:text-base leading-relaxed">
          Sube tu historia, análisis o crónica. Nuestro equipo la revisará desde el panel de control y la publicará en la Comunidad.
        </p>
      </div>

      {status === "success" ? (
        <div className="bg-[#FC352E]/10 border-2 border-[#FC352E] p-8 text-center animate-raks-fade-in">
          <h3 className="text-[#FC352E] font-anton text-3xl uppercase mb-2">¡ARTÍCULO ENVIADO!</h3>
          <p className="text-white font-poppins text-sm tracking-widest uppercase">
            Tu propuesta está en nuestro panel de revisión. Nos pondremos en contacto contigo pronto.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 bg-[#FC352E] text-white font-poppins font-bold text-xs tracking-[0.2em] px-6 py-3 uppercase hover:bg-white hover:text-black transition-colors brutal-shadow"
          >
            ENVIAR OTRO
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 font-poppins">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TITULO */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-white/50 text-xs font-bold tracking-[0.2em] uppercase">
                TÍTULO DEL ARTÍCULO *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-black border-2 border-white/20 text-white p-4 focus:outline-none focus:border-[#FC352E] transition-colors font-bold uppercase"
                placeholder="Ej. LA REVOLUCIÓN DEL DRILL"
              />
            </div>

            {/* NOMBRE */}
            <div className="space-y-2">
              <label htmlFor="contributorName" className="block text-white/50 text-xs font-bold tracking-[0.2em] uppercase">
                TU NOMBRE O ALIAS *
              </label>
              <input
                id="contributorName"
                name="contributorName"
                type="text"
                required
                value={formData.contributorName}
                onChange={handleChange}
                className="w-full bg-black border-2 border-white/20 text-white p-4 focus:outline-none focus:border-[#FC352E] transition-colors font-bold uppercase"
                placeholder="Tu alias"
              />
            </div>
          </div>

          {/* RED SOCIAL */}
          <div className="space-y-2">
            <label htmlFor="contributorLink" className="block text-white/50 text-xs font-bold tracking-[0.2em] uppercase">
              TU INSTAGRAM O PORTFOLIO (OPCIONAL)
            </label>
            <input
              id="contributorLink"
              name="contributorLink"
              type="url"
              value={formData.contributorLink}
              onChange={handleChange}
              className="w-full bg-black border-2 border-white/20 text-white p-4 focus:outline-none focus:border-[#FC352E] transition-colors"
              placeholder="https://instagram.com/tu_usuario"
            />
          </div>

          {/* EXTRACTO */}
          <div className="space-y-2">
            <label htmlFor="excerpt" className="block text-white/50 text-xs font-bold tracking-[0.2em] uppercase">
              BREVE RESUMEN / ENTRADILLA
            </label>
            <input
              id="excerpt"
              name="excerpt"
              type="text"
              value={formData.excerpt}
              onChange={handleChange}
              className="w-full bg-black border-2 border-white/20 text-white p-4 focus:outline-none focus:border-[#FC352E] transition-colors"
              placeholder="Un resumen de 2 líneas atrapante..."
            />
          </div>

          {/* CONTENIDO TEXTO */}
          <div className="space-y-2">
            <label htmlFor="content" className="block text-white/50 text-xs font-bold tracking-[0.2em] uppercase">
              CONTENIDO DEL ARTÍCULO (OPCIONAL)
            </label>
            <textarea
              id="content"
              name="content"
              rows={6}
              value={formData.content}
              onChange={handleChange}
              className="w-full bg-black border-2 border-white/20 text-white p-4 focus:outline-none focus:border-[#FC352E] transition-colors"
              placeholder="Escribe aquí tu artículo, o si prefieres envíalo en un link de Google Docs..."
            />
            <p className="text-white/30 text-[10px] mt-1 tracking-widest uppercase">
              También puedes enviar archivos pesados respondiendo al correo tras subir la petición.
            </p>
          </div>

          {status === "error" && (
            <div className="bg-[#FC352E]/10 border border-[#FC352E] text-[#FC352E] p-4 text-sm font-bold tracking-wider">
              ERROR: {errorMessage}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={status === "loading"}
              className={`brutal-shadow bg-[#FC352E] text-white font-poppins font-bold text-sm tracking-[0.2em] px-10 py-4 uppercase hover:bg-white hover:text-black transition-all ${
                status === "loading" ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {status === "loading" ? "ENVIANDO..." : "ENVIAR A REVISIÓN →"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
