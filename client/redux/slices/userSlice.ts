import axiosInstance from "@components/features/axiosInstance";
import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the user
export interface User {
  _id?: string;
  names: string;
  email: string;
  password?: string; // Optional for update
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
    umuravaUserId?: string;
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

// Initial state
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

// **Thunk for registering a new user**
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

// **Thunk for logging in a user**
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

// **Thunk for updating a user**
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
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save user to localStorage
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // Remove user from localStorage
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
        localStorage.setItem("user", JSON.stringify(action.payload)); // Save user to localStorage
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
        localStorage.setItem("user", JSON.stringify(action.payload)); // Save user to localStorage
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
        localStorage.setItem("user", JSON.stringify(action.payload)); // Save updated user to localStorage
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;


Dear Umurava Talent Management Team
Greetings!

I hope this email finds you well. I am writing to inform you that my team and I have successfully completed our work on the Skills Challenge for Software Developers as per the provided instructions. We are excited to share our deliverables and are ready for the next steps in the process.

We would appreciate it if you could guide us on how to proceed with the submission of our work and any additional information or feedback you may require from us.

Thank you for your support throughout this challenge. We look forward to hearing from you soon.

Best regards,
[Your Full Name]
Dear Umurava Talent Management Team
Greetings!

I hope this email finds you well. I am writing to inform you that my team and I have successfully completed our work on the Skills Challenge for Software Developers as per the provided instructions. We are excited to share our deliverables and are ready for the next steps in the process.

We would appreciate it if you could guide us on how to proceed with the submission of our work and any additional information or feedback you may require from us.

Thank you for your support throughout this challenge. We look forward to hearing from you soon.

Best regards,
[Your Full Name]