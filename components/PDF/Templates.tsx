import { Divider } from "@mantine/core";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useAtom } from "jotai";
import { cvInfoAtom } from "shared/atoms";
import { WorkSection } from "./WorkSection";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },

  name: {
    fontSize: 28,
    textAlign: "center",
  },
  header: {
    margin: 8,
    padding: 8,
    flexGrow: 1,
    textAlign: "center",
  },
  section: {
    margin: 30,
    padding: 8,
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 24,
  },
});

export const TemplateA = () => {
  const [cvInfo] = useAtom(cvInfoAtom);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{cvInfo?.profile?.fullName}</Text>

          <View
            style={{
              marginTop: 8,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text>{cvInfo?.profile?.location}</Text>
            <Text
              style={{
                marginLeft: 8,
                marginRight: 8,
              }}
            >
              -
            </Text>
            <Text>{cvInfo?.profile?.email}</Text>
            <Text
              style={{
                marginLeft: 8,
                marginRight: 8,
              }}
            >
              -
            </Text>
            <Text>{cvInfo?.profile?.phoneNumber}</Text>
          </View>
        </View>
        <Divider />
        {cvInfo?.workList && <WorkSection workList={cvInfo.workList} />}
      </Page>
    </Document>
  );
};
