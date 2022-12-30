import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { useAtom } from "jotai";
import { cvInfoAtom } from "shared/atoms";

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    textAlign: "center",
  },
});

const PdfDocument = () => {
  const [cvInfo] = useAtom(cvInfoAtom);
  console.log(cvInfo);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{cvInfo?.profile?.fullName}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Text>{cvInfo?.profile?.location}</Text>
            <Text>{cvInfo?.profile?.email}</Text>
            <Text>{cvInfo?.profile?.phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.section}></View>
      </Page>
    </Document>
  );
};

// Create Document Component
const MyDocument = () => (
  <>
    <PdfDocument />
    {/* <PDFDownloadLink document={<PdfDocument />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink> */}
  </>
);

export { MyDocument };
