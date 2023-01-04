import { PDFDownloadLink } from "@react-pdf/renderer";
import { useAtom } from "jotai";
import { cvInfoAtom } from "shared/atoms";
import Template from "./Template";

const downloadFile = async (blob: Blob, filename = "download") => {
  const downloadedBlob = new Blob([blob], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(downloadedBlob);
  link.download = `${filename}-${+new Date()}.pdf`;
  link.click();
};

// Create Document Component
const MyDocument = () => {
  const [info] = useAtom(cvInfoAtom);
  if (!info) {
    return null;
  }
  return (
    <>
      <div className="mx-auto max-w-2xl w-4/5 aspect-[1.414]">
        <Template cvInfo={info} />
      </div>

      <PDFDownloadLink
        document={<Template cvInfo={info} />}
        fileName="somename.pdf"
      >
        {({ blob, url, loading, error }) => {
          console.log("error", error);
          return <h1>{loading ? "Loading" : "Download"}</h1>;
        }}
      </PDFDownloadLink>
    </>
  );
};

export default MyDocument;
