import { mockUsers } from "@components/constants";
import axiosInstance from "@components/features/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserProfile {
  image: string; // Base64-encoded image or image URL
}

export interface User {
  userId: string;
  names: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: "admin" | "editor" | "moderator" | "user"; // Use a union for fixed roles
  title: string;
  about: string;
  profile?: UserProfile;
}

// Define the async thunk to fetch all talents
export const fetchTalents = createAsyncThunk(
  "talents/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/talents");
      return response.data; // Assuming response.data is an array of talent objects
    } catch (error: any) {
      // return rejectWithValue(error.response?.data || "Failed to fetch talents");
      return mockUsers;
    }
  }
);

// Initial state
interface TalentState {
  talents: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
// Initial state
const initialState: TalentState = {
  talents: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null as string | null,
};

// Create the slice
const talentsSlice = createSlice({
  name: "talents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTalents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTalents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.talents = action.payload;
      })
      .addCase(fetchTalents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default talentsSlice.reducer;
