import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postSlice";
import userReducer from "./userSlice";
import commentsReducer from "./commentsSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    comments: commentsReducer,
  },
});
