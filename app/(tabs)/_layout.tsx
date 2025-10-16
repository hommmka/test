import { Tabs } from 'expo-router';
import React from 'react';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
        tabBarStyle: { backgroundColor: '#3b3b3bff' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Погода',
          tabBarIcon: () => <FontAwesome name="cloud" size={24} color={"white"} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Чат',
          tabBarIcon: () => <Ionicons name="chatbubbles-sharp" size={24} color={"white"} />,
        }}
      />
    </Tabs>
  );
}
