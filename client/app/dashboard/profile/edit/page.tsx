"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { updateUser, User } from "@redux/slices/userSlice";

const Page: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [isSendingData, setIsSendingData] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>(
    user || {
      names: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "",
      title: "",
      about: "",
      profile: {
        image: "",
        address: "",
        interests: [],
        age: 0,
        country: "",
        educationLevel: "",
        skills: [],
      },
      experience: {
        position: "",
        field: "",
        company: "",
        duration: {
          start: "",
          end: "",
        },
        description: "",
      },

      engagementStats: {
        pointsEarned: 0,
        badges: [],
        completedChallenges: 0,
        feedbackReceived: [],
      },

      umuravaIntegration: {
        umurava_id: "",
        linkedAccounts: {
          github: "",
          linkedin: "",
        },
      },

      audit: {
        createdAt: "",
        updatedAt: "",
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        [name]: value || "",
      },
    }));
  };

  const handleEngagementStatsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      engagementStats: {
        ...formData?.engagementStats,
        [name]: value,
      },
    });
  };

  const handleUmuravaIntegrationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      umuravaIntegration: {
        ...formData?.umuravaIntegration,
        linkedAccounts: {
          ...formData?.umuravaIntegration?.linkedAccounts,
          [name]: value,
        },
      },
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSendingData(true);

    try {
      console.log(user?._id);
      const response = await dispatch(updateUser(formData));

      response.payload && router.push("/dashboard/profile");
      
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user details. Please try again.");
      setError(true);
    } finally {
      setIsSendingData(false);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <section className="flex flex-col items-start min-h-screen bg-gray-100 py-8 px-4">
      <button
        className="button bg-zinc-200 hover:bg-zinc-300 mb-3"
        onClick={() => router.back()}
      >
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Names
              </label>
              <input
                type="text"
                name="names"
                value={formData?.names}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData?.role}
                onChange={handleRole}
                className="input w-full"
              >
                <option value="talent">Talent</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData?.title}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData?.phoneNumber}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData?.profile?.country}
                onChange={handleProfileChange}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Education Level
              </label>
              <input
                type="text"
                name="educationLevel"
                value={formData?.profile?.educationLevel}
                onChange={handleProfileChange}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <input
                type="text"
                name="skills"
                value={formData?.profile?.skills?.join(", ")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const skills = e.target.value
                    .split(",")
                    .map((skill) => skill.trim());
                  setFormData({
                    ...formData,
                    profile: {
                      ...formData.profile,
                      skills,
                    },
                  });
                }}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Interests
              </label>
              <input
                type="text"
                name="interests"
                value={formData?.profile?.interests?.join(", ")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const interests = e.target.value
                    .split(",")
                    .map((interest) => interest.trim());
                  setFormData({
                    ...formData,
                    profile: {
                      ...formData.profile,
                      interests,
                    },
                  });
                }}
                className="input w-full"
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Engagement Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Points Earned
              </label>
              <input
                type="number"
                name="pointsEarned"
                value={formData?.engagementStats?.pointsEarned}
                onChange={handleEngagementStatsChange}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Badges
              </label>
              <input
                type="text"
                name="badges"
                value={formData?.engagementStats?.badges?.join(", ")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const badges = e.target.value
                    .split(",")
                    .map((badge) => badge.trim());
                  setFormData({
                    ...formData,
                    engagementStats: {
                      ...formData.engagementStats,
                      badges,
                    },
                  });
                }}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Completed Challenges
              </label>
              <input
                type="number"
                name="completedChallenges"
                value={formData?.engagementStats?.completedChallenges}
                onChange={handleEngagementStatsChange}
                className="input w-full"
              />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-4">Umurava Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                GitHub
              </label>
              <input
                type="url"
                name="github"
                value={formData?.umuravaIntegration?.linkedAccounts?.github}
                onChange={handleUmuravaIntegrationChange}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData?.umuravaIntegration?.linkedAccounts?.linkedin}
                onChange={handleUmuravaIntegrationChange}
                className="input w-full"
              />
            </div>
          </div>
          {error && (
            <span className="text-red-500">
              Failed to update profile at the moment, please try again later!
            </span>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSendingData}
              className={`px-6 py-2 rounded-md transition duration-300 ${
                isSendingData
                  ? "bg-zinc-400"
                  : "bg-primary text-white hover:bg-blue-600"
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Page;
