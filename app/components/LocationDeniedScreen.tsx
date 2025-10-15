import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome5';

export const LocationDeniedScreen = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FontAwesome name="map-marker-slash" size={80} color="#f39c12" />
      <Text style={styles.title}>Не могу показать погоду</Text>
      <Text style={styles.message}>
        Мне нужно знать твоё местоположение.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Разрешить доступ</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f39c12',
    marginTop: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#555',
    marginTop: 12,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#747474ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});