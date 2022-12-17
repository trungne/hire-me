import { atom } from "jotai";
import { ResumeCategory } from "./types";

export const infoCategoryAtom = atom<ResumeCategory>("TEMPLATE");
export const idTokenAtom = atom<String>("");

export const writeIdTokenAtom = atom<null, String>(
  null, // it's a convention to pass `null` for the first argument
  (get, set, update) => {
    // `update` is any single value we receive for updating this atom
    set(idTokenAtom, update);
  }
);
