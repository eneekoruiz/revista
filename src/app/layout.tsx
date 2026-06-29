import type { Metadata } from "next";
import "@fontsource/anton/400.css";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "./globals.css";
import Analytics from "@/components/Analytics";
import BrutalistNav from "@/components/BrutalistNav";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: {
    template: "%s | RAK$ CLUB",
    default: "RAK$ CLUB | Revista de Cultura Urbana",
  },
  description:
    "Cultura cruda, música urbana, trap, drill y estilo underground en el País Vasco.",
  openGraph: {
    title: "RAK$ CLUB",
    description:
      "Cultura cruda, música urbana, trap, drill y estilo underground en el País Vasco.",
    url: "https://raksclub.com",
    siteName: "RAK$ CLUB",
    images: [
      {
        url: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RAK$ CLUB",
    description:
      "Cultura cruda, música urbana, trap, drill y estilo underground en el País Vasco.",
    images: [
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=1200",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="antialiased">
      <body className="flex flex-col min-h-[100dvh]">
        <BrutalistNav />
        {children}
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
