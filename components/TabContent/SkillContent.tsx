import { useForm } from "@mantine/form";
import { useState } from "react";
import { SkillInfo } from "shared/types";
import { InputFormProps } from "./type";

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

  const [inputFields, setFields] = useState<Record<string, string>>({
    "0": "",
  });
};
