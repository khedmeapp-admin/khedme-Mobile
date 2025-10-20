import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlknslmcsfspgafrorzl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsa25zbG1jc2ZzcGdhZnJvcnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDcwMzUsImV4cCI6MjA3NjE4MzAzNX0.UZOayOecmvuqcehU_j2NtGfEIffxfVOz3eqfhcrzxBs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [fileName, setFileName] = useState('');

  // 1️⃣ Sign up
  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert('Error', error.message);
    else {
      Alert.alert('Success', 'User signed up! Please check your email to confirm.');
      setUser(data.user);
    }
  };

  // 2️⃣ Log in
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert('Error', error.message);
    else {
      Alert.alert('Success', 'Logged in!');
      setUser(data.user);
    }
  };

  // 3️⃣ Pick and upload file
  const pickAndUploadFile = async (bucket) => {
    if (!user) return Alert.alert('Error', 'Please log in first');

    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type !== 'success') return;

    setFileName(result.name);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(`${user.id}/${result.name}`, await fetch(result.uri).then(r => r.blob()), { upsert: true });

    if (error) Alert.alert('Upload failed', error.message);
    else Alert.alert('Upload successful', result.name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>بالخدمة</Text>

      {!user && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Sign Up" onPress={handleSignUp} />
          <Button title="Log In" onPress={handleLogin} />
        </>
      )}

      {user && (
        <>
          <Text>Logged in as: {user.email}</Text>
          <Button title="Upload to Clients" onPress={() => pickAndUploadFile('clients')} />
          <Button title="Upload to Providers" onPress={() => pickAndUploadFile('providers')} />
          {fileName ? <Text>Last picked file: {fileName}</Text> : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: '#C32865' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 5 },
});
