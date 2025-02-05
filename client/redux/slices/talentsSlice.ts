import { mockUsers } from "@components/constants";
import axiosInstance from "@components/features/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./userSlice";


export const fetchTalents = createAsyncThunk(
  "talents/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/talents");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch talents");
    }
  }
);

interface TalentState {
  talents: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TalentState = {
  talents: [],
  status: "idle",
  error: null as string | null,
};

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
