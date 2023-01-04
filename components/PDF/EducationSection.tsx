import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { EducationInfo } from "shared/types";
import Container from "./Container";

export type SkillSectionStyle = {
  sectionTitle: Style;
  skillSection: Style;
};

const styles = StyleSheet.create<SkillSectionStyle>({
  sectionTitle: {
    fontSize: 28,
  },
  skillSection: {
    marginLeft: 16,
    marginRight: 16,
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
      <View style={styles.skillSection}>
        {educationList.map((education) => {
          return (
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text>{education.schoolName}</Text>
              <Text>{education.schoolLocation}</Text>
              <Text>
                {education.startDate && Intl.DateTimeFormat("en-US").format(
                  new Date(education.startDate)
                )}
              </Text>
            </View>
          );
        })}
      </View>
    </Container>
  );
};

export default EducationSection;
