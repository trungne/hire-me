import { Button, TextInput } from "@mantine/core";
import { ReactNode, useCallback, useState } from "react";

import { CommonTabContentType } from ".";
import TabContent from "./TabContent";
import { EducationInfo } from "shared/types";
import { useForm } from "@mantine/form";

type Props = {
  idx: number;
  remove: (id: number) => void;
  add: () => void;
  //   form: UseFormReturnType<EducationInfo>;
};

const INPUT_FORM_PREFIX = "education-info-input-";
const EducationInfoInputForm = ({ idx, remove, add }: Props) => {
  const form = useForm<EducationInfo>({
    validate: {
      schoolName: (value) => (!!value ? null : "Invalid school name"),
      schoolLocation: (value) => (!!value ? null : "Invalid school location"),
      degree: (value) => (!!value ? null : "Invalid degree"),
      major: (value) => (!!value ? null : "Invalid majot"),
      GPA: (value) =>
        value!! &&
        /[+-]?((\d+\.?\d*)|(\.\d+))/.test(value.toString()) &&
        value > 0
          ? null
          : "Invalid GPA",
    },
  });

  return (
    <>
      <div className=" h-2 my-4  bg-slate-700"></div>
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
        <div className="flex justify-between">
          <button
            id={`${INPUT_FORM_PREFIX}${idx}`}
            type="submit"
            className="hidden"
          ></button>
          <Button
            disabled={idx === 0}
            color="red"
            variant="light"
            onClick={() => {
              remove(idx);
            }}
          >
            Remove
          </Button>

          <Button variant="light" onClick={add}>
            Add
          </Button>
        </div>
      </form>
    </>
  );
};

const EducationContent = ({ setNavBar }: CommonTabContentType) => {
  const [inputFormIds, setInputFormIds] = useState<number[]>([0]);

  const addSchool = useCallback(() => {
    // add new element with id increase by 1

    setInputFormIds((prev) => {
      const newId = prev[prev.length - 1] + 1;
      return [...prev, newId];
    });
  }, []);

  const removeSchool = useCallback((id: Props["idx"]) => {
    setInputFormIds((prev) => {
      return [...prev.filter((e) => e !== id)];
    });
  }, []);

  return (
    <TabContent title="Enter your education background">
      {inputFormIds.map((id) => (
        <EducationInfoInputForm
          add={addSchool}
          remove={removeSchool}
          idx={id}
          key={id}
        />
      ))}

      <div className="flex justify-between mt-auto">
        <Button
          onClick={() => {
            setNavBar("Profile");
          }}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            inputFormIds.forEach((idx) => {
              const button = document.querySelector<HTMLButtonElement>(
                `#${INPUT_FORM_PREFIX}${idx}`
              );
              if (button) {
                button.click();
              }
            });
            setNavBar("Education");
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
