import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/slices/userSlice";
import challengeReducer from "@/redux/slices/challengeSlice";
import communityReducer from "@/redux/slices/communitySlice";
import messageReducer from "@/redux/slices/messageSlice";
import talentsReducer from "@/redux/slices/talentsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    challenge: challengeReducer,
    community: communityReducer,
    message: messageReducer,
    talent: talentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
