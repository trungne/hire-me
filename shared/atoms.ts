import { atom } from "jotai";
import axiosInstance from "./axios-settings";
import { CURRENT_NAV_BAR_LOCAL_STORAGE } from "./constants";
import { NavCategoryValueType, ProjectInfo } from "./types";
import { User as FirebaseUser } from "firebase/auth";

const createPersistentAtom = <T>(
  primativeAtom: ReturnType<typeof atom<T>>,
  localStorageKey: string
) => {
  return atom<T, T>(
    (get) => get(primativeAtom),
    (get, set, update) => {
      set(primativeAtom, update);
      localStorage.setItem(localStorageKey, JSON.stringify(update));
    }
  );
};

export const firebaseUserAtom = atom<FirebaseUser | null>(null);

export const navBarPersistentAtom = atom<NavCategoryValueType | null>(null);

export const navBarAtom = createPersistentAtom(
  navBarPersistentAtom,
  CURRENT_NAV_BAR_LOCAL_STORAGE
);

export const idTokenAtom = atom<string | null>(null);

export const writeIdTokenAtom = atom<null, string>(
  null, // it's a convention to pass `null` for the first argument
  (get, set, update) => {
    // `update` is any single value we receive for updating this atom
    set(idTokenAtom, update);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${update}`;
  }
);

const primitiveProjectInfo = atom<ProjectInfo | null>(null);
export const projectInfoAtom = createPersistentAtom(
  primitiveProjectInfo,
  "HIRE_ME_PROJECT_INFO"
);
// export const projectInfoAtom = atom<ProjectInfo | null, ProjectInfo>(
//   (get) => get(primitiveProjectInfo),
//   (get, set, update) => {
//     // `update` is any single value we receive for updating this atom
//     set(primitiveProjectInfo, update);
//   }
// );
