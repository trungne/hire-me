import { useCallback, useRef, useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import TabContent from "./TabContent";
import { AwardInfo } from "shared/types";
import { InputFormProps } from ".";
import {
  appUserAtom,
  awardInfoAtom,
  cvInfoAtom,
  navBarAtom,
} from "shared/atoms";
import { convertArrayToMap } from "shared/utils";
import { MonthPicker } from "mantine-dates-6";
import { DatePicker } from "@mantine/dates";
import Link from "next/link";
import { createCV } from "shared/queries";

const INPUT_FORM_PREFIX = "award-info-input-";
const AwardInfoInputForm = ({
  idx,
  remove,
  formMap,
  initialData,
}: InputFormProps<AwardInfo>) => {
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
        </div>
      </form>
    </>
  );
};

const AwardContent = () => {
  const [, setNavBar] = useAtom(navBarAtom);
  const router = useRouter();
  const [awardInfo, setAwardInfo] = useAtom(awardInfoAtom);
  const [cvInfo] = useAtom(cvInfoAtom);
  const [user] = useAtom(appUserAtom);

  const [formIndices, setFormIndices] = useState<number[]>(
    Array.from(Array(awardInfo ? awardInfo.length : 1).keys())
  );
  const formMapRef = useRef<Record<number, AwardInfo>>(
    convertArrayToMap(awardInfo)
  );

  const addAward = useCallback(() => {
    setFormIndices((prev) => {
      const newIdx = prev[prev.length - 1] + 1;

      return [...prev, newIdx];
    });

    setAwardInfo(Object.values(formMapRef.current));
  }, [setAwardInfo]);

  const remove = useCallback(
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

  const onSave = () => {
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
      setAwardInfo(Object.values(formMapRef.current));
      //TODO: add success message
      return;
    }
    // TODO: add error message
  };

  return (
    <TabContent onSave={onSave} title="Enter your education background">
      <div>
        <Button variant="light" onClick={addAward}>
          Add
        </Button>
      </div>
      {formIndices.map((idx) => (
        <AwardInfoInputForm
          formMap={formMapRef.current}
          remove={remove}
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

        <Button
          color="teal"
          onClick={async () => {
            setNavBar("Awards");
            if (!user || !cvInfo) {
              // show error
              return;
            }
            // show loading
            await createCV({
              name: "CV - " + Date.now(),
              cvBody: cvInfo,
              email: user.email,
            });
            // turn off loading

            router.push("/generate");
          }}
          type="submit"
        >
          Create PDF
        </Button>
      </div>
    </TabContent>
  );
};

export default AwardContent;
