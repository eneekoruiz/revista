import BrutalistSubscribe from '@/components/BrutalistSubscribe'

export const metadata = {
  title: 'ÚNETE A LA ESCENA | RAK$ CLUB',
  description: 'Suscríbete al boletín oficial de RAK$ CLUB.',
}

export default function UnetePage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center pt-24 pb-20 relative z-20">
      <div className="w-full max-w-4xl mx-auto">
        <BrutalistSubscribe />
      </div>
    </main>
  )
}
