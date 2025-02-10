"use client"

import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import ProfileComponent from "@components/ProfileComponent";

const Profile: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return <ProfileComponent user={user} />;
};

export default Profile;
