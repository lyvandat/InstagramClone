import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./modal-slice";

const store = configureStore({
  reducer: { modal: ModalReducer },
});

export default store;
