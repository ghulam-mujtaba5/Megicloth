import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { HomepageProvider } from './context/HomepageContext';

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <ProductProvider>
            <HomepageProvider>
              <CartProvider>
                <ClientLayout>
                  {children}
                </ClientLayout>
              </CartProvider>
            </HomepageProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
