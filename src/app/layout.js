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

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'https://mailburst.vercel.app';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "MailBurst | Free Disposable Temporary Email",
    template: "%s | MailBurst"
  },
  description: "Secure, instant, disposable, and professional temporary email service. Protect your privacy online and avoid spam with our 10-minute mail alternative.",
  keywords: ["temporary email", "disposable email", "temp mail", "fake email", "10 minute mail", "throwaway email", "privacy"],
  openGraph: {
    title: 'MailBurst | Temporary Email',
    description: 'Keep your primary inbox pristine. Generate secure, instant disposable emails on demand.',
    url: baseUrl,
    siteName: 'MailBurst',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MailBurst | Temporary Email',
    description: 'Keep your primary inbox pristine. Generate secure, instant disposable emails on demand.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  }
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
