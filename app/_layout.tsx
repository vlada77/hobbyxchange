import { Stack } from 'expo-router';
import { useAuth } from '@/hooks/useAuth'; // Assuming you have a custom hook for auth state

export default function RootLayout() {
  const { isAuthenticated } = useAuth(); // Custom hook to check if the user is authenticated

  return (
    <Stack>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="signInScreen" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}