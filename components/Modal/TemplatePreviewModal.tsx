import { Modal } from "@mantine/core";
import { atom, useAtom } from "jotai";
import Image from "next/image";

type PreviewModalProps = {
  url: string;
};
export const templatePreviewModalAtom = atom<PreviewModalProps | null>(null);

export const TemplatePreviewModal = () => {
  const [props, setProps] = useAtom(templatePreviewModalAtom);

  return (
    <Modal
    centered
      opened={!!props}
      onClose={() => {
        setProps(null);
      }}
    >
      <div className="relative w-full h-[80vh]">
        <Image
          style={{
            objectFit: "contain",
          }}
          alt="Template preview"
          src={props?.url || ""}
          fill={true}
        ></Image>
      </div>
    </Modal>
  );
};
