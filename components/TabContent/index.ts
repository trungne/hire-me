import { SetNavBar } from "shared/types";
import AwardContent from "./AwardContent";
import EducationContent from "./EducationContent";
import ProfileContent from "./ProfileContent";
import ProjectContent from "./ProjectContent";
import SkillContent from "./SkillContent";
import TemplateContent from "./TemplateContent";
import WorkContent from "./WorkContent";

export {
  AwardContent,
  EducationContent,
  ProfileContent,
  ProjectContent,
  SkillContent,
  TemplateContent,
  WorkContent,
};

export type CommonTabContentType = {
  setNavBar: SetNavBar;
};

export type InputFormProps<T> = {
  idx: number;
  remove: (id: number) => void;
  add: () => void;
  formMap: Record<number, T>;
};
