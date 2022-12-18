import { Button } from "@mantine/core";
import { CommonTabContentType } from ".";
import TabContent from "./TabContent";

const TemplateContent = ({ setNavBar }: CommonTabContentType) => {
  return (
    <TabContent title="Choose a template">
      <div></div>

      <div className="flex justify-between mt-auto">
        <div></div>
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
