import { Stack } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from "react";
import { Text } from 'react-native';

export default function RootLayout() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  console.log(isAuthenticated);

  useEffect(() => {
    if (isAuthenticated !== null) {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <Text>Loading...</Text>
    );
  }

  return (
    <Stack screenOptions={{
      headerBackTitle: "Back", // 👈 Default back title for all screens
    }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="signInScreen" options={{ headerShown: false }} />

      )}
      <Stack.Screen name="+not-found" />

    </Stack>
  );
}