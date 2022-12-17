import { atom } from "jotai";
import axiosInstance from "./axios-settings";
import { ResumeCategory } from "./types";

export const infoCategoryAtom = atom<ResumeCategory>("TEMPLATE");

const _idTokenAtom = atom<String>("");

export const writeIdTokenAtom = atom<null, String>(
  null, // it's a convention to pass `null` for the first argument
  (get, set, update) => {
    // `update` is any single value we receive for updating this atom
    set(_idTokenAtom, update);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${update}`;
  }
);
