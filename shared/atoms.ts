import { atom } from "jotai";
import axiosInstance from "./axios-settings";
import { CURRENT_NAV_BAR_LOCAL_STORAGE } from "./constants";
import { NavCategoryValueType } from "./types";

export const navBarPersistentAtom = atom<NavCategoryValueType | null>(null);

export const navBarAtom = atom<
  NavCategoryValueType | null,
  NavCategoryValueType
>(
  (get) => get(navBarPersistentAtom),
  (get, set, update) => {
    set(navBarPersistentAtom, update);
    localStorage.setItem(CURRENT_NAV_BAR_LOCAL_STORAGE, update);
  }
);

const _idTokenAtom = atom<String>("");

export const writeIdTokenAtom = atom<null, String>(
  null, // it's a convention to pass `null` for the first argument
  (get, set, update) => {
    // `update` is any single value we receive for updating this atom
    set(_idTokenAtom, update);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${update}`;
  }
);
