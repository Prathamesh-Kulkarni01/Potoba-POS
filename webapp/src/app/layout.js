import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SEOHead from "@/seo/Head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Perfect Gifts for Every Occasion",
  description: "Discover unique and personalized gifts for all your special moments. We makes every occasion memorable!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
         <SEOHead/>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
