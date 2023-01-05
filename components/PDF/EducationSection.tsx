import { Text, View } from "@react-pdf/renderer";
import { EducationInfo } from "shared/types";
import { formatDate } from "shared/utils";
import Container from "./Container";
import { EducationSectionStyle } from "./styles";

const EducationSection = ({
  educationList,
  styles,
}: {
  educationList: EducationInfo[];
  styles: EducationSectionStyle;
}) => {
  return (
    <Container marginVertical={12}>
      <View style={styles.sectionTitle}>
        <Text>Education</Text>
      </View>
      <View style={styles.educationSection}>
        {educationList.map((education, idx) => {
          return (
            <View
              key={idx}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ display: "flex", flexDirection: "column" }}>
                {education.schoolName && (
                  <>
                    <Text style={styles.school}>{education.schoolName}</Text>
                  </>
                )}

                {education.degree && (
                  <Text style={styles.degree}>{education.degree}</Text>
                )}
                {education.major && (
                  <>
                    <Text>Major: {education.major}</Text>
                  </>
                )}
              </View>
              <View style={{ display: "flex", flexDirection: "column" }}>
                {education.schoolLocation && (
                  <Text>Location: {education.schoolLocation}</Text>
                )}
                {education.GPA && <Text>GPA: {education.GPA}</Text>}

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
