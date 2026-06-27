import SponsorBanner from '@/components/SponsorBanner'

export const metadata = {
  title: 'VUELOS',
  description: 'Los próximos eventos y fiestas de RAK$ CLUB.',
}

export default function VuelosPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* HEADER ROW */}
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 mb-12">
          <h1 
            className="text-[#FC352E] uppercase leading-none tracking-tighter shrink-0"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', fontSize: 'clamp(4rem, 8vw, 8rem)' }}
          >
            VUELOS
          </h1>
          
          {/* STATS SECTION */}
          <div className="flex-1 w-full bg-[#FC352E] py-6 px-4 md:px-8 brutal-shadow flex justify-between items-center text-center">
            {[
              ['50+', 'VUELOS'],
              ['3', 'CIUDADES'],
              ['10K+', 'ASISTENTES'],
              ['5', 'AÑOS'],
            ].map(([num, label]) => (
              <div key={label}>
                <p
                  className="text-black leading-none"
                  style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', fontSize: 'clamp(2rem,4vw,4rem)' }}
                >
                  {num}
                </p>
                <p className="text-black/60 font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1 hidden sm:block" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PINNED TICKET / SPONSOR */}
        <div className="mb-20">
          <SponsorBanner />
        </div>

        {/* TELEGRAM LISTA */}
        <div className="brutal-shadow bg-[#0A0A0A] text-left p-10 mb-20 border-l-8 border-[#FC352E]">
          <h2 className="text-white uppercase mb-4 font-anton text-4xl">
            CONSIGUE LISTA
          </h2>
          <p className="text-white/60 font-poppins text-sm md:text-base mb-8 leading-relaxed max-w-2xl">
            Los más rápidos entran gratis o con descuento. Únete al canal oficial de Telegram para recibir los links de lista para los próximos vuelos en el Dabadaba, Sala CBA y Santana 27.
          </p>
          <a
            href="https://t.me/raksclub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#FC352E] text-white font-poppins font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-white hover:text-[#FC352E] transition-all duration-200 brutal-shadow"
          >
            ENTRAR AL TELEGRAM →
          </a>
        </div>

        {/* PRÓXIMOS VUELOS */}
        <section className="w-full mb-20">
          <div className="flex items-center gap-4 mb-12">
            <h2
              className="text-white uppercase tracking-wider whitespace-nowrap"
              style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', fontSize: 'clamp(2rem,4vw,3.5rem)' }}
            >
              PRÓXIMOS VUELOS
            </h2>
            <div className="flex-1 h-px bg-[#FC352E]/30" />
            <a
              href="https://raksclub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FC352E] font-bold text-xs tracking-[0.2em] uppercase hover:text-white transition-colors whitespace-nowrap"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              TICKETS OFICIALES →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: 'N°53', venue: 'DABADABA', city: 'DONOSTIA-S.S.', date: '12 JUL 2026', price: '10€' },
              { num: 'N°54', venue: 'SALA CBA', city: 'IRÚN', date: '26 JUL 2026', price: '8€' },
              { num: 'N°55', venue: 'SANTANA 27', city: 'BILBAO', date: '9 AGO 2026', price: '12€' },
            ].map((event) => (
              <a
                key={event.num}
                href="https://raksclub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group block brutal-shadow bg-[#0A0A0A] p-6 transition-all duration-300 hover:bg-[#FC352E]/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[#FC352E] text-xs font-bold tracking-[0.2em] uppercase mb-1" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>RAK$ CLUB • VUELO</p>
                    <p className="text-white" style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', fontSize: '3rem' }}>{event.num}</p>
                  </div>
                  <span className="bg-[#FC352E] text-white text-xs font-bold px-3 py-1.5 tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {event.price}
                  </span>
                </div>
                <div className="border-t border-dashed border-[#FC352E]/30 pt-4 space-y-2">
                  <p className="text-white font-bold text-sm tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{event.venue}</p>
                  <p className="text-white/40 font-bold text-xs tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{event.city}</p>
                  <p className="text-[#FC352E] font-bold text-xs tracking-[0.2em] uppercase mt-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>{event.date}</p>
                </div>
                {/* Barcode estético */}
                <div className="mt-6 flex gap-1 h-12 w-full opacity-50 group-hover:opacity-100 transition-opacity">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-white"
                      style={{ height: `${20 + Math.random() * 80}%`, alignSelf: 'flex-end' }}
                    />
                  ))}
                </div>
                <p className="text-[#FC352E] text-xs font-bold tracking-[0.2em] uppercase mt-6 group-hover:text-white transition-colors text-center w-full" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  PILLAR TICKET →
                </p>
              </a>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
