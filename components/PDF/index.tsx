import { Button } from "@mantine/core";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Link from "next/link";
import { CVInfo } from "shared/types";
import { TEMPLATE_MAP } from "./styles";
import Template from "./Template";

const MyDocument = ({ info }: { info: CVInfo }) => {
  const document = (
    <Template
      styles={
        TEMPLATE_MAP[info.template]
          ? TEMPLATE_MAP[info.template]
          : TEMPLATE_MAP[0]
      }
      cvInfo={info}
    />
  );
  return (
    <div className="flex flex-col mx-auto justify-center max-w-full md:max-w-3xl">
      <div className="flex p-2 m-2  justify-between ">
        <Link href="/">
          <Button variant="outline">Back to edit</Button>
        </Link>

        <PDFDownloadLink document={document} fileName="somename.pdf">
          {({ blob, url, loading, error }) => {
            return (
              <Button disabled={loading} color={loading ? "gray" : "teal"}>
                {loading ? "Loading" : "Download"}
              </Button>
            );
          }}
        </PDFDownloadLink>
      </div>
      <PDFViewer
        className="scrollbar-hide w-full h-[500px] md:h-[1000px]"
        showToolbar={false}
      >
        {document}
      </PDFViewer>
    </div>
  );
};

export default MyDocument;
