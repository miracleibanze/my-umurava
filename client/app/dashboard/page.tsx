"use client";

import { useSelector } from "react-redux";
import ChallengeCard, {
  ChallengeCardSkeleton,
} from "@components/challengeCard";
import { RootState } from "@redux/store";
import { FC } from "react";
import Link from "next/link";

const Page: FC = () => {
  const { user, status, error } = useSelector((state: RootState) => state.user);
  const { talents } = useSelector((state: RootState) => state.talent);

  const challenges = useSelector(
    (state: RootState) => state.challenge?.challenges
  );
  const loadingChallenges = useSelector(
    (state: RootState) => state.challenge?.loadingChallenges
  );

  interface Analytic {
    title: string;
    count: number;
    percentage?: number;
    icon: string;
    link: string;
  }

  const analytics: Analytic[] = [
    {
      title: "Total Challenges",
      count: challenges?.length,
      icon: "fa-book",
      link: "/dashboard/challenges&hackathons",
    },
    {
      title: "Total Participants",
      count: talents?.length,
      icon: "fa-users",
      link: "/dashboard/talents",
    },
    {
      title: "Completed Challenges",
      count: challenges.filter((c) => c.status === "completed").length,
      percentage:
        (challenges.filter((c) => c.status === "completed").length /
          challenges.length) *
        100,
      icon: "fa-book",
      link: `/dashboard/challenges&hackathons?index=1`,
    },
    {
      title: "Open Challenges",
      count: challenges.filter((c) => c.status === "open").length,
      percentage:
        (challenges.filter((c) => c.status === "open").length /
          challenges.length) *
        100,
      icon: "fa-book",
      link: `/dashboard/challenges&hackathons?index=2`,
    },
    {
      title: "Ongoing Challenges",
      count: challenges.filter((c) => c.status === "ongoing").length,
      percentage:
        (challenges.filter((c) => c.status === "ongoing").length /
          challenges.length) *
        100,
      icon: "fa-book",
      link: `/dashboard/challenges&hackathons?index=3`,
    },
  ];

  return (
    <section className="w-full p-3 bg-zinc-50 flex-1 h-full">
      <h4 className="w-full font-semibold flex gap-2">
        Welcome back
        {status === "loading" ? (
          <div className="w-full max-w-24 !h-6 rounded-md bg-zinc-100 animate-pulse"></div>
        ) : user?.names ? (
          " " + user.names
        ) : (
          <span className="text-gray-500">User not found</span>
        )}
        ,
      </h4>
      <p className="text-sm !text-zinc-400 mb-4 flex items-start justify-between">
        <span>Build Work Experience through Skills Challenges</span>
        {user?.role === "talent" && (
          <Link href="/dashboard/profile" className="w-max">
            <button className="button bg-primary text-white">
              <i className="far fa-eye"></i> view Profile
            </button>
          </Link>
        )}
      </p>
      {!loadingChallenges ? (
        <div
          className={`gap-4 mb-8 ${
            user?.role === "admin"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6"
              : "flex flex-wrap items-center"
          }`}
        >
          {user?.role === "admin"
            ? analytics.map((data, index) => (
                <Link
                  href={data.link}
                  key={index}
                  className={`bg-white rounded-lg p-6 border-2 border-zinc-100 flex items-center max-md:max-w-md justify-start ${
                    index === 0 || index === 1
                      ? "lg:col-span-3"
                      : "lg:col-span-2"
                  } ${index === 0 ? "md:col-span-2" : "md:col-span-1"} relative
          ${index % 2 === 1 && "w-full ml-auto"}`}
                >
                  <i
                    className={`fas text-primary ${data.icon} p-3 rounded-full flex-0 bg-primary/10`}
                  ></i>
                  <div className="w-full pr-3 pl-5">
                    <div className="text-zinc-500 text-[11px] w-full">
                      {data.title}
                    </div>
                    <div className="text-md font-bold flex items-center">
                      {data.count}
                      <span
                        className={`text-primary px-1 ml-1 rounded-full bg-primary/10 text-[11px] ${
                          !data.percentage && "hidden"
                        }`}
                      >
                        {data.percentage?.toFixed(2) || ""}%
                      </span>
                    </div>

                    <select className="text-xs absolute top-2 right-4">
                      <option value="last-week">Last Week</option>
                      <option value="last-Month">Last Month</option>
                    </select>
                  </div>
                </Link>
              ))
            : analytics.map((data, index) => (
                <Link
                  href={data.link}
                  key={index}
                  className={`bg-white rounded-lg p-6 border-2 border-zinc-100 flex items-center max-md:max-w-md justify-start ${
                    index < 2 && "hidden"
                  } w-full max-w-[18rem]`}
                >
                  <div className="w-full pr-3 pl-5 relative">
                    <div className="h-full absolute top-0 bottom-0 left-0 w-[5px] bg-primary rounded-md"></div>
                    <div className="text-zinc-500 text-[11px] w-full">
                      {data.title}
                    </div>
                    <div className="text-md font-bold flex items-center">
                      {data.count}
                      <span
                        className={`text-primary px-1 ml-1 rounded-full bg-primary/10 text-[11px] ${
                          !data.percentage && "hidden"
                        }`}
                      >
                        {data.percentage?.toFixed(2) || ""}%
                      </span>
                    </div>
                  </div>
                  <i
                    className={`fas text-primary ${data.icon} p-3 rounded-full flex-0 bg-primary/10`}
                  ></i>
                </Link>
              ))}
        </div>
      ) : (
        <div className="w-full md:grid-cols-2 grid gap-2 my-4">
          {Array(4)
            .fill("")
            .map((_, index) => (
              <div
                className="bg-zinc-200 w-full h-20 rounded-md bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse animate-shimmer"
                key={index}
              ></div>
            ))}
        </div>
      )}
      <div className="w-full body-2 flex items-center justify-between py-5 pr-3">
        <p className="font-semibold">Recent challenges</p>
        <Link href="/dashboard/challenges&hackathons" className="text-primary">
          See all <i className="fas fa-angle-right"></i>
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {!loadingChallenges ? (
          challenges.length > 0 ? (
            Array(3)
              .fill("")
              .map((_, index) => (
                <ChallengeCard
                  key={challenges[index]._id || index}
                  {...challenges[index]}
                  className={`!max-w-[20rem] ${index === 8 && "xl:hidden"}`}
                />
              ))
          ) : (
            <p className="w-full body-2 text-zinc-700 text-center py-4">
              No challenges found
            </p>
          )
        ) : (
          Array(3)
            .fill("")
            .map((_, index) => <ChallengeCardSkeleton key={index} />)
        )}
      </div>
    </section>
  );
};

export default Page;
