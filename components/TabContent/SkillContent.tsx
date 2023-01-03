import { Button, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback, useRef, useState } from "react";
import { useDynamicForm } from "components/DynamicForm/hooks";
import { SkillInfo } from "shared/types";
import { CommonTabContentType } from ".";
import TabContent from "./TabContent";
import { InputFormProps } from ".";
import { convertArrayToMap, hasEmptyStringField } from "shared/utils";
import { navBarAtom, skillInfoAtom } from "shared/atoms";
import { useAtom } from "jotai";
import { Configuration, OpenAIApi } from "openai";
import { signOut } from "firebase/auth";

const INPUT_FORM_PREFIX = "skill-info-input-";

const SkillInfoInputForm = ({
  idx,
  remove,
  add,
  formMap,
  initialData,
}: InputFormProps<SkillInfo>) => {
  const form = useForm<Omit<SkillInfo, "details">>({
    initialValues: initialData,
    validate: {
      name: (value) => (!!value ? null : "Invalid skill name"),
      experience: (value) => (!!value ? null : "Invalid year"),
    },
  });

  const { fields, formElement } = useDynamicForm({
    placeholder: "OOP",
    errorMessage: "Invalid detail",
    label: "Skill details",
  });

  const [summary, setSummary] = useState<string | undefined>("");

  const ai = async () => {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `write a summary for CV beginning with adjectives in the first sentence:
      ${form.getInputProps("name").value} skills,
      ${form.getInputProps("experience").value} of experience
      `,
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    // setSummary(response.data.choices[0].text);
    form.setFieldValue("summary", response.data.choices[0].text);
  };

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
          label="Experience"
          placeholder="Year(s)"
          {...form.getInputProps("experience")}
        />

        <TextInput
          withAsterisk
          label="Skill name"
          placeholder="Programming Langauge"
          {...form.getInputProps("name")}
        />

        <TextInput
          label="AI Summary"
          placeholder="AI Do It For You"
          {...form.getInputProps("summary")}
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

        <Button
          variant="light"
          onClick={() => {
            ai();
          }}
        >
          Let AI Write It For You
        </Button>

        <Button variant="light" onClick={add}>
          Add
        </Button>
      </div>
    </>
  );
};

const SkillContent = () => {
  const [, setNavBar] = useAtom(navBarAtom);
  const [skillInfo, setSkillInfo] = useAtom(skillInfoAtom);

  const [formIndices, setFormIndices] = useState<number[]>(
    Array.from(Array(skillInfo ? skillInfo.length : 1).keys())
  );
  const formMapRef = useRef<Record<number, SkillInfo>>(
    convertArrayToMap(skillInfo)
  );

  const addSchool = useCallback(() => {
    setFormIndices((prev) => {
      const newIdx = prev[prev.length - 1] + 1;

      return [...prev, newIdx];
    });

    setSkillInfo(Object.values(formMapRef.current));
  }, [setSkillInfo]);

  const removeSchool = useCallback((id: number) => {
    setFormIndices((prev) => {
      return [...prev.filter((e) => e !== id)];
    });

    if (formMapRef.current[id]) {
      delete formMapRef.current[id];
    }

    setSkillInfo(Object.values(formMapRef.current));
  }, [setSkillInfo]);

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
