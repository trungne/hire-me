import { Button } from "@mantine/core";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Link from "next/link";
import { CVInfo } from "shared/types";
import { TEMPLATE_MAP } from "./styles";
import Template from "./Template";

const MyDocument = ({ info }: { info: CVInfo }) => {
  const styles = TEMPLATE_MAP[info.template] || TEMPLATE_MAP[0];

  return (
    <div className="mx-auto max-w-2xl  aspect-[1.414]">
      <div className="flex p-2 m-2 justify-between">
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
      <PDFViewer showToolbar={false} height={1000} width={700}>
        <Template styles={styles} cvInfo={info} />
      </PDFViewer>
    </div>
  );
};

export default MyDocument;
