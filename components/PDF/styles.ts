import { Style } from "@react-pdf/types";

export const SECTION_FONT_SIZE = 18;
export const CONTENT_FONT_SIZE = 12;

export type ProfileSectionStyle = {
  name: Style;
  header: Style;
  infoContainer: Style;
  location: Style;
  email: Style;
  phone: Style;
  website: Style;
};

export type WorkSectionType = {
  sectionTitle: Style;
  workSection: Style;
  companyAndJobTitleContainer: Style;
  companyName: Style;
  jobTitle: Style;
  locationAndDurationContainer: Style;
  location: Style;
  duration: Style;
  responsibilities: Style;
  date: Style;
  dateSeparator: Style;
};

export type SkillSectionStyle = {
  sectionTitle: Style;
  skillSection: Style;
  skillName: Style;
};

export type ProjectSectionStyle = {
  sectionTitle: Style;
  projectSection: Style;
};

export type AwardSectionStyle = {
  sectionTitle: Style;
  awardSection: Style;
};

export type EducationSectionStyle = {
  sectionTitle: Style;
  educationSection: Style;
  date: Style;
  duration: Style;
  dateSeparator: Style;
  school: Style;
  degree: Style;
};

export type TemplateStyle = {
  previewImg: string;
  page: Style;
  profile: ProfileSectionStyle;
  work: WorkSectionType;
  skills: SkillSectionStyle;
  projects: ProjectSectionStyle;
  awards: AwardSectionStyle;
  education: EducationSectionStyle;
};

export const TEMPLATE_MAP: Record<number, TemplateStyle> = {
  0: {
    previewImg: "/template_1_preview.png",
    page: {
      fontFamily: "Courier",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#E4E4E4",
    },
    profile: {
      name: {
        fontSize: SECTION_FONT_SIZE + 4,
        textAlign: "center",
      },
      header: {
        display: "flex",
        flexDirection: "column",
        margin: 8,
        padding: 8,
        flexGrow: 1,
        textAlign: "center",
      },
      infoContainer: {
        marginTop: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        fontSize: CONTENT_FONT_SIZE,
      },
      location: {
        fontSize: CONTENT_FONT_SIZE,
      },
      email: {
        fontSize: CONTENT_FONT_SIZE,
      },
      phone: {
        fontSize: CONTENT_FONT_SIZE,
      },
      website: {
        fontSize: CONTENT_FONT_SIZE,
      },
    },
    work: {
      sectionTitle: {
        fontSize: SECTION_FONT_SIZE,
      },
      workSection: {
        marginLeft: 16,
        marginRight: 16,
        display: "flex",
        flexDirection: "column",
      },
      companyAndJobTitleContainer: {
        display: "flex",
        flexDirection: "column",
      },
      companyName: {
        fontWeight: "bold",
      },
      jobTitle: {
        fontStyle: "italic",
        fontWeight: "thin",
      },
      locationAndDurationContainer: {
        display: "flex",
        flexDirection: "column",
      },
      location: {
        display: "flex",
        alignSelf: "flex-end",
        marginRight: 8,
      },
      duration: {
        fontStyle: "italic",
        fontWeight: "thin",
        marginLeft: 8,
        marginRight: 8,
      },
      date: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      },
      dateSeparator: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      responsibilities: {
        display: "flex",
        flexDirection: "column",
        marginTop: 10,
        marginBottom: 10,
      },
    },
    skills: {
      sectionTitle: {
        fontSize: SECTION_FONT_SIZE,
      },
      skillSection: {
        marginLeft: 16,
        marginRight: 16,
        fontSize: CONTENT_FONT_SIZE,
        display: "flex",
        flexDirection: "column",
      },
      skillName: {
        fontWeight: "bold",
        marginRight: 8,
      },
    },
    projects: {
      sectionTitle: {
        fontSize: SECTION_FONT_SIZE,
      },
      projectSection: {
        marginLeft: 16,
        marginRight: 16,
        fontSize: CONTENT_FONT_SIZE,
      },
    },
    awards: {
      sectionTitle: {
        fontSize: SECTION_FONT_SIZE,
      },
      awardSection: {
        marginLeft: 16,
        marginRight: 16,
        fontSize: CONTENT_FONT_SIZE,
      },
    },
    education: {
      sectionTitle: {
        fontSize: SECTION_FONT_SIZE,
      },
      educationSection: {
        marginLeft: 16,
        marginRight: 16,
        fontSize: CONTENT_FONT_SIZE,
      },
      date: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      duration: {
        fontStyle: "italic",
        fontWeight: "thin",
      },
      dateSeparator: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
        marginRight: 8,
      },
      school: {
        fontWeight: "bold",
      },
      degree: {},
    },
  },
};
