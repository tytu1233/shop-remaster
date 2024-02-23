import { store } from "../store";

export type StoreStateType = ReturnType<(typeof store)["getState"]>;
export type AppDispatchType = (typeof store)["dispatch"];
