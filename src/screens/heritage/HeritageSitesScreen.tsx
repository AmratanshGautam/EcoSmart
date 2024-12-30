import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeritageSiteCard } from '../../components/heritage/HeritageSiteCard';
import { getHeritageSites } from '../../services/heritage';
import { HeritageSite } from '../../types/heritage';
import { HeritageStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<HeritageStackParamList, 'HeritageList'>;

export function HeritageSitesScreen({ navigation }: Props) {
  const [sites, setSites] = useState<HeritageSite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      const data = await getHeritageSites();
      setSites(data);
    } catch (err) {
      console.error('Failed to load heritage sites:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSitePress = (site: HeritageSite) => {
    navigation.navigate('HeritageDetail', { site });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sites}
        renderItem={({ item }) => (
          <HeritageSiteCard
            site={item}
            onPress={handleSitePress}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  list: {
    padding: 16,
  },
});