"use client";

import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { useRouter } from "next/navigation";
import { FC } from "react";
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
          <div className="w-flush py-2 px-3 flex gap-2" key={index}>
            {person.profile?.image ? (
              <Image
                src={person.profile.image}
                alt="person"
                className="w-10 h-10 "
              />
            ) : (
              <i className="fas fa-user text-2xl bg-zinc-200 w-10 h-10"></i>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TalentPage;
