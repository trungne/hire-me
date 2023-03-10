import TabContent from "./TabContent";
import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { ProfileInfo } from "shared/types";
import { useAtom } from "jotai";
import { navBarAtom, profileInfoAtom } from "shared/atoms";
import { memo } from "react";
import { showNotification } from "@mantine/notifications";

const ProfileContent = () => {
  const [profileInfo, setProfileInfo] = useAtom(profileInfoAtom);
  const [, setNavBar] = useAtom(navBarAtom);
  const form = useForm<ProfileInfo>({
    initialValues: profileInfo ?? undefined,
    validate: {},
  });

  const onSave = () => {
    setProfileInfo(form.values);
    showNotification({
      title: "Success",
      message: "Profile information saved",
      color: "green",
    });
  };

  return (
    <TabContent onSave={onSave} title="Enter your personal information">
      <form className="grow flex flex-col">
        <div className="flex flex-col gap-4">
          <TextInput
            label="Full name"
            placeholder="John Doe"
            {...form.getInputProps("fullName")}
          />

          <TextInput
            label="Email"
            placeholder="johndoe@email.com"
            {...form.getInputProps("email")}
          />
          <TextInput
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
              setNavBar("Education");
            }}
          >
            Next
          </Button>
        </div>
      </form>
    </TabContent>
  );
};

export default memo(ProfileContent);
