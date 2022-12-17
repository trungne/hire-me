import TabContent from "./TabContent";
import { useForm } from "@mantine/form";
import { TextInput, Group, Button } from "@mantine/core";

const ProfileContent = () => {
  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      location: "",
      website: "",
    },

    validate: {
      fullName: (value) => (value.length > 0 ? null : "Invalid full name"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phoneNumber: (value) =>
        value.length > 0 ? null : "Invalid phone number",
    },
  });

  return (
    <TabContent title="Enter your personal information">
      <div>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.onSubmit((values) => console.log(values))}
        >
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

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </div>
    </TabContent>
  );
};

export default ProfileContent;
