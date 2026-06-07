import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "SMSflow | SMS klientų išlaikymo sistemos",
  description: "Automatizuotos SMS klientų sugrąžinimo sekos vietiniams ir paslaugų verslams. Tik €350/mėn. pilnas valdymas.",
  keywords: ["klientu išlaikymas", "SMS rinkodara", "marketingo automatizavimas", "vietinis verslas"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="font-sans bg-surface text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
