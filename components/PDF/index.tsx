import { TemplateA } from "./Templates";
import { PDFViewer } from "@react-pdf/renderer";

// Create Document Component
const MyDocument = () => (
  <>
    {/* <PDFViewer> */}
    <TemplateA />
    {/* </PDFViewer> */}

    {/* <PDFDownloadLink document={<PdfDocument />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink> */}
  </>
);

export default MyDocument;
