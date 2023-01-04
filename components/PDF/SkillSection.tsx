import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { SkillInfo } from "shared/types";
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

const SkillSection = ({ skillList }: { skillList: SkillInfo[] }) => {
  return (
    <Container marginVertical={12}>
      <View style={styles.sectionTitle}>
        <Text>Skills</Text>
      </View>
      <View style={styles.skillSection}>
        {skillList.map((skill) => {
          return (
            <>
              <Text>- {skill.name}: </Text>
              {skill.details && <Text>{skill.details.join(", ")}</Text>}
            </>
          );
        })}
      </View>
    </Container>
  );
};

export default SkillSection;
