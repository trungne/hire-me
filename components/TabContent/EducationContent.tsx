"use client";

import { Button, Text, TextInput, useMantineTheme } from "@mantine/core";
import { DatePicker, DateRangePicker } from "@mantine/dates";
import { useCallback, useRef, useState } from "react";

import TabContent from "./TabContent";
import { EducationInfo } from "shared/types";
import { useForm } from "@mantine/form";
import { InputFormProps } from ".";
import { useAtom } from "jotai";
import { educationInfoAtom, navBarAtom } from "shared/atoms";
import { convertArrayToMap, isClientSide } from "shared/utils";
import { MonthPicker, MonthPickerInput } from "mantine-dates-6";
import MonthInput from "components/MonthInput";

const INPUT_FORM_PREFIX = "education-info-input-";
const EducationInfoInputForm = ({
  idx,
  remove,
  add,
  formMap,
  initialData,
}: InputFormProps<EducationInfo>) => {
  const theme = useMantineTheme();

  const form = useForm<EducationInfo>({
    initialValues: initialData,
    validate: {},
  });

  return (
    <>
      <div className=" h-2 my-4 bg-slate-700"></div>
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

        <MonthInput
          startDate={initialData?.startDate}
          endDate={initialData?.endDate}
          startDateInputProps={form.getInputProps("startDate")}
          endDateInputProps={form.getInputProps("endDate")}
          onPresentClicked={() => form.setValues({ endDate: "Present" })}
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

const EducationContent = () => {
  const [, setNavBar] = useAtom(navBarAtom);
  const [educationInfo, setEducationInfo] = useAtom(educationInfoAtom);

  const [formIndices, setFormIndices] = useState<number[]>(
    Array.from(Array(educationInfo ? educationInfo.length : 1).keys())
  );

  const formMapRef = useRef<Record<number, EducationInfo>>(
    convertArrayToMap(educationInfo)
  );

  const addSchool = useCallback(() => {
    setFormIndices((prev) => {
      const newIdx = prev[prev.length - 1] + 1;

      return [...prev, newIdx];
    });
    setEducationInfo(Object.values(formMapRef.current));
  }, [setEducationInfo]);

  const removeSchool = useCallback(
    (id: number) => {
      setFormIndices((prev) => {
        return [...prev.filter((e) => e !== id)];
      });

      if (formMapRef.current[id]) {
        delete formMapRef.current[id];
      }
      setEducationInfo(Object.values(formMapRef.current));
    },
    [setEducationInfo]
  );

  return (
    <TabContent title="Enter your education background">
      {formIndices.map((idx) => (
        <EducationInfoInputForm
          formMap={formMapRef.current}
          add={addSchool}
          remove={removeSchool}
          idx={idx}
          key={idx}
          initialData={formMapRef.current[idx]}
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
              setNavBar("Work");
              setEducationInfo(Object.values(formMapRef.current));
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
