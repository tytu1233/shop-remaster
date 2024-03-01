import { createSlice } from "@reduxjs/toolkit";
import { SearchType } from "./type/search.type";
import { RootState } from "../../types/store";

const initialState: SearchType = {
  expand: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openSearchBox: (state) => {
      state.expand = true;
    },
    closeSearchBox: (state) => {
      state.expand = false;
    },
  },
});

export const { openSearchBox, closeSearchBox } = searchSlice.actions;

export const selectExpand = (state: RootState) => state.search.expand;

export default searchSlice;
