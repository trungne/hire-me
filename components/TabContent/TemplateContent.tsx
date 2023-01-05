import { Button, Radio } from "@mantine/core";
import { TEMPLATE_MAP } from "components/PDF/styles";
import { useAtom } from "jotai";
import { navBarAtom, templateInfoAtom } from "shared/atoms";
import TabContent from "./TabContent";

const TemplateContent = () => {
  const [, setNavBar] = useAtom(navBarAtom);
  const [template, setTemplate] = useAtom(templateInfoAtom);
  return (
    <TabContent title="Choose a template">
      <Radio.Group
        value={template?.toString() || "0"}
        onChange={(value) => {
          setTemplate(parseInt(value));
        }}
        name="template"
        label="Select your template"
        withAsterisk
      >
        {Object.keys(TEMPLATE_MAP).map((key) => {
          return <Radio key={key} value={key} label={`Template ${key}`} />;
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
