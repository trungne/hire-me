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
        onSubmit={form.onSubmit((values) => {})}
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

const initialEducationInfo: EducationInfo = {
  schoolName: "",
  GPA: 0.0,
  degree: "",
  schoolLocation: "",
  major: "",
};

type EducationInfoForm = EducationInfo & {
  idx: number;
};

const EducationContent = ({ setNavBar }: CommonTabContentType) => {
  const [educationInfoList, setEducationInfoList] = useState<
    EducationInfoForm[]
  >([{ ...initialEducationInfo, idx: 0 }]);

  const addSchool = useCallback(() => {
    setEducationInfoList((prev) => {
      const newId = prev[prev.length - 1].idx + 1;
      return [...prev, { ...initialEducationInfo, idx: newId }];
    });
  }, []);

  const removeSchool = useCallback((id: Props["idx"]) => {
    setEducationInfoList((prev) => {
      return [...prev.filter((e) => e.idx !== id)];
    });
  }, []);

  return (
    <TabContent title="Enter your education background">
      {educationInfoList.map((info, idx) => (
        <EducationInfoInputForm
          add={addSchool}
          remove={removeSchool}
          idx={idx}
          key={idx}
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
            educationInfoList.forEach((info, idx) => {
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
