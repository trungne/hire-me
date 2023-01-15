import { Button, Radio } from "@mantine/core";
import { TEMPLATE_MAP } from "components/PDF/styles";
import { useAtom } from "jotai";
import { useState } from "react";
import { navBarAtom, templateInfoAtom } from "shared/atoms";
import { showNotification } from "@mantine/notifications";

import TabContent from "./TabContent";
import Image from "next/image";
import { templatePreviewModalAtom } from "components/Modal/TemplatePreviewModal";

const TemplateContent = () => {
  const [, setNavBar] = useAtom(navBarAtom);
  const [template, setTemplate] = useAtom(templateInfoAtom);
  const [value, setValue] = useState<string | undefined>(template?.toString());
  const [, setTemplateModal] = useAtom(templatePreviewModalAtom);

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
            <div key={key} className="">
              <Radio
                value={key}
                label={`Template ${parseInt(key) + 1}`}
              ></Radio>
              <div key={key} className="relative w-32 h-72 cursor-pointer">
                <Image
                  style={{ objectFit: "contain" }}
                  src={TEMPLATE_MAP[+key].previewImg}
                  fill
                  alt="Template preview"
                  className="hover:bg-slate-200 hover:opacity-70"
                  onClick={() => {
                    setTemplateModal({
                      url: TEMPLATE_MAP[+key].previewImg,
                    });
                  }}
                />
              </div>
            </div>
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
