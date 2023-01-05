import "shared/fb";
import { useAtom } from "jotai";
import {
  CURRENT_NAV_BAR_LOCAL_STORAGE,
  CV_INFO_LOCAL_STORAGE_KEYS,
} from "shared/constants";
import { getLocalStorageData } from "shared/utils";
import {
  TemplateInfo,
  AwardInfo,
  EducationInfo,
  ProfileInfo,
  ProjectInfo,
  SkillInfo,
  WorkInfo,
  NavCategory,
  NavCategoryValueType,
} from "shared/types";
import {
  appUserAtom,
  firebaseUserAtom,
  navBarAtom,
  primitiveAwardInfo,
  primitiveEducationInfoAtom,
  primitiveProfileInfoAtom,
  primitiveProjectInfoAtom,
  primitiveSkillInfoAtom,
  primitiveTemplateInfoAtom,
  primitiveWorkInfoAtom,
  registrationModalAtom,
  writeAcessTokenAtom,
} from "shared/atoms";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "shared/fb";
import { getUserByEmail } from "./queries";

export const useInitCVInfo = () => {
  const [, setTemplateInfo] = useAtom(primitiveTemplateInfoAtom);
  const [, setProfileInfo] = useAtom(primitiveProfileInfoAtom);
  const [, setEducationInfo] = useAtom(primitiveEducationInfoAtom);
  const [, setWorkInfo] = useAtom(primitiveWorkInfoAtom);
  const [, setSkillInfo] = useAtom(primitiveSkillInfoAtom);
  const [, setProjectInfo] = useAtom(primitiveProjectInfoAtom);
  const [, setAwardInfo] = useAtom(primitiveAwardInfo);

  const [_navBar, setNavBar] = useAtom(navBarAtom);

  useEffect(() => {
    const persistentNavBar = getLocalStorageData<NavCategoryValueType>(
      CURRENT_NAV_BAR_LOCAL_STORAGE
    );

    if (
      persistentNavBar &&
      Object.values(NavCategory).includes(persistentNavBar)
    ) {
      setNavBar(persistentNavBar);
    } else {
      setNavBar("Template");
    }
  }, []);

  useEffect(() => {
    setTemplateInfo(
      getLocalStorageData<TemplateInfo>(
        CV_INFO_LOCAL_STORAGE_KEYS.TEMPLATE
      ) ?? 0
    );
    setProfileInfo(
      getLocalStorageData<ProfileInfo>(CV_INFO_LOCAL_STORAGE_KEYS.PROFILE)
    );
    setEducationInfo(
      getLocalStorageData<EducationInfo[]>(CV_INFO_LOCAL_STORAGE_KEYS.EDUCATION)
    );
    setWorkInfo(
      getLocalStorageData<WorkInfo[]>(CV_INFO_LOCAL_STORAGE_KEYS.WORK)
    );
    setSkillInfo(
      getLocalStorageData<SkillInfo[]>(CV_INFO_LOCAL_STORAGE_KEYS.SKILLS)
    );
    setProjectInfo(
      getLocalStorageData<ProjectInfo[]>(CV_INFO_LOCAL_STORAGE_KEYS.PROJECTS)
    );
    setAwardInfo(
      getLocalStorageData<AwardInfo[]>(CV_INFO_LOCAL_STORAGE_KEYS.AWARDS)
    );
  }, []);
};

export const useSubscribeFbAuthState = () => {
  const [, setAccessToken] = useAtom(writeAcessTokenAtom);
  const [, setFirebaseUser] = useAtom(firebaseUserAtom);
  const [, setAppUser] = useAtom(appUserAtom);
  const [, setModalOpened] = useAtom(registrationModalAtom);
  useEffect(() => {
    const subscribe = onAuthStateChanged(firebaseAuth, async (fbUser) => {
      if (!fbUser || !fbUser.email) {
        setAccessToken("");
        setFirebaseUser(null);
        return;
      }
      setFirebaseUser(fbUser);

      try {
        const { data } = await getUserByEmail(fbUser.email);

        if (data.error && data.error.code === 404) {
          setModalOpened(true);
          return;
        }

        setAppUser(data.data);
      } catch (e) {
        console.log(e);
      }
    });
    return () => {
      subscribe();
    };
  }, []);
};
