import { Divider } from "@mantine/core";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useAtom } from "jotai";
import { cvInfoAtom } from "shared/atoms";
import ProfileSection from "./ProfileSection";
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
        {cvInfo.workList && <WorkSection workList={cvInfo.workList} />}
      </Page>
    </Document>
  );
};
