import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import I18nProvider from "@/components/I18nProvider";
export const metadata = {
  title: "Rivo",
  description:
    "Professionele bouw- en renovatiediensten in Nederland. Kwaliteitswerk, betrouwbare uitvoering en scherpe prijzen. Vrijblijvende offerte!",
  keywords: [
    "aannemer Nederland",
    "renovatie",
    "bouwbedrijf",
    "badkamer renovatie",
    "keuken installatie",
  ],

  openGraph: {
    title: "Rivo Diensten",
    description:
      "Uw betrouwbare partner voor al uw bouwwerkzaamheden. Van volledige huisrenovaties tot badkamerrenovaties, keukeninstallaties, dakreparaties en schilderwerk. Wij leveren hoogwaardige resultaten op tijd en binnen budget.",

    url: "https://rivoaannemerbedrijf.nl/",
    siteName: "Rivo",
    images: [
      {
         url: "/heroHome.jpg",
        width: 1200,
        height: 630,
        alt: "Rivo",
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
