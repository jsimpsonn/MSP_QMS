// app/claims/ClaimPDF.tsx
import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { Claim } from './columns'

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
})

interface ClaimPDFProps {
  claim: Claim
}

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
)

export default ClaimPDF
