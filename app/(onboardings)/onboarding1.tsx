// app/onboarding.tsx
import { ONBOARDING_SLIDES } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const DOT_SIZE = 10;

export default function OnboardingScreen() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const router = useRouter();

  const handleContinue = async () => {
    if (currentSlideIndex < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      try {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      } catch (e) {
        console.warn('Failed to save onboarding state', e);
      } finally {
        router.replace('/');
      }
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    } catch (e) {
      console.warn('Failed to save onboarding state', e);
    } finally {
      router.replace('/');
    }
  };

  const currentSlide = ONBOARDING_SLIDES[currentSlideIndex];
  const imageMap = {
  0: require('@/assets/images/weather.png'),
  1: require('@/assets/images/city.png'),
  2: require('@/assets/images/help.jpg'),
};

const currentImage = imageMap[currentSlideIndex as 0|1|2];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Image
          source={currentImage}
          style={styles.image}
          contentFit="contain"
        />
        <Text style={styles.title}>{currentSlide.title}</Text>
        {currentSlide.subtitles.map((subtitle, i) => (
          <Text key={i} style={styles.subtitle}>
            {subtitle}
          </Text>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {ONBOARDING_SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlideIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.continueBtn}
            activeOpacity={0.8}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>
              {currentSlideIndex === ONBOARDING_SLIDES.length - 1 ? 'Начать' : 'Продолжить'}
            </Text>
          </TouchableOpacity>

          {currentSlideIndex < ONBOARDING_SLIDES.length - 1 && (
            <TouchableOpacity
              style={styles.skipBtn}
              activeOpacity={0.8}
              onPress={handleSkip}
            >
              <Text style={styles.skipText}>Пропустить</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 1,
    borderColor: '#111',
    marginHorizontal: 6,
    backgroundColor: 'transparent',
  },
  dotActive: {
    backgroundColor: '#111',
    borderColor: '#111',
  },
  actions: {
    display:'flex',
    flexDirection: 'column',
    gap: 15
  },
  continueBtn: {
    backgroundColor: '#111',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  skipBtn: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  skipText: {
    color: '#111',
    fontWeight: '600',
    fontSize: 16,
  },
});