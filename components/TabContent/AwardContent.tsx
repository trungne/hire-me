import { Button, TextInput } from "@mantine/core";
import { useCallback, useRef, useState } from "react";

import { CommonTabContentType } from ".";
import TabContent from "./TabContent";
import { AwardInfo, EducationInfo } from "shared/types";
import { useForm } from "@mantine/form";
import { InputFormProps } from "./type";

const INPUT_FORM_PREFIX = "award-info-input-";
const AwardInfoInputForm = ({
  idx,
  remove,
  add,
  formMap,
}: InputFormProps<AwardInfo>) => {
  const form = useForm<AwardInfo>({
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
          withAsterisk
          label="Award name"
          placeholder="Hack FBI"
          {...form.getInputProps("name")}
        />
        {/* {TODO: Add date} */}

        <TextInput
          withAsterisk
          label="Awarder"
          placeholder="FBI"
          {...form.getInputProps("awarder")}
        />
        <TextInput
          withAsterisk
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

const AwardContent = ({ setNavBar }: CommonTabContentType) => {
  const [formIndices, setFormIndices] = useState<number[]>([0]);
  const formMapRef = useRef<Record<number, AwardInfo>>({});

  const addSchool = useCallback(() => {
    setFormIndices((prev) => {
      const newIdx = prev[prev.length - 1] + 1;

      return [...prev, newIdx];
    });
  }, []);

  const removeSchool = useCallback((id: number) => {
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
        <AwardInfoInputForm
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
            setNavBar("Projects");
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
              // TODO: create pdf
            }
          }}
          type="submit"
        >
          Create PDF!
        </Button>
      </div>
    </TabContent>
  );
};

export default AwardContent;
