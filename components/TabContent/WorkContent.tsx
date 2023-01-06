import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState, useRef, useCallback } from "react";
import { WorkInfo } from "shared/types";
import TabContent from "./TabContent";
import { InputFormProps } from ".";
import { useDynamicForm } from "components/DynamicForm/hooks";
import { convertArrayToMap, hasEmptyStringField } from "shared/utils";
import { useAtom } from "jotai";
import { navBarAtom, workInfoAtom } from "shared/atoms";
import MonthInput from "components/MonthInput";

const INPUT_FORM_PREFIX = "work-info-input-";

const WorkInfoInputForm = ({
  idx,
  remove,
  formMap,
  initialData,
}: InputFormProps<WorkInfo>) => {
  const form = useForm<Omit<WorkInfo, "responsibilities">>({
    initialValues: initialData,
    validate: {},
  });
  const { fields, formElement } = useDynamicForm({
    placeholder: "Make awesome stuff",
    errorMessage: "Invalid responsibility",
    label: "Responsibilities",
    initialData: initialData?.responsibilities,
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
          label="Company name"
          placeholder="Google"
          {...form.getInputProps("companyName")}
        />
        <TextInput
          label="Job title"
          placeholder="Software Engineer (L1/L2)"
          {...form.getInputProps("jobTitle")}
        />
        <TextInput
          label="Location"
          placeholder="New York, NY"
          {...form.getInputProps("location")}
        />

        <MonthInput
          startDate={initialData?.startDate}
          endDate={initialData?.endDate}
          startDateInputProps={form.getInputProps("startDate")}
          endDateInputProps={form.getInputProps("endDate")}
          onPresentClicked={() => form.setValues({ endDate: "Present" })}
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

const WorkContent = () => {
  const [, setNavBar] = useAtom(navBarAtom);
  const [workInfo, setWorkInfo] = useAtom(workInfoAtom);
  const [formIndices, setFormIndices] = useState<number[]>(
    Array.from(Array(workInfo ? workInfo.length : 1).keys())
  );
  const formMapRef = useRef<Record<number, WorkInfo>>(
    convertArrayToMap(workInfo)
  );
  const addWork = useCallback(() => {
    setFormIndices((prev) => {
      const newIdx = prev[prev.length - 1] + 1;

      return [...prev, newIdx];
    });

    setWorkInfo(Object.values(formMapRef.current));
  }, [setWorkInfo]);

  const removeWork = useCallback(
    (id: number) => {
      setFormIndices((prev) => {
        return [...prev.filter((e) => e !== id)];
      });

      if (formMapRef.current[id]) {
        delete formMapRef.current[id];
      }

      setWorkInfo(Object.values(formMapRef.current));
    },
    [setWorkInfo]
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
      setWorkInfo(Object.values(formMapRef.current));
      // TODO: display success message
      return;
    }

    // TODO: display error message
  };
  return (
    <TabContent onSave={onSave} title="Enter your work history">
      <div>
        <Button variant="light" onClick={addWork}>
          Add
        </Button>
      </div>

      {formIndices.map((idx) => (
        <WorkInfoInputForm
          formMap={formMapRef.current}
          remove={removeWork}
          idx={idx}
          key={idx}
          initialData={formMapRef.current[idx]}
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
            setNavBar("Skills");
          }}
        >
          Next
        </Button>
      </div>
    </TabContent>
  );
};

export default WorkContent;
