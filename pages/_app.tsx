import "../styles/globals.css";
import type { AppProps } from "next/app";
import "shared/fb";
import { MantineProvider } from "@mantine/core";
import { Provider as JotaiProvider } from "jotai";
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <JotaiProvider
      // @ts-ignore
      initialValues={[
        [
          primitiveTemplateInfoAtom,
          getLocalStorageData<TemplateInfo>(
            CV_INFO_LOCAL_STORAGE_KEYS.TEMPLATE
          ),
        ],
        [
          primitiveProfileInfoAtom,
          getLocalStorageData<ProfileInfo>(CV_INFO_LOCAL_STORAGE_KEYS.PROFILE),
        ],
        [
          primitiveEducationInfoAtom,
          getLocalStorageData<EducationInfo>(
            CV_INFO_LOCAL_STORAGE_KEYS.EDUCATION
          ),
        ],
        [
          primitiveWorkInfoAtom,
          getLocalStorageData<WorkInfo>(CV_INFO_LOCAL_STORAGE_KEYS.WORK),
        ],
        [
          primitiveSkillInfoAtom,
          getLocalStorageData<SkillInfo>(CV_INFO_LOCAL_STORAGE_KEYS.SKILLS),
        ],
        [
          primitiveProjectInfoAtom,
          getLocalStorageData<ProjectInfo>(CV_INFO_LOCAL_STORAGE_KEYS.PROJECTS),
        ],
        [
          primitiveAwardInfo,
          getLocalStorageData<AwardInfo>(CV_INFO_LOCAL_STORAGE_KEYS.AWARDS),
        ],
      ]}
    >
      <QueryClientProvider client={QUERY_CLIENT}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Component {...pageProps} />
        </MantineProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
}

export default MyApp;
