import { Button } from "@mantine/core";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { HEADER_HEIGHT } from "components/Header";
import Link from "next/link";
import { CVInfo } from "shared/types";
import { TEMPLATE_MAP } from "./styles";
import Template from "./Template";

const MyDocument = ({ info }: { info: CVInfo }) => {
  const styles = TEMPLATE_MAP[info.template] || TEMPLATE_MAP[0];

  return (
    <div
      style={{}}
      className="flex flex-col mx-auto justify-center max-w-full md:max-w-3xl"
    >
      <div className="flex p-2 m-2  justify-between ">
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
      <PDFViewer className=" w-full  h-[500px] md:h-[1000px]" showToolbar={false}>
        <Template styles={styles} cvInfo={info} />
      </PDFViewer>
    </div>
  );
};

export default MyDocument;
