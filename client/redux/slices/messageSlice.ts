// store/messageSlice.ts

import axiosInstance from "@components/features/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the form data
export interface MessageState {
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  phoneNumber: string;
  institutionName: string;
  institutionType: string;
  collaborationType: string;
  traineeExperienceLevel: string;
  partnershipInterest: string;
  additionalInfo: string;
}

// Initial state for the form data
const initialState: MessageState = {
  name: "",
  email: "",
  message: "",
  status: "idle",
  error: null,
  subject: "help",
  phoneNumber: "",
  institutionName: "",
  institutionType: "",
  collaborationType: "",
  traineeExperienceLevel: "",
  partnershipInterest: "",
  additionalInfo: "",
};

// Define an async thunk to handle the API request
export const submitMessageForm = createAsyncThunk(
  "message/submitMessageForm",
  async (messageData: MessageState, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/messages", messageData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err || "Something went wrong");
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessageInfo: (state, action: PayloadAction<MessageState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.subject = action.payload.subject;
      state.message = action.payload.message;
      state.phoneNumber = action.payload.phoneNumber;
      state.institutionName = action.payload.institutionName;
      state.institutionType = action.payload.institutionType;
      state.collaborationType = action.payload.collaborationType;
      state.traineeExperienceLevel = action.payload.traineeExperienceLevel;
      state.partnershipInterest = action.payload.partnershipInterest;
      state.additionalInfo = action.payload.additionalInfo;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitMessageForm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitMessageForm.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.subject = action.payload.subject;
        state.message = action.payload.message;
        state.phoneNumber = action.payload.phoneNumber;
        state.institutionName = action.payload.institutionName;
        state.institutionType = action.payload.institutionType;
        state.collaborationType = action.payload.collaborationType;
        state.traineeExperienceLevel = action.payload.traineeExperienceLevel;
        state.partnershipInterest = action.payload.partnershipInterest;
        state.additionalInfo = action.payload.additionalInfo;
      })
      .addCase(submitMessageForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setMessageInfo } = messageSlice.actions;

export default messageSlice.reducer;
