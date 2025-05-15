// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { initDatabase } from '../lib/db';

export default function RootLayout() {
  useEffect(() => {
    initDatabase().catch(err => {
      console.error('資料庫初始化失敗：', err);
    });
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
