import React from 'react'

export default function SponsorBanner(): React.ReactElement {
  // Generate pseudo-random barcode widths deterministically
  const barcodeWidths = [
    2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 2,
    1, 3, 1, 2, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 2, 1, 3, 2, 1,
  ];

  return (
    <div className="w-full my-12 relative overflow-hidden">
      {/* PATROCINADO label */}
      <div className="absolute top-0 right-0 z-20 bg-[#FC352E] text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase">
        PATROCINADO
      </div>

      <a
        href="https://raksclub.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="bg-black border-2 border-[#FC352E] flex flex-col md:flex-row overflow-hidden hover:border-white transition-colors duration-300">
          {/* LEFT: Main Content */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between border-r-0 md:border-r md:border-dashed md:border-[#FC352E]/40">
            {/* Mono header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[#FC352E] text-xs tracking-widest uppercase">
                RAK$ CLUB • BOARDING PASS
              </span>
              <div className="flex-1 h-px bg-[#FC352E]/30" />
            </div>

            {/* Logo */}
            <div className="mb-4">
              <p
                className="text-white uppercase leading-none tracking-tighter"
                style={{
                  fontFamily: "var(--font-anton), sans-serif",
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                }}
              >
                RAK$ CLUB
              </p>
              <p className="text-[#FC352E] font-bold text-xs tracking-widest uppercase mt-1">
                EL CLUB QUE ROMPE LA CIUDAD
              </p>
            </div>

            {/* Flight info grid */}
            <div className="grid grid-cols-3 gap-4 border-t border-dashed border-white/10 pt-4">
              <div>
                <p className="text-white/30 text-[9px] tracking-widest uppercase mb-1">
                  VUELO
                </p>
                <p
                  className="text-white text-2xl leading-none"
                  style={{ fontFamily: "var(--font-anton), sans-serif" }}
                >
                  N°53
                </p>
              </div>
              <div>
                <p className="text-white/30 text-[9px] tracking-widest uppercase mb-1">
                  SALA
                </p>
                <p className="text-white font-bold text-sm tracking-wide uppercase">
                  DABADABA
                </p>
                <p className="text-white/40 text-[10px] tracking-widest">
                  DONOSTIA-S.S.
                </p>
              </div>
              <div>
                <p className="text-white/30 text-[9px] tracking-widest uppercase mb-1">
                  FECHA
                </p>
                <p className="text-white font-bold text-sm tracking-wide uppercase">
                  12 JUL 2026
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Barcode + CTA */}
          <div className="md:w-48 p-6 md:p-8 flex flex-col items-center justify-between bg-[#0A0A0A]">
            {/* Barcode */}
            <div className="w-full flex gap-[1px] mb-4" style={{ height: 64 }}>
              {barcodeWidths.map((w, i) => (
                <div
                  key={i}
                  className={i % 3 === 0 ? "bg-[#FC352E]" : "bg-white"}
                  style={{
                    width: w,
                    minWidth: w,
                    height: "100%",
                    opacity: i % 7 === 0 ? 0.5 : 1,
                  }}
                />
              ))}
            </div>

            <p className="font-mono text-white/20 text-[8px] tracking-widest text-center mb-4">
              RAK-808-2026-N53
            </p>

            {/* CTA Button */}
            <div className="w-full bg-[#FC352E] text-white font-bold text-center py-3 px-4 tracking-widest uppercase text-sm group-hover:bg-white group-hover:text-black transition-colors duration-300">
              PILLAR TICKET →
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
