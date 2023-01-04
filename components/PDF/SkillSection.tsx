import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { SkillInfo } from "shared/types";
import Container from "./Container";
import { CONTENT_FONT_SIZE, SECTION_FONT_SIZE } from "./styles";

export type SkillSectionStyle = {
  sectionTitle: Style;
  skillSection: Style;
  skillName: Style;
};

const styles = StyleSheet.create<SkillSectionStyle>({
  sectionTitle: {
    fontSize: SECTION_FONT_SIZE,
  },
  skillSection: {
    marginLeft: 16,
    marginRight: 16,
    fontSize: CONTENT_FONT_SIZE,
  },
  skillName: {
    fontWeight: "bold",
  },
});

const SkillSection = ({ skillList }: { skillList: SkillInfo[] }) => {
  return (
    <Container marginVertical={12}>
      <View style={styles.sectionTitle}>
        <Text>Skills</Text>
      </View>
      <View style={styles.skillSection}>
        {skillList.map((skill, idx) => {
          return (
            <>
              -{" "}
              <Text key={idx} style={styles.skillName}>
                {skill.name}:{" "}
              </Text>
              {skill.details && (
                <Text key={idx}>{skill.details.join(", ")}</Text>
              )}
            </>
          );
        })}
      </View>
    </Container>
  );
};

export default SkillSection;
