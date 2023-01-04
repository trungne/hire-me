import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { WorkInfo } from "shared/types";
import { formatDate } from "shared/utils";
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
  date: Style;
  dateSeparator: Style;
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
  location: {
    textAlign: "right",
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
});

export const WorkSection = ({ workList }: { workList: WorkInfo[] }) => {
  return (
    <Container marginVertical={12}>
      <View style={styles.sectionTitle}>
        <Text>Experience</Text>
      </View>
      <View>
        {workList?.map((work, idx) => {
          return (
            <View
              key={idx}
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
                  <View style={styles.date}>
                    <Text style={styles.duration}>
                      {work.startDate
                        ? formatDate(new Date(work.startDate))
                        : ""}
                    </Text>
                    <Text style={styles.dateSeparator}>|</Text>

                    <Text style={styles.duration}>
                      {work.endDate ? formatDate(new Date(work.endDate)) : ""}
                    </Text>
                  </View>
                </View>
              </View>
              {work.responsibilities && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Text>Responsibilities: </Text>
                  {work.responsibilities.map((responsibility, idx) => {
                    return <Text key={idx}>- {responsibility}</Text>;
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </Container>
  );
};
