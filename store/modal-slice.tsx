import { createSlice } from "@reduxjs/toolkit";

const ModalReducer = createSlice({
  name: "modal",
  initialState: { show: false },
  reducers: {
    open(state) {
      state.show = true;
    },
    close(state) {
      state.show = false;
    },
  },
});

export const ModalActions = ModalReducer.actions;

export default ModalReducer.reducer;
