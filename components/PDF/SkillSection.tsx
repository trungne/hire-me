import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { SkillInfo } from "shared/types";
import Container from "./Container";

export type SkillSectionStyle = {
  sectionTitle: Style;
};

const styles = StyleSheet.create<SkillSectionStyle>({
  sectionTitle: {
    fontSize: 28,
  },
});

const SkillSection = ({ skillList }: { skillList: SkillInfo[] }) => {
  return (
    <Container marginVertical={12}>
      <View style={styles.sectionTitle}>
        <Text>Skills</Text>
      </View>
    </Container>
  );
};

export default SkillSection;
