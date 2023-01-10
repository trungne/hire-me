import { Text, View } from "@react-pdf/renderer";
import { ProjectInfo } from "shared/types";
import Container from "./Container";
import { ProjectSectionStyle } from "./styles";

const ProjectSection = ({
  projectList,
  styles,
}: {
  projectList: ProjectInfo[];
  styles: ProjectSectionStyle;
}) => {
  return (
    <Container marginVertical={12}>
      <View style={styles.sectionTitle}>
        <Text>Projects</Text>
      </View>
      <View style={styles.projectSection}>
        {projectList.map((project, idx) => {
          return (
            <View
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 12,
              }}
            >
              {project.name && (
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {project.name}
                </Text>
              )}
              {project.description && <Text>{project.description}</Text>}
              {project.toolsUsed && (
                <Text>Tool(s) used: {project.toolsUsed.join(", ")}</Text>
              )}
              {project.link && <Text>Visit: {project.link}</Text>}
            </View>
          );
        })}
      </View>
    </Container>
  );
};

export default ProjectSection;
