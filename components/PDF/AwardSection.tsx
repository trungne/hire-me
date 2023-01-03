import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { AwardInfo } from "shared/types";
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

const AwardSection = ({ awardList }: { awardList: AwardInfo[] }) => {
  return (
    <Container marginVertical={12}>
      <View style={styles.sectionTitle}>
        <Text>Awards</Text>
      </View>
      <View style={styles.skillSection}>
        {awardList.map((award) => {
          return (
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontWeight: "bold" }}>{award.name}</Text>
              <Text>Awarder: {award.awarder}</Text>
              <Text>Date: {award.date}</Text>
              <Text>Summary: {award.summary}</Text>
            </View>
          );
        })}
      </View>
    </Container>
  );
};

export default AwardSection;
