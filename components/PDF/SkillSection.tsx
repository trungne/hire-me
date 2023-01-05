import { Text, View } from "@react-pdf/renderer";
import { SkillInfo } from "shared/types";
import Container from "./Container";
import { SkillSectionStyle } from "./styles";

const SkillSection = ({
  skillList,
  styles,
}: {
  skillList: SkillInfo[];
  styles: SkillSectionStyle;
}) => {
  return (
    <Container marginVertical={12}>
      <View style={styles.sectionTitle}>
        <Text>Skills</Text>
      </View>
      <View style={styles.skillSection}>
        {skillList.map((skill, idx) => {
          return (
            <View
              key={idx}
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {skill.name && (
                <Text style={styles.skillName}>{skill.name}: </Text>
              )}
              {skill.details && <Text>{skill.details.join(", ")}</Text>}
            </View>
          );
        })}
      </View>
    </Container>
  );
};

export default SkillSection;
