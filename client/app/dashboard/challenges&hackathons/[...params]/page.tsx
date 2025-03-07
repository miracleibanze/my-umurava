"use client";

import ChallengeDetails from "@components/ChallengeDetail";
import EditChallenge from "@components/EditChallenge";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { useParams } from "next/navigation";
import { FC, useEffect } from "react";
import { Challenge, fetchChallenges } from "@redux/slices/challengeSlice";
import { useDispatch } from "react-redux";

const Page: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { params } = useParams() as { params?: string[] };

  const challengeId = params?.[1] || "";
  const viewDetails = !params?.[2];

  const { challenges } = useSelector((state: RootState) => state.challenge);
  const { user } = useSelector((state: RootState) => state.user);

  const challenge = challenges.find((ch) => ch._id === challengeId?.toString());

  return (
    <>
      {viewDetails && (
        <ChallengeDetails
          challenge={challenge}
          admin={user?.role === "admin" ? true : false}
        />
      )}
      {!viewDetails && user?.role === "admin" && (
        <EditChallenge challenge={challenge} />
      )}
    </>
  );
};

export default Page;
