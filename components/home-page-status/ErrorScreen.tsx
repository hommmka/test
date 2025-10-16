import React, { useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome5';

interface ErrorScreenProps {
  message: string;
  onRetry: () => void;
}

export const ErrorScreen = ({ message, onRetry }: ErrorScreenProps) => {
  useEffect(() => {
    const timer = setInterval(onRetry, 300000);
    return () => clearInterval(timer);
  }, [onRetry]);

  return (
    <SafeAreaView style={styles.container}>
      <FontAwesome name="exclamation-triangle" size={80} color="#e74c3c" />
      <Text style={styles.title}>Произошла ошибка...</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.hint}>Обновлюсь автоматически через 5 минут</Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Повторить сейчас</Text>
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
    color: '#e74c3c',
    marginTop: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#555',
    marginTop: 12,
    textAlign: 'center',
  },
  hint: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
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