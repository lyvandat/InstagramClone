import { createSlice } from "@reduxjs/toolkit";
import { ShareState } from "../models/redux";

const initlaShareState: ShareState = { share: false, imageString: "" };

const ShareReducer = createSlice({
  name: "share",
  initialState: initlaShareState,
  reducers: {
    post: (state) => {
      state.share = true;
    },
    reset: (state) => {
      state.share = false;
    },
  },
});

export const ShareActions = ShareReducer.actions;

export default ShareReducer.reducer;
