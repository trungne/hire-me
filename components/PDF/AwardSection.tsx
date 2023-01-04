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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ display: "flex", flexDirection: "column" }}>
                {award.name && (
                  <Text style={{ fontWeight: "bold" }}>{award.name}</Text>
                )}
                {award.summary && <Text>Summary: {award.summary}</Text>}
              </View>

              <View style={{ display: "flex", flexDirection: "column" }}>
                {award.awarder && <Text>Awarder: {award.awarder}</Text>}
                {award.date && (
                  <Text>
                    Date:{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(award.date))}
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </Container>
  );
};

export default AwardSection;
