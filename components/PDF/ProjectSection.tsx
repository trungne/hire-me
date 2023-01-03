import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import Link from "next/link";
import { ProjectInfo } from "shared/types";
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
                <a href={project.link}>project.link</a>
              </Text>
            </View>
          );
        })}
      </View>
    </Container>
  );
};

export default ProjectSection;
