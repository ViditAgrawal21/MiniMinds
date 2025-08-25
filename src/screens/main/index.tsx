import { NavigationContainer } from "@react-navigation/native";
import Layout from "./_layout";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function Index() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Layout />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
