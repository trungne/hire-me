import { TemplateA } from "./Templates";

// Create Document Component
const MyDocument = () => (
  <>
    <TemplateA />
    {/* <PDFDownloadLink document={<PdfDocument />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink> */}
  </>
);

export { MyDocument };
