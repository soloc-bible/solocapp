import { Stack } from "expo-router";
import { ThemeProvider } from "@/context/theme.context";
export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index" />
      </Stack>
    </ThemeProvider>
  )
}
