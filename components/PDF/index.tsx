import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

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
  },
});

const PdfDocument = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
          <Text>Section #1</Text>
          <Text>Section #1</Text>
          <Text>Section #1</Text>
          
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
          <Text>Section #2</Text>
          <Text>Section #2</Text>
          <Text>Section #2</Text>
          <Text>Section #2</Text>
          <Text>Section #2</Text>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};

// Create Document Component
const MyDocument = () => (
  <>
    <PdfDocument />
    <PDFDownloadLink document={<PdfDocument />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink>
  </>
);

export { MyDocument };
