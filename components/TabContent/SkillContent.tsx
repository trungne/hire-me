import { Button, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback, useRef, useState } from "react";
import { useDynamicForm } from "components/DynamicForm/hooks";
import { SkillInfo } from "shared/types";
import { CommonTabContentType } from ".";
import TabContent from "./TabContent";
import { InputFormProps } from ".";
import { hasEmptyStringField } from "shared/utils";

const INPUT_FORM_PREFIX = "skill-info-input-";

const SkillInfoInputForm = ({
  idx,
  remove,
  add,
  formMap,
}: InputFormProps<SkillInfo>) => {
  const form = useForm<Omit<SkillInfo, "details">>({
    validate: {
      name: (value) => (!!value ? null : "Invalid skill name"),
    },
  });

  const { fields, formElement } = useDynamicForm({
    placeholder: "OOP",
    errorMessage: "Invalid detail",
    label: "Skill details",
  });

  return (
    <>
      <div className=" h-2 my-4 bg-slate-700"></div>
      <form
        className="flex flex-col gap-4 mb-4"
        onSubmit={form.onSubmit(
          (values) => {
            if (hasEmptyStringField(fields)) {
              return;
            }
            const sortedKeys = Object.keys(fields);
            sortedKeys.sort((a, b) => parseInt(a) - parseInt(b));
            formMap[idx] = {
              ...values,
              details: sortedKeys.map((key) => fields[key]),
            };
          },
          (_validationErrors, _values, _event) => {
            delete formMap[idx];
          }
        )}
      >
        <TextInput
          withAsterisk
          label="Skill name"
          placeholder="Programming Langauge"
          {...form.getInputProps("name")}
        />

        <button
          id={`${INPUT_FORM_PREFIX}${idx}`}
          type="submit"
          className="hidden"
        ></button>
      </form>

      {formElement}

      <div className="flex justify-between my-4">
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
    </>
  );
};

const SkillContent = ({ setNavBar }: CommonTabContentType) => {
  const [formIndices, setFormIndices] = useState<number[]>([0]);
  const formMapRef = useRef<Record<number, SkillInfo>>({});

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
    <TabContent title="Enter your skills">
      {formIndices.map((idx) => (
        <SkillInfoInputForm
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
            setNavBar("Work");
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
              setNavBar("Projects");
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

export default SkillContent;
