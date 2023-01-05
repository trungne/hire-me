import { useCallback, useRef, useState } from "react";
import { Button, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAtom } from "jotai";

import TabContent from "./TabContent";
import { AwardInfo } from "shared/types";
import { InputFormProps } from ".";
import { awardInfoAtom, navBarAtom } from "shared/atoms";
import { convertArrayToMap } from "shared/utils";
import { MonthPicker } from "mantine-dates-6";
import { DatePicker } from "@mantine/dates";
import Link from "next/link";

const INPUT_FORM_PREFIX = "award-info-input-";
const AwardInfoInputForm = ({
  idx,
  remove,
  add,
  formMap,
  initialData,
}: InputFormProps<AwardInfo>) => {
  const theme = useMantineTheme();
  const form = useForm<AwardInfo>({
    initialValues: initialData,
    validate: {
      name: (value) => (!!value ? null : "Invalid award name"),
      awarder: (value) => (!!value ? null : "Invalid awarder name"),
      summary: (value) => (!!value ? null : "Invalid summary"),
    },
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
          label="Award name"
          placeholder="Hack FBI"
          {...form.getInputProps("name")}
        />
        <DatePicker
          defaultDate={
            initialData?.date ? new Date(initialData?.date) : undefined
          }
          {...form.getInputProps("date")}
          label="Date"
          placeholder="Date"
          dropdownType="modal"
        />
        <TextInput
          label="Awarder"
          placeholder="FBI"
          {...form.getInputProps("awarder")}
        />
        <TextInput
          label="Summary"
          placeholder="I hacked Mr. FBI successfully"
          {...form.getInputProps("summary")}
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

const AwardContent = () => {
  const [, setNavBar] = useAtom(navBarAtom);
  const [awardInfo, setAwardInfo] = useAtom(awardInfoAtom);

  const [formIndices, setFormIndices] = useState<number[]>(
    Array.from(Array(awardInfo ? awardInfo.length : 1).keys())
  );
  const formMapRef = useRef<Record<number, AwardInfo>>(
    convertArrayToMap(awardInfo)
  );

  const addSchool = useCallback(() => {
    setFormIndices((prev) => {
      const newIdx = prev[prev.length - 1] + 1;

      return [...prev, newIdx];
    });

    setAwardInfo(Object.values(formMapRef.current));
  }, [setAwardInfo]);

  const removeSchool = useCallback(
    (id: number) => {
      setFormIndices((prev) => {
        return [...prev.filter((e) => e !== id)];
      });

      if (formMapRef.current[id]) {
        delete formMapRef.current[id];
      }

      setAwardInfo(Object.values(formMapRef.current));
    },
    [setAwardInfo]
  );

  return (
    <TabContent title="Enter your education background">
      {formIndices.map((idx) => (
        <AwardInfoInputForm
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
            setNavBar("Projects");
          }}
        >
          Previous
        </Button>
        <Link href="/generate">
          <Button
          color="teal"
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
              if (
                Object.keys(formMapRef.current).length === formIndices.length
              ) {
                setAwardInfo(Object.values(formMapRef.current));
                // TODO: create pdf
              }
            }}
            type="submit"
          >
            Create PDF
          </Button>
        </Link>
      </div>
    </TabContent>
  );
};

export default AwardContent;
