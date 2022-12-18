import { Button, CloseButton, TextInput } from "@mantine/core";
import { useMemo, useState } from "react";
import { Plus } from "tabler-icons-react";

type UseDynamicFormProps = {
  placeholder: string;
  errorMessage: string;
};
export const useDynamicForm = ({
  placeholder,
  errorMessage,
}: UseDynamicFormProps) => {
  const [fields, setFields] = useState<Record<string, string>>({
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

  const formElement = useMemo(() => {
    return (
      <form>
        <Button onClick={addField} color="green" compact className="mb-4">
          <Plus />
        </Button>
        <div className="flex flex-col gap-4">
          {Object.keys(fields).map((key, index) => {
            return (
              <TextInput
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
