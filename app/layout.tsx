import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import QueryProvider from "./providers";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "300"],
});

export const metadata: Metadata = {
  title: "Artisian Connect - Modern Furniture Store",
  description: "Premium furniture and home decor for your lifestyle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${lato.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
