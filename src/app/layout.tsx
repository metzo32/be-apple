import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ClientProvider from "@/components/provider/ClientProvider";

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
          <Header />
          <div className="global-px">
            {children}
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
