import TabContent from "./TabContent";
import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { CommonTabContentType } from ".";
import { ProfileInfo } from "shared/types";
import { useAtom } from "jotai";
import { profileInfoAtom } from "shared/atoms";

const ProfileContent = ({ setNavBar }: CommonTabContentType) => {
  const [profileInfo, setProfileInfo] = useAtom(profileInfoAtom);
  const form = useForm<ProfileInfo>({
    initialValues: profileInfo ? profileInfo : undefined,
    validate: {
      fullName: (value) => (value.length > 0 ? null : "Invalid full name"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phoneNumber: (value) =>
        value.length > 0 ? null : "Invalid phone number",
      location: (value) => (!!value ? null : "Invalid location"),
    },
  });

  return (
    <TabContent title="Enter your personal information">
      <form
        className="grow flex flex-col"
        onSubmit={form.onSubmit((values) => {
          setProfileInfo(values);
        })}
      >
        <div className="flex flex-col gap-4">
          <TextInput
            withAsterisk
            label="Full name"
            placeholder="John Doe"
            {...form.getInputProps("fullName")}
          />

          <TextInput
            withAsterisk
            label="Email"
            placeholder="johndoe@email.com"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="Phone Number"
            placeholder="(123) 456 789"
            {...form.getInputProps("phoneNumber")}
          />
          <TextInput
            label="Location"
            placeholder="Saigon, Vietnam"
            {...form.getInputProps("location")}
          />
          <TextInput
            label="Website"
            placeholder="myawesomewebsite.com"
            {...form.getInputProps("website")}
          />
        </div>

        <div className="flex justify-between mt-auto">
          <Button
            onClick={() => {
              setNavBar("Template");
            }}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (form.isValid()) {
                setNavBar("Education");
              }
            }}
            type="submit"
          >
            Next
          </Button>
        </div>
      </form>
    </TabContent>
  );
};

export default ProfileContent;
