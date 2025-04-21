import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import MUIThemeProvider from "@/components/MUIThemeProvider";

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
        <Header />
        <div className="global-px">
          <MUIThemeProvider>{children}</MUIThemeProvider>
        </div>
      </body>
    </html>
  );
}
