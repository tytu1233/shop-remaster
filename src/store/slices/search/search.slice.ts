import { createSlice } from "@reduxjs/toolkit";
import { SearchType } from "./type/search.type";
import { RootState } from "../../types/store.type";

const initialState: SearchType = {
  expand: false,
  isSearching: false,
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
    startSearching: (state) => {
      state.isSearching = true;
    },
    stopSearching: (state) => {
      state.isSearching = false;
    },
  },
});

export const { openSearchBox, closeSearchBox, startSearching, stopSearching } =
  searchSlice.actions;

export const selectExpand = (state: RootState) => state.search.expand;
export const selectIsSearching = (state: RootState) => state.search.isSearching;

export default searchSlice;
