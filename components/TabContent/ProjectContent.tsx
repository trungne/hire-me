import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDynamicForm } from "components/DynamicForm/hooks";
import { useState, useRef, useCallback } from "react";
import { ProjectInfo } from "shared/types";
import { convertArrayToMap, hasEmptyStringField } from "shared/utils";
import { CommonTabContentType } from ".";
import TabContent from "./TabContent";
import { InputFormProps } from ".";
import { navBarAtom, projectInfoAtom } from "shared/atoms";
import { useAtom } from "jotai";

const INPUT_FORM_PREFIX = "project-info-input-";

const SkillInfoInputForm = ({
  idx,
  remove,
  add,
  formMap,
  initialData,
}: InputFormProps<ProjectInfo>) => {
  const form = useForm<Omit<ProjectInfo, "toolsUsed">>({
    initialValues: initialData,
    validate: {
      name: (value) => (!!value ? null : "Invalid project name"),
      description: (value) => (!!value ? null : "Invalid description"),
    },
  });

  const { fields, formElement } = useDynamicForm({
    placeholder: "NextJS/Spring Boots",
    errorMessage: "Invalid tool",
    label: "Tools Used",
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
              toolsUsed: sortedKeys.map((key) => fields[key]),
            };
          },
          (_validationErrors, _values, _event) => {
            delete formMap[idx];
          }
        )}
      >
        <TextInput
          withAsterisk
          label="Project name"
          placeholder="Awesome Project"
          {...form.getInputProps("name")}
        />

        <TextInput
          withAsterisk
          label="Project description"
          placeholder="A very awesome project I made a while back"
          {...form.getInputProps("description")}
        />

        <TextInput
          withAsterisk
          label="Link to project"
          placeholder="awesomeproject.com"
          {...form.getInputProps("link")}
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

const ProjectContent = () => {
  const [, setNavBar] = useAtom(navBarAtom);
  const [projectInfo, setProjectInfo] = useAtom(projectInfoAtom);

  const [formIndices, setFormIndices] = useState<number[]>(
    Array.from(Array(projectInfo ? projectInfo.length : 1).keys())
  );
  const formMapRef = useRef<Record<number, ProjectInfo>>(
    convertArrayToMap(projectInfo)
  );

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
          initialData={formMapRef.current[idx]}
        />
      ))}

      <div className="flex justify-between mt-auto">
        <Button
          onClick={() => {
            setNavBar("Skills");
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
              setProjectInfo(Object.values(formMapRef.current));
              setNavBar("Awards");
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

export default ProjectContent;
