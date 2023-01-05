import { atom } from "jotai";
import axiosInstance from "./axios-settings";
import {
  CURRENT_NAV_BAR_LOCAL_STORAGE,
  CV_INFO_LOCAL_STORAGE_KEYS,
} from "./constants";
import {
  AwardInfo,
  CVInfo,
  EducationInfo,
  NavCategoryValueType,
  ProfileInfo,
  ProjectInfo,
  SkillInfo,
  TemplateInfo,
  User,
  WorkInfo,
} from "./types";
import { User as FirebaseUser } from "firebase/auth";
import { getAccessToken, getUserByEmail } from "./queries";

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

// registrationModalAtom
export const registrationModalAtom = atom(false);

// navBarAtom
export const navBarPersistentAtom = atom<NavCategoryValueType | null>(null);
export const navBarAtom = createPersistentAtom(
  navBarPersistentAtom,
  CURRENT_NAV_BAR_LOCAL_STORAGE
);

// accessTokenAtom
export const accessTokenAtom = atom<string | null>(null);
export const writeAcessTokenAtom = atom<null, string>(
  null, // it's a convention to pass `null` for the first argument
  (get, set, update) => {
    // `update` is any single value we receive for updating this atom
    set(accessTokenAtom, update);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${update}`;
  }
);

// firebaseUserAtom
export const firebaseUserAtom = atom<FirebaseUser | null>(null);

// appUserAtom
const _appUserAtom = atom<User | null>(null);
export const appUserAtom = atom<User | null, User>(
  (get) => get(_appUserAtom),
  async (get, set, update) => {
    const firebaseUser = get(firebaseUserAtom);
    if (!firebaseUser) {
      console.log("No firebase user");
      return;
    }
    const idToken = await firebaseUser.getIdToken();
    const {
      data: { data: accessToken },
    } = await getAccessToken({ idToken });

    set(writeAcessTokenAtom, accessToken);
    set(_appUserAtom, update);
  }
);
// CV info atoms
export const primitiveTemplateInfoAtom = atom<TemplateInfo | null>(0);
export const templateInfoAtom = createPersistentAtom(
  primitiveTemplateInfoAtom,
  CV_INFO_LOCAL_STORAGE_KEYS.TEMPLATE
);
export const primitiveProfileInfoAtom = atom<ProfileInfo | null>(null);
export const profileInfoAtom = createPersistentAtom(
  primitiveProfileInfoAtom,
  CV_INFO_LOCAL_STORAGE_KEYS.PROFILE
);

export const primitiveEducationInfoAtom = atom<EducationInfo[] | null>(null);
export const educationInfoAtom = createPersistentAtom(
  primitiveEducationInfoAtom,
  CV_INFO_LOCAL_STORAGE_KEYS.EDUCATION
);

export const primitiveWorkInfoAtom = atom<WorkInfo[] | null>(null);
export const workInfoAtom = createPersistentAtom(
  primitiveWorkInfoAtom,
  CV_INFO_LOCAL_STORAGE_KEYS.WORK
);

export const primitiveSkillInfoAtom = atom<SkillInfo[] | null>(null);
export const skillInfoAtom = createPersistentAtom(
  primitiveSkillInfoAtom,
  CV_INFO_LOCAL_STORAGE_KEYS.SKILLS
);

export const primitiveProjectInfoAtom = atom<ProjectInfo[] | null>(null);
export const projectInfoAtom = createPersistentAtom(
  primitiveProjectInfoAtom,
  CV_INFO_LOCAL_STORAGE_KEYS.PROJECTS
);

export const primitiveAwardInfo = atom<AwardInfo[] | null>(null);
export const awardInfoAtom = createPersistentAtom(
  primitiveAwardInfo,
  CV_INFO_LOCAL_STORAGE_KEYS.AWARDS
);

export const cvInfoAtom = atom<CVInfo | null>((get) => {
  const template = get(primitiveTemplateInfoAtom);
  if (template === null) {
    return null;
  }
  const profile = get(primitiveProfileInfoAtom) ?? undefined;
  const educationList = get(primitiveEducationInfoAtom) ?? undefined;
  const workList = get(primitiveWorkInfoAtom) ?? undefined;
  const skillList = get(primitiveSkillInfoAtom) ?? undefined;
  const projectList = get(primitiveProjectInfoAtom) ?? undefined;
  const awardList = get(primitiveAwardInfo) ?? undefined;

  return {
    template,
    profile,
    educationList,
    workList,
    skillList,
    projectList,
    awardList,
  };
});
