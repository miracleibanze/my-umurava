"use client";

import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const TalentPage: FC = () => {
  const router = useRouter();
  const { talents } = useSelector((state: RootState) => state.talent);
  return (
    <section className="p-6 flex flex-col items-start">
      <button
        className="button bg-zinc-200 hover:bg-zinc-300 mb-3"
        onClick={() => router.back()}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
      <h3 className="h3 font-semibold">Talents</h3>
      <div className="w-full max-w-lg">
        {talents.map((person, index) => (
          <Link
            className="w-full px-3 py-2 border-b hover:bg-zinc-100 flex gap-2 items-center"
            href={`/dashboard/talents/${person._id}`}
            key={index}
          >
            <div className="h-12 w-12 border bg-zinc-100 flex items-center justify-center">
              {person.profile?.image ? (
                <Image
                  src={person.profile.image}
                  alt="person"
                  className="w-full h-full"
                  width={400}
                  height={400}
                />
              ) : (
                <i className="fas fa-user text-2xl"></i>
              )}
            </div>
            <div className="h-8 w-full flex-1">
              <p className="body-2 font-semibold">{person.names}</p>
              <p className="text-sm text-zinc-600">{person.title}</p>
            </div>
            <button className="button bg-primary text-white">
              View profile
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TalentPage;
