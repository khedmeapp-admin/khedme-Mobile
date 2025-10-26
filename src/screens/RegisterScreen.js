import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(3); // Jump straight to profile for now

  const goToProfile = () => {
    const provider = {
      id: 1,
      name: 'Ahmad Nasser',
      resume_file: 'provider1.pdf',
      id_files: ['provider1_id.jpg', 'provider1_selfie.jpg'],
      profile_pic: 'provider1.jpg',
      portfolio_files: ['work1.jpg', 'work2.jpg'],
    };

    navigation.navigate('ProviderProfile', { provider });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Khedme بال</Text>

      {step === 3 && (
        <>
          <Text style={styles.subtitle}>Welcome, Provider!</Text>
          <Button title="View Provider Profile" onPress={goToProfile} color="#C32865" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#C32865',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#C32865',
    marginBottom: 20,
  },
});
