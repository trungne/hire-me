import { Button, CloseButton, Text, TextInput } from "@mantine/core";
import { useMemo, useState } from "react";
import { convertArrayToMap } from "shared/utils";
import { Plus } from "tabler-icons-react";

type UseDynamicFormProps = {
  label: string;
  placeholder: string;
  errorMessage: string;
  initialData?: string[];
};
export const useDynamicForm = ({
  label,
  placeholder,
  errorMessage,
  initialData,
}: UseDynamicFormProps) => {
  const [fields, setFields] = useState<Record<string, string>>(
    convertArrayToMap(initialData ?? [""])
  );
  console.log(label, fields);

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

  const formElement = useMemo(() => {
    return (
      <form>
        <Text className="text-[14px] text-[#212529] font-medium font-['Montserrat']">
          {label}
          <span
            className="mantine-u5apz8 mantine-InputWrapper-required mantine-TextInput-required"
            aria-hidden="true"
          >
            {" "}
            *
          </span>
        </Text>

        <Button onClick={addField} color="green" compact className="mb-4 mt-2">
          <Plus />
        </Button>
        <div className="flex flex-col gap-4">
          {Object.keys(fields).map((key, index) => {
            return (
              <TextInput
                value={fields[key]}
                error={!fields[key] && <div>{errorMessage}</div>}
                key={key}
                rightSection={
                  <CloseButton
                    onClick={() => {
                      removeField(key);
                    }}
                    color="gray"
                    className="bg-red-50"
                  />
                }
                placeholder={placeholder}
                onChange={(e) => {
                  updateField(key, e.currentTarget.value);
                }}
              ></TextInput>
            );
          })}
        </div>
      </form>
    );
  }, [fields]);

  return { fields, formElement };
};
