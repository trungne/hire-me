import { atom, useAtom } from "jotai";
import { ResumeInfoCategory } from "./types";

export const infoCategoryAtom = atom<ResumeInfoCategory>("Template");

