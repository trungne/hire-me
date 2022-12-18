import { Button, TextInput, CloseButton } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState, useRef, useCallback } from "react";
import { WorkInfo } from "shared/types";
import { CommonTabContentType } from ".";
import TabContent from "./TabContent";
import { Minus, Plus } from "tabler-icons-react";

const INPUT_FORM_PREFIX = "work-info-input-";
type Props = {
  idx: number;
  remove: (id: number) => void;
  add: () => void;
  formMap: Record<number, WorkInfo>;
};
const WorkInfoInputForm = ({ idx, remove, add, formMap }: Props) => {
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
  const [inputFields, setFields] = useState<Record<string, string>>({
    "0": "",
  });

  const removeField = (id: string) => {
    setFields((prev) => {
      const data = { ...prev };
      if (data[id] !== undefined) {
        delete data[id];
      }
      return data;
    });
  };

  const updateField = (id: string, value: string) => {
    setFields((prev) => {
      const data = { ...prev };
      data[id] = value;
      return data;
    });
  };
  const addField = () => {
    setFields((prev) => {
      const indices = Object.keys(prev).map((i) => parseInt(i));
      const maxIdx = Math.max(...indices);
      return {
        ...prev,
        [maxIdx + 1]: "",
      };
    });
  };

  return (
    <>
      <div className=" h-2 my-4 bg-slate-700"></div>
      <form
        className="flex flex-col gap-4 mb-4"
        onSubmit={form.onSubmit(
          (values) => {
            const sortedKeys = Object.keys(inputFields);
            sortedKeys.sort((a, b) => parseInt(a) - parseInt(b));
            formMap[idx] = {
              ...values,
              responsibilities: sortedKeys.map((key) => inputFields[key]),
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

      <form
      // onSubmit={form.onSubmit(
      //   (values) => {},
      //   (_validationErrors, _values, _event) => {}
      // )}
      >
        <Button onClick={addField} color="green" compact className="mb-4">
          <Plus />
        </Button>
        <div className="flex flex-col gap-4">
          {Object.keys(inputFields).map((key, index) => {
            return (
              <TextInput
                error={!inputFields[key] && <div>Invalid responsibility</div>}
                id={`responsibility-input-${index}`}
                key={key}
                rightSection={
                  <CloseButton
                    onClick={() => {
                      removeField(key);
                    }}
                    color="gray"
                    className="bg-red-50"
                    title={`Remove responsibility ${index + 1}`}
                  />
                }
                placeholder="Make awesome stuff"
                onChange={(e) => {
                  updateField(key, e.currentTarget.value);
                }}
              ></TextInput>
            );
          })}
        </div>
      </form>

      <div className="flex justify-between my-4">
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

  const removeWork = useCallback((id: Props["idx"]) => {
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
