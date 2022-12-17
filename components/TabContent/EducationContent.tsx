import { Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";

import { CommonTabContentType } from ".";
import TabContent from "./TabContent";
import { EducationInfo } from "shared/types";

const EducationContent = ({ setNavBar }: CommonTabContentType) => {
  const [schoolNums, setSchoolNums] = useState<number>(1);
  const form = useForm<EducationInfo>({
    validate: {
      schoolName: (value) => (!!value ? null : "Invalid school name"),
      schoolLocation: (value) => (!!value ? null : "Invalid school location"),
      degree: (value) => (!!value ? null : "Invalid degree"),
      major: (value) => (!!value ? null : "Invalid majot"),
      GPA: (value) =>
        /^\S+@\S+$/.test(value.toString()) && value > 0 ? null : "Invalid GPA",
    },
  });
  return (
    <TabContent title="Enter your education background">
      <form
        className="flex-1 flex flex-col gap-4 mb-4"
        onSubmit={form.onSubmit((values) => console.log(values))}
      >
        <TextInput
          withAsterisk
          label="School name"
          placeholder="Your University"
          {...form.getInputProps("schoolName")}
        />

        <TextInput
          withAsterisk
          label="School location"
          placeholder="District 7, Ho Chi Minh City, Vietnam"
          {...form.getInputProps("schoolLocation")}
        />
        <TextInput
          withAsterisk
          label="Degree"
          placeholder="Bachelor, Master, PhD"
          {...form.getInputProps("degree")}
        />

        <TextInput
          withAsterisk
          label="Major"
          placeholder="Computer Science"
          {...form.getInputProps("major")}
        />

        <TextInput
          withAsterisk
          label="GPA"
          placeholder="3.0"
          {...form.getInputProps("GPA")}
        />
      </form>

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
    </TabContent>
  );
};

export default EducationContent;
