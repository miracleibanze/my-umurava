"use client";

import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { FC } from "react";
import GoBack from "@components/Goback";
import ChallengeCard from "@components/challengeCard";
import { useRouter } from "next/navigation";

const Page: FC = () => {
  const challenges = useSelector(
    (state: RootState) => state.challenge.challenges
  );
  const router = useRouter();

  return (
    <>
      <section className="container mx-auto bg-zinc-100 py-12 md:px-12 px-6">
        <GoBack path="Challenges & Hackathons" />
        <div className="w-full flex flex-row flex-wrap gap-x-2 gap-y-6 py-12">
          {Array(9)
            .fill("")
            .map((_, index) => (
              <ChallengeCard
                {...challenges[index]}
                key={challenges[index]?._id || index}
                className={`!max-w-[20rem] ${index === 8 && "xl:hidden"}`}
                redirect
              />
            ))}
        </div>
        <button
          className="mt-12 border border-blue-500 hover:bg-blue-700/40  !text-blue-600 font-semibold px-12 py-4 rounded-lg block mx-auto"
          onClick={() =>
            router.push(
              `/login?redirect=${encodeURIComponent(
                "/dashboard/challenges&hackathons"
              )}`
            )
          }
        >
          View More
        </button>
      </section>
    </>
  );
};

export default Page;
