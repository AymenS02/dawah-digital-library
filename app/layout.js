import "./globals.css";

import { Old_Standard_TT, Barlow, Ovo, Palanquin } from "next/font/google";
import localFont from "next/font/local";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

// Old Standard TT
const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-old-standard",
});

// Barlow
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-barlow",
});

// Ovo
const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-ovo",
});

// Palanquin
const palanquin = Palanquin({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-palanquin",
});

// Proxima Nova (LOCAL FONT)
const proximaNova = localFont({
  src: [
    {
      path: "../public/fonts/Proxima Nova Semibold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-proxima-nova",
  display: "swap",
});

export const metadata = {
  title: "Dawah Digital Library",
  description: "A comprehensive library of Islamic resources",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`
        ${oldStandardTT.variable}
        ${barlow.variable}
        ${ovo.variable}
        ${palanquin.variable}
        ${proximaNova.variable}
      `}
    >
      <body className="font-ovo">
        <Header />
        <Sidebar />
        <SmoothScrollProvider>
          <main>{children}</main>
        </SmoothScrollProvider>
        <Footer />
      </body>
    </html>
  );
}
