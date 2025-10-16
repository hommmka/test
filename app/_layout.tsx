import { useColorScheme } from '@/hooks/use-color-scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const checkOnboarding = async () => {
  try {
    const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
    if (hasSeenOnboarding == 'true') {
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
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
