import { Text, View } from "@react-pdf/renderer";
import { WorkInfo } from "shared/types";
import { formatDate } from "shared/utils";
import Container from "./Container";
import { CONTENT_FONT_SIZE, WorkSectionType } from "./styles";

export const WorkSection = ({
  workList,
  styles,
}: {
  workList: WorkInfo[];
  styles: WorkSectionType;
}) => {
  return (
    <Container>
      <View style={styles.sectionTitle}>
        <Text>Experience</Text>
      </View>
      <View style={{ fontSize: CONTENT_FONT_SIZE }}>
        {workList?.map((work, idx) => {
          return (
            <View key={idx} style={styles.workSection}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.companyAndJobTitleContainer}>
                  {work.companyName && (
                    <Text style={styles.companyName}>{work.companyName}</Text>
                  )}
                  {work.jobTitle && (
                    <Text style={styles.jobTitle}>{work.jobTitle}</Text>
                  )}
                </View>
                <View style={styles.locationAndDurationContainer}>
                  {work.location && (
                    <Text style={styles.location}>{work.location}</Text>
                  )}
                  {work.startDate && work.endDate && (
                    <View style={styles.date}>
                      <Text style={styles.duration}>
                        {formatDate(new Date(work.startDate))}
                      </Text>
                      <Text style={styles.dateSeparator}>|</Text>

                      <Text style={styles.duration}>
                        {work.endDate !== "Present"
                          ? formatDate(new Date(work.endDate))
                          : "Present"}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              {work.responsibilities && (
                <View style={styles.responsibilities}>
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
