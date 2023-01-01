import { Divider } from "@mantine/core";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useAtom } from "jotai";
import { cvInfoAtom } from "shared/atoms";
import { ProfileInfo } from "shared/types";
import { WorkSection } from "./WorkSection";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },

  name: {
    fontSize: 28,
    textAlign: "center",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    margin: 8,
    padding: 8,
    flexGrow: 1,
    textAlign: "center",
  },
});

const DefaultSeparator = () => {
  return (
    <Text
      style={{
        marginLeft: 8,
        marginRight: 8,
      }}
    >
      -
    </Text>
  );
};

const ProfileSection = ({ profile }: { profile: ProfileInfo }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.name}>{profile.fullName}</Text>

      <View
        style={{
          marginTop: 8,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text>{profile.location}</Text>
        <DefaultSeparator />
        <Text>{profile.email}</Text>
        <DefaultSeparator />
        <Text>{profile.phoneNumber}</Text>
      </View>
    </View>
  );
};

export default ProfileSection;
