import { Button, Radio } from "@mantine/core";
import { TEMPLATE_MAP } from "components/PDF/styles";
import { useAtom } from "jotai";
import { useState } from "react";
import { navBarAtom, templateInfoAtom } from "shared/atoms";
import { showNotification } from "@mantine/notifications";

import TabContent from "./TabContent";

const TemplateContent = () => {
  const [, setNavBar] = useAtom(navBarAtom);
  const [template, setTemplate] = useAtom(templateInfoAtom);
  const [value, setValue] = useState<string | undefined>(template?.toString());

  const onSave = () => {
    if (!value) {
      showNotification({
        title: "Error",
        message: "No template selected",
        color: "red",
      });
      return;
    }
    setTemplate(parseInt(value));
  };
  return (
    <TabContent onSave={onSave} title="Choose a template">
      <Radio.Group
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
        name="template"
        label="Select your template"
        withAsterisk
      >
        {Object.keys(TEMPLATE_MAP).map((key) => {
          return (
            <Radio
              key={key}
              value={key}
              label={`Template ${parseInt(key) + 1}`}
            />
          );
        })}
      </Radio.Group>

      <div className="flex justify-between mt-auto">
        <div className="invisible"></div>
        <Button
          onClick={() => {
            setNavBar("Profile");
          }}
          type="submit"
        >
          Next
        </Button>
      </div>
    </TabContent>
  );
};

export default TemplateContent;
