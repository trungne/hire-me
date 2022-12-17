import { ReactNode, useId } from "react";
import { Divider } from "@mantine/core";

type Props = {
  title: string;
  children: ReactNode;
};
const TabContent = ({ title, children }: Props) => {
  const key = useId();
  return (
    <div className="h-full flex flex-col" key={title + key}>
      <h1 className=" m-0 my-1 text-base">{title.toUpperCase()}</h1>
      <Divider my="sm" />
      {children}
    </div>
  );
};

export default TabContent;
