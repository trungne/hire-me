import { Document, Page } from "@react-pdf/renderer";
import { CVInfo } from "shared/types";
import AwardSection from "./AwardSection";
import Container from "./Container";
import Divider from "./Divider";
import EducationSection from "./EducationSection";
import ProfileSection from "./ProfileSection";
import ProjectSection from "./ProjectSection";
import SkillSection from "./SkillSection";
import { TemplateStyle } from "./styles";
import { WorkSection } from "./WorkSection";

const Template = ({
  cvInfo,
  styles,
}: {
  cvInfo: CVInfo;
  styles: TemplateStyle;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Container marginHorizontal={32}>
          {cvInfo.profile && (
            <ProfileSection styles={styles.profile} profile={cvInfo.profile} />
          )}
          <Divider />
          {cvInfo.workList && (
            <WorkSection styles={styles.work} workList={cvInfo.workList} />
          )}
          <Divider />

          {cvInfo.skillList && (
            <SkillSection styles={styles.skills} skillList={cvInfo.skillList} />
          )}
          <Divider />

          {cvInfo.projectList && (
            <ProjectSection
              styles={styles.projects}
              projectList={cvInfo.projectList}
            />
          )}
          <Divider />

          {cvInfo.awardList && (
            <AwardSection styles={styles.awards} awardList={cvInfo.awardList} />
          )}
          <Divider />

          {cvInfo.educationList && (
            <EducationSection
              styles={styles.education}
              educationList={cvInfo.educationList}
            />
          )}
        </Container>
      </Page>
    </Document>
  );
};

export default Template;
