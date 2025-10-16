import axios from "axios";

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility?: number;
  wind?: {
    speed?: number;
    deg?: number;
    gust?: number;
  };
  rain?: {
    "1h"?: number;
    [key: string]: number | undefined;
  };
  clouds?: {
    all?: number;
  };
  dt?: number;
  sys?: {
    type?: number;
    id?: number;
    country?: string;
    sunrise?: number;
    sunset?: number;
  };
  timezone?: number;
  id?: number;
  name?: string;
  cod?: number;
}

export const getWeather = async (
  latitude: number,
  longitude: number,
  API_KEY: string
): Promise<WeatherData> => {
  const response = await axios.get<WeatherData>(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        units: "metric",
        lang: "ru",
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
      },
    }
  );
  return response.data;
};