import { Button, TextInput } from "@mantine/core";
import { useCallback, useRef, useState } from "react";

import { CommonTabContentType } from ".";
import TabContent from "./TabContent";
import { EducationInfo } from "shared/types";
import { useForm } from "@mantine/form";

type Props = {
  idx: number;
  remove: (id: number) => void;
  add: () => void;
  formMap: Record<number, EducationInfo>;
};

const INPUT_FORM_PREFIX = "education-info-input-";
const EducationInfoInputForm = ({ idx, remove, add, formMap }: Props) => {
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
        onSubmit={form.onSubmit(
          (values) => {
            formMap[idx] = { ...values };
          },
          (_validationErrors, _values, _event) => {
            delete formMap[idx];
          }
        )}
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
  const [formIndices, setFormIndices] = useState<number[]>([0]);
  const formMapRef = useRef<Record<number, EducationInfo>>({});

  const addSchool = useCallback(() => {
    setFormIndices((prev) => {
      const newIdx = prev[prev.length - 1] + 1;

      return [...prev, newIdx];
    });
  }, []);

  const removeSchool = useCallback((id: Props["idx"]) => {
    setFormIndices((prev) => {
      return [...prev.filter((e) => e !== id)];
    });

    if (formMapRef.current[id]) {
      delete formMapRef.current[id];
    }
  }, []);

  return (
    <TabContent title="Enter your education background">
      {formIndices.map((idx) => (
        <EducationInfoInputForm
          formMap={formMapRef.current}
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
            formIndices.forEach((idx) => {
              const button = document.querySelector<HTMLButtonElement>(
                `#${INPUT_FORM_PREFIX}${idx}`
              );
              if (button) {
                button.click();
              }
            });
            // number of form object received equal to form => all form is valid
            if (Object.keys(formMapRef.current).length === formIndices.length) {
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
