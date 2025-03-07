"use client";

import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import ProfileComponent from "@components/ProfileComponent";
import { useDispatch } from "@node_modules/@types/react-redux";

const Profile: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);


  return <ProfileComponent user={user} />;
};

export default Profile;
