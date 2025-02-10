"use client";

import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { useParams } from "next/navigation";
import ProfileComponent from "@components/ProfileComponent";

const page = () => {
  const { talents } = useSelector((state: RootState) => state.talent);
  const { userId } = useParams();
  const selectedUser = talents.find((item) => item._id === userId)!;
  return <ProfileComponent user={selectedUser} />;
};

export default page;
