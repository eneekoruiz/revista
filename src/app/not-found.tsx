import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-6 selection:bg-[#FC352E] selection:text-white overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#FC352E 1px, transparent 1px), linear-gradient(90deg, #FC352E 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Boarding pass card */}
      <div className="relative z-10 max-w-2xl w-full border-2 border-[#FC352E] bg-[#0A0A0A]">
        {/* Top bar */}
        <div className="bg-[#FC352E] px-6 py-2 flex items-center justify-between">
          <span className="font-mono text-black text-xs tracking-widest uppercase font-bold">
            RAK$ CLUB • BOARDING PASS
          </span>
          <span className="font-mono text-black text-xs tracking-widest">
            RAK-404-ERROR
          </span>
        </div>

        {/* Content */}
        <div className="p-8 md:p-14 text-center relative">
          {/* CANCELADO stamp */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <span
              className="text-[#FC352E] font-black text-5xl md:text-7xl opacity-10 select-none tracking-widest uppercase border-4 border-[#FC352E] px-6 py-2"
              style={{
                transform: "rotate(-20deg)",
                fontFamily: "var(--font-anton), sans-serif",
              }}
            >
              CANCELADO
            </span>
          </div>

          {/* 404 number */}
          <h1
            className="leading-none text-white mb-2 drop-shadow-[0_0_30px_rgba(252,53,46,0.4)]"
            style={{
              fontFamily: "var(--font-anton), sans-serif",
              fontSize: "clamp(6rem, 20vw, 14rem)",
            }}
          >
            404
          </h1>

          <p
            className="text-[#FC352E] font-bold text-xs tracking-[0.4em] uppercase mb-2"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            VUELO NO ENCONTRADO
          </p>

          <p className="text-white/40 text-sm mb-10 font-medium">
            Este link está roto o la poli chapó la fiesta.
          </p>

          {/* Dashed divider */}
          <div className="border-t border-dashed border-white/10 my-8" />

          <Link
            href="/"
            className="inline-block bg-[#FC352E] hover:bg-white text-white hover:text-black font-bold text-sm px-12 py-4 transition-colors duration-300 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
          >
            VOLVER AL CLUB
          </Link>
        </div>
      </div>
    </div>
  );
}
