"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

const pages: FC = () => {
  const router = useRouter();
  return (
    <section className="p-6 flex flex-col items-start">
      <button
        className="button bg-zinc-200 hover:bg-zinc-300 mb-3"
        onClick={() => router.back()}
      >
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <h3 className="h3 font-semibold">Help center</h3>
    </section>
  );
};

export default pages;
