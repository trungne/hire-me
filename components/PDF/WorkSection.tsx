import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { WorkInfo } from "shared/types";
import Container from "./Container";

export type WorkSectionType = {
  sectionTitle: Style;
  workSection: Style;

  companyAndJobTitleContainer: Style;
  companyName: Style;
  jobTitle: Style;
  locationAndDurationContainer: Style;
  location: Style;
  duration: Style;
};

const styles = StyleSheet.create<WorkSectionType>({
  sectionTitle: {
    fontSize: 28,
  },
  workSection: {
    marginLeft: 16,
    marginRight: 16,
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
  location: {},
  duration: { fontStyle: "italic", fontWeight: "thin" },
});

export const WorkSection = ({ workList }: { workList: WorkInfo[] }) => {
  return (
    <Container marginHorizontal={48} marginVertical={12}>
      <View style={styles.sectionTitle}>
        <Text>Experience</Text>
      </View>
      <View>
        {workList.map((work) => {
          return (
            <View
              style={{
                ...styles.workSection,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.companyAndJobTitleContainer}>
                  <Text style={styles.companyName}>{work.companyName}</Text>
                  <Text style={styles.jobTitle}>{work.jobTitle}</Text>
                </View>
                <View style={styles.locationAndDurationContainer}>
                  <Text style={styles.location}>{work.location}</Text>
                  <View>
                    <Text style={styles.duration}>{work.startDate}</Text>
                    <Text style={styles.duration}>{work.endDate}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                {work.responsibilities.map((responsibility, idx) => {
                  return <Text>- {responsibility}</Text>;
                })}
              </View>
            </View>
          );
        })}
      </View>
    </Container>
  );
};
