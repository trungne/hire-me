import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { ProjectInfo } from "shared/types";
import Container from "./Container";
import { CONTENT_FONT_SIZE, SECTION_FONT_SIZE } from "./styles";

export type SkillSectionStyle = {
  sectionTitle: Style;
  skillSection: Style;
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
});

const ProjectSection = ({ projectList }: { projectList: ProjectInfo[] }) => {
  return (
    <Container marginVertical={12}>
      <View style={styles.sectionTitle}>
        <Text>Projects</Text>
      </View>
      <View style={styles.skillSection}>
        {projectList.map((project, idx) => {
          return (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                }}
                key={idx}
              >
                {project.name}
              </Text>
              <Text>{project.description}</Text>
              <Text>Tool(s) used: {project.toolsUsed.join(", ")}</Text>
              <Text>
                Visit: <a href={project.link}>project.link</a>
              </Text>
            </View>
          );
        })}
      </View>
    </Container>
  );
};

export default ProjectSection;
