import axiosInstance from "@components/features/axiosInstance";
import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id?: string;
  names: string;
  email: string;
  password?: string;
  phoneNumber: string;
  role: string;
  title: string;
  about?: string;
  profile?: {
    image?: string;
    address?: string;
    interests?: string[];
    age?: number;
    country?: string;
    educationLevel?: string;
    skills?: string[];
  };
  experience?: {
    position: string;
    field: string;
    company: string;
    duration: {
      start: string;
      end: string;
    };
    description: string;
  };
  engagementStats?: {
    pointsEarned?: number;
    badges?: string[];
    completedChallenges?: number;
    feedbackReceived?: object[];
  };
  umuravaIntegration?: {
    umurava_id?: string;
    linkedAccounts?: {
      github?: string;
      linkedin?: string;
    };
  };
  audit?: {
    createdAt?: string;
    updatedAt?: string;
  };
}

interface UserState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (newUser: User, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", newUser);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      console.warn({ successfull: response });
      return user;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Failed to register user");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", credentials);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      console.warn({ successfull: response.data });
      setUser(user);
      return user ? user : response.data.message;
    } catch (error: any) {
      console.log(error);
      return error.response?.data || "Failed to log in";
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updatedUser: User, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/users/${updatedUser._id}`,
        updatedUser
      );
      const updatedUserData = response.data;
      return updatedUserData;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Failed to update user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.status = "idle";
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
