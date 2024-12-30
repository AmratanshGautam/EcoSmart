import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { pickImage } from '../../utils/image';
import { getCurrentLocation } from '../../utils/location';
import { createReport } from '../../services/reports';

export function CreateReportScreen() {
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImagePick = async () => {
    try {
      const uri = await pickImage();
      if (uri) setImageUri(uri);
    } catch (err) {
      setError('Failed to pick image');
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      if (!imageUri) {
        setError('Please select an image');
        return;
      }

      const location = await getCurrentLocation();
      await createReport(
        'user-id', // TODO: Get from auth context
        imageUri,
        description,
        location.latitude,
        location.longitude
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Pick Image"
        onPress={handleImagePick}
        variant="secondary"
      />
      <Input
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Describe the garbage situation"
      />
      {error ? <Input label="" value="" onChangeText={() => {}} error={error} /> : null}
      <Button
        title="Submit Report"
        onPress={handleSubmit}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});