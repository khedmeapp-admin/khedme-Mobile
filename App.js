import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [fileName, setFileName] = useState('');

  const pickAndUploadFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setFileName(result.name);
      
      const { data, error } = await supabase.storage
        .from('clients') // or 'providers' bucket
        .upload(result.name, await fetch(result.uri).then(r => r.blob()));
      
      if (error) {
        Alert.alert('Upload failed', error.message);
      } else {
        Alert.alert('Upload successful', result.name);
      }
    }
  };

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Upload Test</Text>
      <Button title="Pick & Upload File" onPress={pickAndUploadFile} />
      {fileName ? <Text>Last picked file: {fileName}</Text> : null}
    </View>
  );
}
