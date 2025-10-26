import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ScrollView, Linking, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getProviderResume, getProviderIDDocs } from '../utils/signedUrls';

export default function ProviderProfile() {
  const route = useRoute();
  const { provider } = route.params || {};

  const [resumeUrl, setResumeUrl] = useState(null);
  const [idUrls, setIdUrls] = useState([]);

  useEffect(() => {
    if (!provider) {
      Alert.alert('Error', 'No provider data received.');
      console.error('❌ No provider data received in route params');
      return;
    }

    async function loadFiles() {
      try {
        const resume = await getProviderResume(provider.resume_file);
        const ids = await getProviderIDDocs(provider.id_files);
        setResumeUrl(resume);
        setIdUrls(ids);
      } catch (error) {
        console.error('Error loading provider files:', error);
      }
    }

    loadFiles();
  }, [provider]);

  if (!provider) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No provider data received.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        {provider.name}
      </Text>

      {resumeUrl && (
        <Button title="View Resume" onPress={() => Linking.openURL(resumeUrl)} />
      )}

      <Text style={{ marginTop: 20, fontSize: 18 }}>ID Documents:</Text>
      <ScrollView horizontal>
        {idUrls.map((url, index) => (
          <Image
            key={index}
            source={{ uri: url }}
            style={{
              width: 100,
              height: 100,
              marginRight: 10,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#ccc',
            }}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}
