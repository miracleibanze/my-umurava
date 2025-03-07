"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { FC, useEffect } from "react";
import GoBack from "@components/Goback";
import ChallengeCard from "@components/challengeCard";
import { usePathname, useRouter } from "next/navigation";
import { fetchChallenges } from "@redux/slices/challengeSlice";

const Page: FC = () => {
  const challenges = useSelector(
    (state: RootState) => state.challenge.challenges
  );
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (challenges.length === 0) {
      dispatch(fetchChallenges());
    }
  }, [dispatch, pathname]);

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
                className={`!max-w-[18rem] ${index === 8 && "xl:hidden"}`}
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
