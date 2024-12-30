import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { GarbageReport } from '../../types/reports';

interface Props {
  report: GarbageReport;
}

export function ReportCard({ report }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: report.image_url }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.description}>{report.description}</Text>
        <Text style={styles.status}>Status: {report.status}</Text>
        <Text style={styles.tokens}>Tokens earned: {report.tokens_earned}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 4,
  },
  content: {
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
  tokens: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});