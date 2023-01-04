import { Divider } from "@mantine/core";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

import { ProfileInfo } from "shared/types";
import { CONTENT_FONT_SIZE, SECTION_FONT_SIZE } from "./styles";

export type ProfileSectionStyle = {
  page: Style;
  name: Style;
  header: Style;
  infoContainer: Style;
  location: Style;
  email: Style;
  phone: Style;
};

const styles = StyleSheet.create<ProfileSectionStyle>({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },

  name: {
    fontSize: SECTION_FONT_SIZE,
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
  infoContainer: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: CONTENT_FONT_SIZE,
  },
  location: {},
  email: {},
  phone: {},
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

const ProfileSection = ({ profile }: { profile?: ProfileInfo }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.name}>{profile?.fullName}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.location}>{profile?.location}</Text>
        <DefaultSeparator />
        <Text style={styles.email}>{profile?.email}</Text>
        <DefaultSeparator />
        <Text style={styles.phone}>{profile?.phoneNumber}</Text>
      </View>
    </View>
  );
};

export default ProfileSection;
