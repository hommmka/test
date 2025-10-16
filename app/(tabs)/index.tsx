import { daysDict, monthsDict, OPENWEATHER_KEY } from "@/constants/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from 'expo-image';
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ErrorScreen } from "../../components/home-page-status/ErrorScreen";
import { LoadingScreen } from "../../components/home-page-status/LoadingScreen";
import { LocationDeniedScreen } from "../../components/home-page-status/LocationDeniedScreen";
import { getWeather, WeatherData } from "../../serviсes/api";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const date = new Date();
  const formattedDate = `${daysDict[date.getDay()]}, ${date.getDate()} ${
    monthsDict[date.getMonth()]
  }`;

  const fetchWeather = async () => {
    setError(null);
    setLoading(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Location permission not granted");
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const data = await getWeather(latitude, longitude, OPENWEATHER_KEY);
      await AsyncStorage.setItem("lastWeather", JSON.stringify(data));
      setWeather(data);
    } catch (err: any) {
      setError(err.message || "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadFromCache = async () => {
      try {
        const cached = await AsyncStorage.getItem("lastWeather");
        if (cached) {
          setWeather(JSON.parse(cached));
        }
      } catch (e) {
        console.log("Ошибка чтения кэша:", e);
      } finally {
        fetchWeather();
      }
    };

    loadFromCache();
  }, []);

  useEffect(() => {
    if (!weather) return;

    const interval = setInterval(fetchWeather, 1800000); // 30 минут
    return () => clearInterval(interval);
  }, [weather]);

  const handleRetry = () => {
    fetchWeather();
  };

  if (loading && !weather) {
    return <LoadingScreen />;
  }

  if (error) {
    if (error === "Location permission not granted") {
      return <LocationDeniedScreen onRetry={handleRetry} />;
    }
    return <ErrorScreen message={error} onRetry={handleRetry} />;
  }

  if (!weather) {
    return (
      <ErrorScreen message="Данные о погоде не найдены" onRetry={handleRetry} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Погода</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.weatherContainer}>
          <Text style={styles.cityText}>
            <FontAwesome name="map-marker" size={24} color="black" />
            {weather.name}
          </Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            }}
            contentFit="contain"
            style={styles.weatherPicture}
          />
          <Text style={styles.temperatureText}>{weather.main.temp}°C</Text>
          <Text style={styles.weatherDescription}>
            {weather.weather[0].description}
          </Text>
          <Text style={styles.dateText}>{formattedDate}</Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <FontAwesome name="wind" size={24} color="#666" />
              <Text style={styles.infoValue}>
                {weather.wind?.speed
                  ? (weather.wind.speed * 3.6).toFixed(1)
                  : "—"}{" "}
                км/ч
              </Text>
              <Text style={styles.infoLabel}>Ветер</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome name="tint" size={24} color="#666" />
              <Text style={styles.infoValue}>{weather.main.humidity}%</Text>
              <Text style={styles.infoLabel}>Влажность</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    backgroundColor: "#747474ff",
    width: "100%",
    padding: 20,
  },
  text: {
    color: "#ffffff",
  },
  mainContent: {
    width: "100%",
    padding: 16,
  },
  weatherContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  cityText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  weatherPicture: {
    height: 150,
    width: 150,
    marginBottom: 24,
  },
  temperatureText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
  },
  weatherDescription: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 16,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#2e2e2eff",
    marginVertical: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  infoItem: {
    alignItems: "center",
    flex: 1,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
});