import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { isAuthenticated } = useAuth(); // Check if user is logged in

  return isAuthenticated ? <Redirect href="/(tabs)/matching" /> : <Redirect href="/signInScreen" />;
}