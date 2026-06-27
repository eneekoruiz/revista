export const metadata = {
  title: 'CONTACTO',
  description: 'Habla con RAK$ CLUB.',
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <h1 
          className="text-white uppercase leading-[0.9] mb-12 tracking-tighter"
          style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', fontSize: 'clamp(4rem, 15vw, 12rem)' }}
        >
          CONT<span className="text-[#FC352E]">ACTO</span>
        </h1>
        
        <p className="text-white/60 font-poppins text-lg md:text-2xl max-w-2xl mx-auto mb-16" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
          Para dudas sobre vuelos, lista VIP, o colaboraciones comerciales, escríbenos.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="brutal-shadow bg-[#0A0A0A] p-10 flex flex-col gap-4">
            <h2 className="text-[#FC352E] font-anton text-4xl uppercase" style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}>GENERAL</h2>
            <p className="font-poppins text-white/50 text-sm font-bold tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>INFO / TICKETS</p>
            <a href="mailto:info@raksclub.com" className="text-white font-poppins text-xl hover:text-[#FC352E] transition-colors" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>info@raksclub.com</a>
          </div>
          
          <div className="brutal-shadow bg-[#FC352E] text-black p-10 flex flex-col gap-4">
            <h2 className="text-black font-anton text-4xl uppercase" style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}>BOOKING</h2>
            <p className="font-poppins text-black/60 text-sm font-bold tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>ARTISTAS / SPONSORS</p>
            <a href="mailto:booking@raksclub.com" className="text-black font-poppins text-xl hover:text-white transition-colors" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>booking@raksclub.com</a>
          </div>
        </div>
      </div>
    </main>
  )
}
