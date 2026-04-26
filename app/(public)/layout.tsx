import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import I18nProvider from "@/components/I18nProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <div className="flex flex-col min-h-screen">
        
        {/* HEADER */}
        <Navbar />

        {/* CONTENT */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

      </div>
    </I18nProvider>
  );
}