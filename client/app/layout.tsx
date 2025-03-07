"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Sidebar from "@components/Sidebar";
import "./globals.css";

import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "@redux/store";
import { useDynamicTitle } from "@components/MetadataDecode";
import { setUser, User } from "@redux/slices/userSlice";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="text-black/90 w-full max-w-screen-5xl mx-auto">
        <Provider store={store}>
          <MainLayout>{children}</MainLayout>
        </Provider>
      </body>
    </html>
  );
}

function MainLayout({ children }: { children: React.ReactNode }) {
  useDynamicTitle();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user.user);
  const userStatus = useSelector((state: RootState) => state.user.status);
  const pathname = usePathname();

  const showNavbar =
    pathname === "/" ||
    pathname.startsWith("/challenges&Hackathons") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/education-institutions");

  const showSidebar = pathname.startsWith("/dashboard");

  return (
    <div className={`w-full max-w-screen-5xl mx-auto ${showSidebar && "flex"}`}>
      {showNavbar && <Navbar />}
      {showSidebar && <Sidebar />}
      <div
        className={`flex-1 relative h-full ${!showSidebar && "min-h-[50vh]"}`}
      >
        {children}
      </div>
      {showNavbar && <Footer />}
    </div>
  );
}
