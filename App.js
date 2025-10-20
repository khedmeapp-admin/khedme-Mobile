import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { supabase } from './supabase'; // make sure supabase.js exists in the same folder

export default function App() {

  // Function to pick a client ID file
  const pickClientID = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf', // only allow PDF files
    });

    if (result.type === 'success') {
      console.log('File picked:', result.uri);
      alert('File picked! Check console for URI.');
    } else {
      console.log('File picking cancelled');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>بالخدمة</Text>
      <Button title="Upload Client ID" onPress={pickClientID} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#C32865', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  text: { 
    color: '#fff', 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 20 
  }
});
