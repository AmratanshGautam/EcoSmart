import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { HeritageSite } from '../../types/heritage';

interface Props {
  site: HeritageSite;
  onPress: (site: HeritageSite) => void;
}

export function HeritageSiteCard({ site, onPress }: Props) {
  return (
    <TouchableOpacity onPress={() => onPress(site)}>
      <View style={styles.container}>
        <Image source={{ uri: site.image_url }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.name}>{site.name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {site.description}
          </Text>
          <Text style={styles.rating}>Rating: {site.average_rating.toFixed(1)}/5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
});