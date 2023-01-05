import { Button } from "@mantine/core";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useAtom } from "jotai";
import Link from "next/link";
import { cvInfoAtom } from "shared/atoms";
import { TEMPLATE_MAP } from "./styles";
import Template from "./Template";

const MyDocument = () => {
  const [info] = useAtom(cvInfoAtom);

  if (!info) {
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl w-4/5 aspect-[1.414]">
      <Template
        styles={
          TEMPLATE_MAP[info.template]
            ? TEMPLATE_MAP[info.template]
            : TEMPLATE_MAP[0]
        }
        cvInfo={info}
      />
      <div className="flex p-4 m-4 justify-between">
        <Link href="/">
          <Button variant="outline">Back to edit</Button>
        </Link>

        <PDFDownloadLink
          document={
            <Template
              styles={
                TEMPLATE_MAP[info.template]
                  ? TEMPLATE_MAP[info.template]
                  : TEMPLATE_MAP[0]
              }
              cvInfo={info}
            />
          }
          fileName="somename.pdf"
        >
          {({ blob, url, loading, error }) => {
            return (
              <Button disabled={loading} color={loading ? "gray" : "teal"}>
                {loading ? "Loading" : "Download"}
              </Button>
            );
          }}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default MyDocument;
