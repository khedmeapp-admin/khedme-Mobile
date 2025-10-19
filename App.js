import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>بلخدمة</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#C32865', alignItems: 'center', justifyContent: 'center' },
  text: { color: '#fff', fontSize: 32, fontWeight: 'bold' }
});
