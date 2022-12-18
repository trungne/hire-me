import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState, useRef, useCallback } from "react";
import { WorkInfo } from "shared/types";
import { CommonTabContentType } from ".";
import TabContent from "./TabContent";
import { InputFormProps } from "./type";
import { useDynamicForm } from "components/DynamicForm/hooks";
import { hasEmptyStringField } from "shared/utils";

const INPUT_FORM_PREFIX = "work-info-input-";

const WorkInfoInputForm = ({
  idx,
  remove,
  add,
  formMap,
}: InputFormProps<WorkInfo>) => {
  const form = useForm<Omit<WorkInfo, "responsibilities">>({
    initialValues: {
      companyName: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      location: "",
    },
    validate: {
      companyName: (value) => (!!value ? null : "Invalid company name"),
      jobTitle: (value) => (!!value ? null : "Invalid job title"),
      location: (value) => (!!value ? null : "Invalid location"),
    },
  });
  const { fields, formElement } = useDynamicForm({
    placeholder: "Make awesome stuff",
    errorMessage: "Invalid responsibility",
    label: "Responsibilities",
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
              responsibilities: sortedKeys.map((key) => fields[key]),
            };
          },
          (_validationErrors, _values, _event) => {
            delete formMap[idx];
          }
        )}
      >
        <TextInput
          withAsterisk
          label="Company name"
          placeholder="Google"
          {...form.getInputProps("companyName")}
        />
        <TextInput
          withAsterisk
          label="Job title"
          placeholder="Software Engineer (L1/L2)"
          {...form.getInputProps("jobTitle")}
        />
        <TextInput
          withAsterisk
          label="Location"
          placeholder="Software Engineer (L1/L2)"
          {...form.getInputProps("location")}
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

const WorkContent = ({ setNavBar }: CommonTabContentType) => {
  const [formIndices, setFormIndices] = useState<number[]>([0]);
  const formMapRef = useRef<Record<number, WorkInfo>>({});
  const addWork = useCallback(() => {
    setFormIndices((prev) => {
      const newIdx = prev[prev.length - 1] + 1;

      return [...prev, newIdx];
    });
  }, []);

  const removeWork = useCallback((id: number) => {
    setFormIndices((prev) => {
      return [...prev.filter((e) => e !== id)];
    });

    if (formMapRef.current[id]) {
      delete formMapRef.current[id];
    }
  }, []);

  return (
    <TabContent title="Enter your work history">
      {formIndices.map((idx) => (
        <WorkInfoInputForm
          formMap={formMapRef.current}
          add={addWork}
          remove={removeWork}
          idx={idx}
          key={idx}
        />
      ))}

      <div className="flex justify-between mt-auto">
        <Button
          onClick={() => {
            setNavBar("Education");
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
              console.log(formMapRef.current);
              setNavBar("Skills");
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

export default WorkContent;
