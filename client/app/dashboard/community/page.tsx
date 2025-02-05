"use client";

import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@redux/store";
import CommunityForm from "@components/CommunityForm";
import CommunityCard from "@components/CommunityCard";
import {
  Community,
  createCommunity,
  deleteCommunity,
  fetchCommunities,
  updateCommunity,
} from "@redux/slices/communitySlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const communities = useSelector(
    (state: RootState) => state.community.communities
  );
  useEffect(() => {
    dispatch(fetchCommunities());
  }, []);

  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  );
  const [isManageMembersModalOpen, setIsManageMembersModalOpen] =
    useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [communityToManageMembers, setCommunityToManageMembers] =
    useState<Community | null>(null);

  const handleDelete = (id: string) => {
    setIsDeleting(true);
    dispatch(deleteCommunity(id));
    setIsDeleting(false);
  };

  const handleManageMembers = (community: Community) => {
    setCommunityToManageMembers(community);
    setIsManageMembersModalOpen(true);
  };

  useEffect(() => {
    if (!isCreateModalOpen) {
      setSelectedCommunity(null);
    }
  }, [isCreateModalOpen]);

  const closeModal = () => {
    setIsManageMembersModalOpen(false);
    setCommunityToManageMembers(null);
  };

  return (
    <div className="p-5 text-zinc-700">
      <h1 className="text-2xl font-bold mb-4 flex-0 my-4">
        Community Management
      </h1>
      <div className="w-full flex justify-end items-center mb-5">
        <button
          className="button text-white bg-primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <i className="fas fa-plus"></i> Create community
        </button>
      </div>
      {isCreateModalOpen && (
        <CommunityForm
          setIsCreateModalOpen={setIsCreateModalOpen}
          initialData={selectedCommunity!}
          selected={selectedCommunity ? true : false}
        />
      )}
      <table
        className="w-full border !rounded-lg border-zinc-300 p-3"
        cellPadding={3}
      >
        <thead>
          <th>Name</th>
          <th className="w-md">Description</th>
          <th>Members</th>
        </thead>
        <tbody>
          {communities.map((community) => (
            <CommunityCard
              key={community._id}
              community={community}
              onEdit={() => {
                setSelectedCommunity(community);
                setIsCreateModalOpen(true);
              }}
              onDelete={() => handleDelete(community._id!)}
              onManageMembers={() => handleManageMembers(community)}
              isDeleting={isDeleting}
            />
          ))}
        </tbody>
      </table>
      {isManageMembersModalOpen && communityToManageMembers && (
        <ListOfMembers
          community={communityToManageMembers}
          setIsManageMembersModalOpen={setIsManageMembersModalOpen}
        />
      )}
    </div>
  );
};
const ListOfMembers: FC<{
  community: Community;
  setIsManageMembersModalOpen: (data: boolean) => void;
}> = ({ community, setIsManageMembersModalOpen }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();

  return (
    <section className="fixed z-[100] inset-0 bg-zinc-600/30 backdrop-blur-sm flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-md p-3">
        <button
          className="button bg-zinc-100 mb-2"
          onClick={() => setIsManageMembersModalOpen(false)}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h4 className="h4 font-semibold">{community.name}</h4>
        <p className="text-sm text-zinc-500 mb-3">
          The following are members, you can view each person's profile or visit
          the whatsApp group.
        </p>
        <div className="w-full h-[15rem] border overflow-y-scroll mb-4 flex flex-col">
          <Link
            className="w-full px-3 py-2 border-b hover:bg-zinc-100 flex gap-2"
            href={`/dashboard/profile`}
          >
            <div className="h-12 w-12 border bg-zinc-100">
              <img
                src={user?.profile?.image}
                alt="person"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-8 w-full flex-1">
              <p className="body-2 font-semibold">{user?.names}</p>
              <p className="text-sm text-zinc-600 flex justify-between">
                <span>{user?.title}</span>
                <strong className="text-primary">Admin</strong>
              </p>
            </div>
          </Link>
          {community.listOfMembers ? (
            community.listOfMembers?.map((item) => (
              <Link
                className="w-full px-3 py-2 border-b hover:bg-zinc-100 flex gap-2"
                href={item._id}
              >
                <div className="h-12 w-12 border bg-zinc-100">
                  <img
                    src={item.image}
                    alt="person"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-8 w-full flex-1">
                  <p className="body-2 font-semibold">{item.names}</p>
                  <p className="text-sm text-zinc-600">{item.title}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="w-full h-full flex-1 flex items-center justify-center font-semibold text-zinc-400">
              No Members found
            </div>
          )}
        </div>
        <Link
          href="https://web.whatsapp.com/your-community-group-link"
          target="_blank"
        >
          <button className="button bg-primary text-white">Visit Group</button>
        </Link>
      </div>
    </section>
  );
};

export default Page;
