import { useAtom } from "jotai";
import { useState } from "react";
import { Tabs } from "@mantine/core";
import SideBar from "components/SideBar";
import { navBarAtom } from "shared/atoms";
import { NavCategory } from "shared/types";
import {
  TemplateContent,
  ProfileContent,
  EducationContent,
  WorkContent,
  SkillContent,
  ProjectContent,
  AwardContent,
} from "components/TabContent";

const Main = () => {
  const [opened, setOpened] = useState(false);
  const [navBar, setNavBar] = useAtom(navBarAtom);

  return (
    <>
      <Tabs
        classNames={{
          root: "bg-slate-50 ",
          tabLabel: "font-['Montserrat']",
          panel: "h-full",
          tabsList: "p-0",
        }}
        orientation="vertical"
        value={navBar}
        onTabChange={(value) => {
          if (value) {
            setNavBar(value as typeof NavCategory[keyof typeof NavCategory]);
          }
        }}
      >
        <SideBar isOpened={opened}></SideBar>
        <div className="overflow-y-auto w-full scrollbar-hide p-4">
          <Tabs.Panel value={NavCategory.TEMPLATE}>
            <TemplateContent />
          </Tabs.Panel>
          <Tabs.Panel value={NavCategory.PROFILE}>
            <ProfileContent />
          </Tabs.Panel>
          <Tabs.Panel value={NavCategory.EDUCATION}>
            <EducationContent />
          </Tabs.Panel>
          <Tabs.Panel value={NavCategory.WORK}>
            <WorkContent />
          </Tabs.Panel>
          <Tabs.Panel value={NavCategory.SKILLS}>
            <SkillContent />
          </Tabs.Panel>
          <Tabs.Panel value={NavCategory.PROJECTS}>
            <ProjectContent />
          </Tabs.Panel>
          <Tabs.Panel value={NavCategory.AWARDS}>
            <AwardContent />
          </Tabs.Panel>
        </div>
      </Tabs>
    </>
  );
};

export default Main;
