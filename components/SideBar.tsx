import { Navbar } from "@mantine/core";

import { memo } from "react";
import { NAV_BAR } from "shared/constants";
import { NavCategory } from "shared/types";
import { Tabs } from "@mantine/core";

type Props = {
  isOpened: boolean;
};

const SideBar = ({ isOpened }: Props) => {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!isOpened}
      width={{ sm: 150, lg: 200 }}
    >
      <Tabs.List>
        {NAV_BAR.map((category) => {
          return (
            <Tabs.Tab value={NavCategory[category]} key={category}>
              {NavCategory[category]}
            </Tabs.Tab>
          );
        })}
        
      </Tabs.List>
    </Navbar>
  );
};

export default memo(SideBar);
