import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: "MailBurst | LIGHT EDITION",
  description: "Secure, disposable, and professional temporary email service.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
