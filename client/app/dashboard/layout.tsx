"use client";

import { useEffect } from "react";
import "../globals.css";
import DashboardNavbar from "@components/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { usePathname, useRouter } from "next/navigation";
import { fetchTalents } from "@redux/slices/talentsSlice";
import { fetchChallenges } from "@redux/slices/challengeSlice";
import { setUser, User } from "@redux/slices/userSlice";

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showNavbar =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/challenges&hackathons") ||
    pathname.startsWith("/dashboard/community");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { challenges } = useSelector((state: RootState) => state.challenge);
  const { talents } = useSelector((state: RootState) => state.talent);
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!talents || talents.length === 0) dispatch(fetchTalents());
    if (!challenges || challenges.length === 0) dispatch(fetchChallenges());
  }, [dispatch, pathname]);

  useEffect(() => {
    const storedUser: any = localStorage.getItem("user");

    if (!user) {
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser) as User;
          dispatch(setUser(parsedUser));
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
          localStorage.removeItem("user");
        }
      } else {
        const redirectUrl = encodeURIComponent(pathname);
        router.push(`/login?redirect=${redirectUrl}`);
      }
    }
  }, [dispatch, user, pathname, router]);

  return (
    <>
      {showNavbar && <DashboardNavbar />}
      {children}
    </>
  );
}
