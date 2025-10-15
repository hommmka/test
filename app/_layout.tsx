import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useLayoutEffect } from 'react';
import 'react-native-reanimated';
const AsyncStorage = require('@react-native-async-storage/async-storage').default;

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const checkOnboarding = async () => {
    let value: string | null = null;
    try {
      value = await AsyncStorage.getItem('hasSeenOnboarding');
    } catch (e) {
      console.warn('Failed to fetch onboarding state', e);
    }
    if (value == 'true') {
      router.replace('/onboarding1');
      return false;
    }
    return true;
  };

  useLayoutEffect(() => {
    checkOnboarding()
  }, [])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
