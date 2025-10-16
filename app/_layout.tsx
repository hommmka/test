import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

export default function RootLayout() {

  const checkOnboarding = async () => {
  try {
    const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
    if (hasSeenOnboarding !== 'true') {
      router.replace('/onboarding1');
    }
  } catch (e) {
    console.warn('Failed to check onboarding status', e);
    router.replace('/onboarding1');
  }
};

  useEffect(() => {
    checkOnboarding()
  }, [])

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(onboardings)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
