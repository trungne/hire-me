import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { EducationInfo } from "shared/types";
import { formatDate } from "shared/utils";
import Container from "./Container";
import { CONTENT_FONT_SIZE, SECTION_FONT_SIZE } from "./styles";

export type EducationSectionStyle = {
  sectionTitle: Style;
  educationSection: Style;
  date: Style;
  duration: Style;
  dateSeparator: Style;
  school: Style;
};

const styles = StyleSheet.create<EducationSectionStyle>({
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
});

const EducationSection = ({
  educationList,
}: {
  educationList: EducationInfo[];
}) => {
  return (
    <Container marginVertical={12}>
      <View style={styles.sectionTitle}>
        <Text>Education</Text>
      </View>
      <View style={styles.educationSection}>
        {educationList.map((education) => {
          return (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ display: "flex", flexDirection: "column" }}>
                {education.schoolName && (
                  <Text style={styles.school}>{education.schoolName}</Text>
                )}
                {education.major && <Text>Major: {education.major}</Text>}
                {education.GPA && <Text>GPA: {education.GPA}</Text>}
              </View>
              <View>
                {education.schoolLocation && (
                  <Text>{education.schoolLocation}</Text>
                )}

                {education.startDate && education.endDate && (
                  <View style={styles.date}>
                    <Text style={styles.duration}>
                      {formatDate(new Date(education.startDate))}
                    </Text>
                    <Text style={styles.dateSeparator}>|</Text>

                    <Text style={styles.duration}>
                      {education.endDate !== "Present"
                        ? formatDate(new Date(education.endDate))
                        : "Present"}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </Container>
  );
};

export default EducationSection;
