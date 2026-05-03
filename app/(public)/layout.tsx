import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import I18nProvider from "@/components/I18nProvider";
import { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL('https://rivoaannemerbedrijf.nl'),
  title: "Rivo Diensten",
  description: "Uw betrouwbare partner voor al uw bouwwerkzaamheden...",
  openGraph: {
    title: "Rivo Diensten",
    description: "Uw betrouwbare partner voor al uw bouwwerkzaamheden...",
    url: "https://rivoaannemerbedrijf.nl/",
    siteName: "Rivo",
    images: [
      {
        url: 'https://rivoaannemerbedrijf.nl/imageUrl.jpg',
        width: 1200,
        height: 630,
        alt: 'Rivo - Bouw en Renovatie',
      },
    ],
    type: "website",
  },
};
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 w-full">{children}</main>

        <Footer />
      </div>
    </I18nProvider>
  );
}
