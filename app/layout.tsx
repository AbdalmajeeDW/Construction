import { Metadata } from "next";
import "./globals.css";
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
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}