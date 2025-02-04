"use client";

import { useState, FC } from "react";
import { useDispatch } from "react-redux";
import {
  Community,
  createCommunity,
  updateCommunity,
} from "@redux/slices/communitySlice";
import { AppDispatch } from "@redux/store";

interface CommunityFormProps {
  setIsCreateModalOpen: (data: boolean) => void;
  selected: boolean;
  initialData?: Community;
}

// Placeholder function for image upload (Replace with actual API)
const uploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(URL.createObjectURL(file)), 1000)
  );
};

const CommunityForm: FC<CommunityFormProps> = ({
  setIsCreateModalOpen,
  selected,
  initialData,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialFormData: Community = {
    name: initialData?.name || "",
    description: initialData?.description || "",
    category: initialData?.category || "tech",
    visibility: initialData?.visibility || "public",
    members: initialData?.members || 0,
  };

  const [formData, setFormData] = useState<Community>(initialFormData);
  const [imageUploading, setImageUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCommunity(formData));
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (initialData?._id) {
      dispatch(updateCommunity({ id: initialData._id, updatedData: formData }));
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-800/30 backdrop-blur-sm z-[100] py-10">
      <form
        onSubmit={selected ? handleEdit : handleCreate}
        className="space-y-4 bg-white p-5 shadow-md w-full max-w-md mx-auto max-h-full overflow-x-hidden"
      >
        <div>
          <p className="body-1 font-semibold">Create a community</p>
          <p className="text-sm text-zinc-600 pr-4 mb-4">
            By creating a community, you are creating a space for those with
            ambition in your category to engage in development activities.
          </p>
        </div>
        <div>
          <label className="block font-medium">Community Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="tech">Tech</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Visibility</label>
          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            className="input"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="bg-zinc-300 hover:bg-zinc-400 font-bold py-2 px-4 rounded"
            onClick={() => setIsCreateModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {initialData ? "Update Community" : "Create Community"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommunityForm;
