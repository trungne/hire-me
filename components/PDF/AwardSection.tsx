import { Text, View } from "@react-pdf/renderer";
import { AwardInfo } from "shared/types";
import Container from "./Container";
import { AwardSectionStyle } from "./styles";

const AwardSection = ({
  awardList,
  styles,
}: {
  awardList: AwardInfo[];
  styles: AwardSectionStyle;
}) => {
  return (
    <Container marginVertical={12}>
      <View style={styles.sectionTitle}>
        <Text>Awards</Text>
      </View>
      <View style={styles.awardSection}>
        {awardList.map((award, idx) => {
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
