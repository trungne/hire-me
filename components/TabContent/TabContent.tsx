import { ReactNode, useId } from "react";
import { Button, Divider } from "@mantine/core";

type Props = {
  title: string;
  onSave: () => void;
  children: ReactNode;
};
const TabContent = ({ title, children, onSave }: Props) => {
  const key = useId();
  return (
    <div className="min-h-full flex flex-col" key={title + key}>
      <div className="flex justify-between items-center">
        <h1 className=" m-0 my-1 text-base">{title.toUpperCase()}</h1>
        <Button onClick={onSave} color="green">
          Save
        </Button>
      </div>

      <Divider my="sm" />
      {children}
    </div>
  );
};

export default TabContent;
