"use client";

import Navbar from "@components/Navbar";
import "./globals.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Footer from "@components/Footer";

const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showNavbar = !pathname.startsWith("/dash");
  useEffect(() => {
    if (!pathname.startsWith("/dash"))
      document.title = "Umurava platform | Build Work Experience ";
  });
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="text-black/90 w-full max-w-screen-3xl mx-auto">
        {showNavbar && <Navbar />}
        {children}
        {showNavbar && <Footer />}
      </body>
    </html>
  );
}
