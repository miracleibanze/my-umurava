"use client";

import Profile from "@app/dashboard/profile/page";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { useParams } from "next/navigation";

const page = () => {
  const { talents } = useSelector((state: RootState) => state.talent);
  const { userId } = useParams();
  const selectedUser = talents.find((item) => item._id === userId)!;
  return <Profile selectedUser={selectedUser} />;
};

export default page;
