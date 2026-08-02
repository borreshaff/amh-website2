import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "../styles/globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700"],
  display: "swap"
});

// Interim body typeface until licensed Gotham Light files are supplied.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.amhgroup.com"),
  title: {
    default: "AMH Group | Strategy-Led Creative & Growth Agency",
    template: "%s | AMH Group"
  },
  description:
    "AMH Group helps ambitious brands clarify their identity, communicate with impact, and grow through content, digital marketing, and performance-driven campaigns.",
  openGraph: {
    type: "website",
    siteName: "AMH Group"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
