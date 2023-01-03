import "../styles/globals.css";
import type { AppProps } from "next/app";
import "shared/fb";
import { MantineProvider } from "@mantine/core";
import { Provider as JotaiProvider, useAtom } from "jotai";
import { QueryClientProvider } from "react-query";
import { CV_INFO_LOCAL_STORAGE_KEYS, QUERY_CLIENT } from "shared/constants";
import { getLocalStorageData } from "shared/utils";
import {
  TemplateInfo,
  AwardInfo,
  EducationInfo,
  ProfileInfo,
  ProjectInfo,
  SkillInfo,
  WorkInfo,
} from "shared/types";
import {
  primitiveAwardInfo,
  primitiveEducationInfoAtom,
  primitiveProfileInfoAtom,
  primitiveProjectInfoAtom,
  primitiveSkillInfoAtom,
  primitiveTemplateInfoAtom,
  primitiveWorkInfoAtom,
} from "shared/atoms";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [, setTemplateInfo] = useAtom(primitiveTemplateInfoAtom);
  const [, setProfileInfo] = useAtom(primitiveProfileInfoAtom);
  const [, setEducationInfo] = useAtom(primitiveEducationInfoAtom);
  const [, setWorkInfo] = useAtom(primitiveWorkInfoAtom);
  const [, setSkillInfo] = useAtom(primitiveSkillInfoAtom);
  const [, setProjectInfo] = useAtom(primitiveProjectInfoAtom);
  const [, setAwardInfo] = useAtom(primitiveAwardInfo);

  useEffect(() => {
    setTemplateInfo(
      getLocalStorageData<TemplateInfo>(CV_INFO_LOCAL_STORAGE_KEYS.TEMPLATE)
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
  }, [
    setTemplateInfo,
    setProfileInfo,
    setEducationInfo,
    setWorkInfo,
    setSkillInfo,
    setProjectInfo,
    setAwardInfo,
  ]);
  return (
    <JotaiProvider>
      <QueryClientProvider client={QUERY_CLIENT}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Component {...pageProps} />
        </MantineProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
}

export default MyApp;
