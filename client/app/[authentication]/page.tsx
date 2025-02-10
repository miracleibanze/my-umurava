"use client";

import { FC, Suspense, use } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Umuravalogo } from "@public";
import Login from "@components/Login";
import Register from "@components/Register";

const page: FC = () => {
  const { authentication }: { authentication: string } = useParams();
  const router = useRouter();
  const validRoutes: string[] = ["login", "register"];

  if (!validRoutes.includes(authentication)) {
    notFound();
  }
  return (
    <section className="w-full min-h-screen bg-zinc-100 ">
      <nav className="w-full bg-white p-2 flex items-center justify-between px-6">
        <Image
          src={Umuravalogo}
          alt="logo"
          width={150}
          className="w-[10rem]"
          onClick={() => router.push("/")}
        />
      </nav>
      <div className="w-full max-w-sm mx-auto py-4 flex flex-col">
        <Suspense fallback={<p>Loading page...</p>}>
          {authentication === "login" && <Login />}
          {authentication === "register" && <Register />}
        </Suspense>
      </div>
    </section>
  );
};

export default page;
