import { Navbar, Text } from "@mantine/core";
import { memo } from "react";

type Props = {
  isOpened: boolean;
};
const SideBar = ({ isOpened }: Props) => {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!isOpened}
      width={{ sm: 200, lg: 300 }}
    >
      <div>
        Template
      </div>
      <div>
        Profile
      </div>
      <div>
        Education
      </div>
    </Navbar>
  );
};

export default memo(SideBar);
