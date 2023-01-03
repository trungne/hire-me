import { Divider } from "@mantine/core";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useAtom } from "jotai";
import { cvInfoAtom } from "shared/atoms";
import AwardSection from "./AwardSection";
import Container from "./Container";
import EducationSection from "./EducationSection";
import ProfileSection from "./ProfileSection";
import ProjectSection from "./ProjectSection";
import SkillSection from "./SkillSection";
import { WorkSection } from "./WorkSection";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
});

export const TemplateA = () => {
  const [cvInfo] = useAtom(cvInfoAtom);

  if (!cvInfo) {
    return null;
  }
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {cvInfo.profile && <ProfileSection profile={cvInfo.profile} />}
        <Divider />

        <Container marginHorizontal={48}>
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
