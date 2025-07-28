import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from 'next/font/google';
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { AppProviders } from './providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563eb',
};

export const metadata: Metadata = {
  title: "Megicloth - Premium Unstitched Fabrics | Pakistan's Leading Textile Store",
  description: "Discover premium unstitched fabrics for men and women. Shop the latest collections with fast delivery, easy returns, and the best prices in Pakistan. Quality lawn, cotton, and embroidered fabrics.",
  keywords: "unstitched fabrics, lawn suits, cotton fabric, embroidered fabric, Pakistan textiles, men's fabric, women's fabric, online fabric store",
  authors: [{ name: "Megicloth" }],
  creator: "Megicloth",
  publisher: "Megicloth",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://megicloth.com'),
  openGraph: {
    title: "Megicloth - Premium Unstitched Fabrics",
    description: "Discover premium unstitched fabrics for men and women. Shop the latest collections with fast delivery, easy returns, and the best prices in Pakistan.",
    url: 'https://megicloth.com',
    siteName: 'Megicloth',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Megicloth - Premium Unstitched Fabrics',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Megicloth - Premium Unstitched Fabrics",
    description: "Discover premium unstitched fabrics for men and women. Shop the latest collections with fast delivery, easy returns, and the best prices in Pakistan.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <AppProviders>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AppProviders>
      </body>
    </html>
  );
}
