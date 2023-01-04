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
  website: Style;
};

const styles = StyleSheet.create<ProfileSectionStyle>({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },

  name: {
    fontSize: SECTION_FONT_SIZE + 4,
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
  location: {
    fontSize: CONTENT_FONT_SIZE,
  },
  email: {
    fontSize: CONTENT_FONT_SIZE,
  },
  phone: {
    fontSize: CONTENT_FONT_SIZE,
  },
  website: {
    fontSize: CONTENT_FONT_SIZE,
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
      <Text style={styles.name}>{profile?.fullName}</Text>

      <View style={styles.infoContainer}>
        {profile.location && (
          <Text style={styles.location}>{profile.location}</Text>
        )}
        {profile.email && (
          <>
            <DefaultSeparator />
            <Text style={styles.email}>{profile?.email}</Text>
          </>
        )}

        {profile.phoneNumber && (
          <>
            <DefaultSeparator />
            <Text style={styles.phone}>{profile.phoneNumber}</Text>
          </>
        )}
      </View>
      {profile.website && (
        <View>
          <Text style={styles.website}>{profile.website}</Text>
        </View>
      )}
    </View>
  );
};

export default ProfileSection;
