"use client";

import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@redux/slices/userSlice";
import { useRouter } from "next/navigation";
interface ProfileProps {
  selectedUser: User;
}

const Profile: FC<ProfileProps> = ({ selectedUser }) => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);
  const person = selectedUser || user;
  return (
    <section className="w-full p-6 bg-zinc-100">
      {selectedUser && (
        <button
          className="button bg-zinc-200 hover:bg-zinc-300 mb-3"
          onClick={() => router.back()}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
      )}
      <div className="bg-white shadow-md rounded-2xl p-6 flex mb-4">
        <div className="flex items-center justify-center px-3">
          {person?.profile?.image ? (
            <Image
              src={person?.profile?.image || "/default-avatar.png"}
              alt="Profile"
              width={300}
              height={500}
              className="rounded-full border h-[10rem] w-[10rem] flex-0"
            />
          ) : (
            <i className="fas fa-user text-[7rem] border h-[10rem] w-[10rem] flex-0 rounded-full flex items-center justify-center text-center pt-[1rem] text-white bg-zinc-300 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse animate-shimmer"></i>
          )}
        </div>

        <div className="px-3 w-full flex-1">
          <h3 className="h3 font-bold">{person?.names || "Names"}</h3>
          <p className="body-2 !text-primary">{person?.title || "my title"}</p>
          <p className="text-sm text-gray-700">
            {person?.email || "Your email"}
          </p>
          <p className="text-sm text-gray-700">
            {person?.phoneNumber || "number"}
          </p>
          <p className="text-sm text-gray-700">{person?.role || "role"}</p>
          {!selectedUser && (
            <div className="min-w-full flex-1 flex justify-end">
              <Link className="w-max" href="/dashboard/profile/edit">
                <button className="button bg-zinc-100 hover:bg-zinc-200">
                  <i className="fas fa-edit"></i> edit profile
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-full min-w-sm max-w-md">
          <strong className="block">About:</strong>
          <p className="max-w-md px-2 mb-4">{person?.about || "___"}</p>
          <strong className="block">Skills:</strong>
          <p className="px-2 mb-4">
            {person?.profile?.skills?.join(", ") || "___"}
          </p>
        </div>
        <div className="p-4 mt-2">
          <strong className="block">Country:</strong>
          <p className="px-2 mb-4">{person?.profile?.country || "___"}</p>
          <strong className="block">Education:</strong>
          <p className="px-2 mb-4">
            {person?.profile?.educationLevel || "___"}
          </p>
          <strong className="block">Interests:</strong>
          <p className="px-2 mb-4">
            {person?.profile?.interests?.join(", ") || "___"}
          </p>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="p-4 border-t mt-2">
        <p>
          <strong>Points Earned:</strong>{" "}
          {person?.engagementStats?.pointsEarned || 0}
        </p>
        <p>
          <strong>Completed Challenges:</strong>{" "}
          {person?.engagementStats?.completedChallenges || 0}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {person?.engagementStats?.badges?.length ? (
            person?.engagementStats?.badges.map((badge, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-gray-200 rounded-lg"
              >
                {badge}
              </span>
            ))
          ) : (
            <p>No badges yet</p>
          )}
        </div>
      </div>

      {/* Linked Accounts */}
      <div className="bg-white shadow-md rounded-2xl p-4 mt-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Linked Accounts</h3>
          <p className="text-sm text-gray-500">Connected profiles</p>
        </div>
        <div className="flex gap-4">
          {person?.umuravaIntegration?.linkedAccounts?.github && (
            <a
              href={person?.umuravaIntegration?.linkedAccounts?.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github text-gray-700 hover:text-black text-2xl"></i>
            </a>
          )}
          {person?.umuravaIntegration?.linkedAccounts?.linkedin && (
            <a
              href={person?.umuravaIntegration?.linkedAccounts?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin text-blue-700 hover:text-blue-900 text-2xl"></i>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
