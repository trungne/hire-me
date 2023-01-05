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
              <Text
                style={{
                  fontWeight: "bold",
                }}
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
