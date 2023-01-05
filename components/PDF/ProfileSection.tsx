import { Text, View } from "@react-pdf/renderer";

import { ProfileInfo } from "shared/types";
import { ProfileSectionStyle } from "./styles";

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

const ProfileSection = ({
  profile,
  styles,
}: {
  profile: ProfileInfo;
  styles: ProfileSectionStyle;
}) => {
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
