// app/claims/claimPDF.tsx

import React from 'react';  // Importing React
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';  // Importing components from @react-pdf/renderer
import { Claim } from './columns';  // Importing Claim type

// Defining styles for the PDF document using StyleSheet
const styles = StyleSheet.create({
  page: {
    padding: 30,  // Padding for the page
  },
  section: {
    marginBottom: 10,  // Margin bottom for each section
  },
  text: {
    fontSize: 12,  // Font size for text
  },
});

// Defining props interface for ClaimPDF component
interface ClaimPDFProps {
  claim: Claim;  // Claim object passed as a prop
}

// Functional component for generating PDF document for a claim
const ClaimPDF: React.FC<ClaimPDFProps> = ({ claim }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>Claim #: {claim.claimNumber}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Accepted/Denied: {claim.status}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Customer: {claim.customer}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Cost Code: {claim.costCode}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Claim Date: {claim.claimDate}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Gross Amount: ${claim.grossAmount.toFixed(2)}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Net to MSP: ${claim.netToMSP.toFixed(2)}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Reason for Adjustment: {claim.reasonForAdjustment}</Text>
      </View>
    </Page>
  </Document>
);

export default ClaimPDF;  // Exporting the ClaimPDF component as default
