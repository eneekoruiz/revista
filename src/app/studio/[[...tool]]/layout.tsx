import { ReactNode } from 'react'

export const metadata = {
  title: 'Revista Studio',
  description: 'Panel de Administración de Revista Brutalista',
}

export default function StudioLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
