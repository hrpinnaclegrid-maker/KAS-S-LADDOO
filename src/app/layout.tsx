import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalCartDrawer from "@/components/GlobalCartDrawer";
import MobileBottomNav from "@/components/MobileBottomNav";
import FooterWrapper from "@/components/FooterWrapper";

export const metadata: Metadata = {
  title: "Dr. KAS’S | Homemade Laddu Collection — Healing Mind, Body & Soul",
  description:
    "A wellness-inspired food brand by Dr. Khan Afroz Shams. Handcrafted Dry Fruits Laddus, Millet Laddus, and Wholesome Homemade Varieties grounded in Nutritional Psychology and Chakra Balance.",
  keywords: [
    "Dr. KAS",
    "Dr. Khan Afroz Shams",
    "Homemade Laddu",
    "Dry Fruits Laddu",
    "Millet Laddu",
    "Mindful Nutrition",
    "Nutritional Psychology",
    "Chakra Balance",
    "Healthy Snacking India"
  ],
  authors: [{ name: "Dr. Khan Afroz Shams" }],
  openGraph: {
    title: "Dr. KAS’S Homemade Laddu Collection",
    description: "Nourishing the Body. Nurturing the Mind. Inspiring Inner Harmony.",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#FCFAF6] text-[#2D261E] pb-16 lg:pb-0">
        <CartProvider>
          <Suspense fallback={<div className="h-20 bg-[#FAF5EB]" />}>
            <GlobalHeader />
          </Suspense>
          <GlobalCartDrawer />
          <div className="flex-1 flex flex-col">{children}</div>
          <FooterWrapper />
          <Suspense fallback={null}>
            <MobileBottomNav />
          </Suspense>
        </CartProvider>
      </body>
    </html>
  );
}
