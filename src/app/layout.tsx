import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "@/components/provider/ClientProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "앱등이가되",
  description: "당신에게 꼭 필요한 애플제품",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>
        <ClientProvider>
          <div className="fixed top-0 left-0 w-full z-10 py-0 md:py-5 bg-white">
            <Header />
            <Navbar />
          </div>
          <div className="global-px mt-[63px] md:mt-[140px]">{children}</div>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
