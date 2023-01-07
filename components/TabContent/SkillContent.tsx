import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback, useRef, useState } from "react";
import { useDynamicForm } from "components/DynamicForm/hooks";
import { SkillInfo } from "shared/types";
import TabContent from "./TabContent";
import { InputFormProps } from ".";
import {
  convertArrayToMap,
  getMinimumArrayLength,
  hasEmptyStringField,
} from "shared/utils";
import { navBarAtom, skillInfoAtom } from "shared/atoms";
import { useAtom } from "jotai";
import { showNotification } from "@mantine/notifications";

const INPUT_FORM_PREFIX = "skill-info-input-";

const SkillInfoInputForm = ({
  idx,
  remove,
  formMap,
  initialData,
}: InputFormProps<SkillInfo>) => {
  const form = useForm<Omit<SkillInfo, "details">>({
    initialValues: initialData,
    validate: {},
  });

  const { fields, formElement } = useDynamicForm({
    placeholder: "OOP",
    errorMessage: "Invalid detail",
    label: "Skill details",
    initialData: initialData?.details,
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
      </div>
    </>
  );
};

const SkillContent = () => {
  const [, setNavBar] = useAtom(navBarAtom);
  const [skillInfo, setSkillInfo] = useAtom(skillInfoAtom);

  const [formIndices, setFormIndices] = useState<number[]>(
    Array.from(Array(getMinimumArrayLength(skillInfo)).keys())
  );
  const formMapRef = useRef<Record<number, SkillInfo>>(
    convertArrayToMap(skillInfo)
  );

  const addSkill = useCallback(() => {
    setFormIndices((prev) => {
      const newIdx = prev[prev.length - 1] + 1;

      return [...prev, newIdx];
    });

    setSkillInfo(Object.values(formMapRef.current));
  }, [setSkillInfo]);

  const removeSchool = useCallback(
    (id: number) => {
      setFormIndices((prev) => {
        return [...prev.filter((e) => e !== id)];
      });

      if (formMapRef.current[id]) {
        delete formMapRef.current[id];
      }

      setSkillInfo(Object.values(formMapRef.current));
    },
    [setSkillInfo]
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

    setSkillInfo(Object.values(formMapRef.current));
    showNotification({
      title: "Success",
      message: "Skill information saved",
      color: "green",
    });
  };

  return (
    <TabContent onSave={onSave} title="Enter your skills">
      <div>
        <Button variant="light" onClick={addSkill}>
          Add
        </Button>
      </div>
      {formIndices.map((idx) => (
        <SkillInfoInputForm
          formMap={formMapRef.current}
          remove={removeSchool}
          idx={idx}
          key={idx}
          initialData={formMapRef.current[idx]}
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
              setSkillInfo(Object.values(formMapRef.current));
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
