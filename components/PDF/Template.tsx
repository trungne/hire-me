import { Document, Page, StyleSheet, Font } from "@react-pdf/renderer";

import { CVInfo } from "shared/types";
import AwardSection from "./AwardSection";
import Container from "./Container";
import Divider from "./Divider";
import EducationSection from "./EducationSection";
import ProfileSection from "./ProfileSection";
import ProjectSection from "./ProjectSection";
import SkillSection from "./SkillSection";
import { WorkSection } from "./WorkSection";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Courier",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
});

const Template = ({ cvInfo }: { cvInfo: CVInfo }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Container marginHorizontal={32}>
          {cvInfo.profile && <ProfileSection profile={cvInfo.profile} />}
          <Divider />
          {cvInfo.workList && <WorkSection workList={cvInfo.workList} />}
          <Divider />

          {cvInfo.skillList && <SkillSection skillList={cvInfo.skillList} />}
          <Divider />

          {cvInfo.projectList && (
            <ProjectSection projectList={cvInfo.projectList} />
          )}
          <Divider />

          {cvInfo.awardList && <AwardSection awardList={cvInfo.awardList} />}
          <Divider />

          {cvInfo.educationList && (
            <EducationSection educationList={cvInfo.educationList} />
          )}
        </Container>
      </Page>
    </Document>
  );
};

export default Template;
