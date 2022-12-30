import { Button } from "@mantine/core";
import { useAtom } from "jotai";
import { navBarAtom } from "shared/atoms";
import TabContent from "./TabContent";

const TemplateContent = () => {
  const [, setNavBar] = useAtom(navBarAtom);
  return (
    <TabContent title="Choose a template">
      <div></div>

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
