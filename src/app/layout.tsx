import type { Metadata } from "next";
import { Anton, Archivo_Black, Poppins } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import BrutalistNav from "@/components/BrutalistNav";
import CookieBanner from "@/components/CookieBanner";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

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
    <html
      lang="es"
      className={`${anton.variable} ${archivoBlack.variable} ${poppins.variable} antialiased`}
    >
      <body className="flex flex-col min-h-[100dvh]">
        <BrutalistNav />
        {children}
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
