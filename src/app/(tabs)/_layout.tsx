import { Tabs, router } from "expo-router";
import Icon from "@expo/vector-icons/MaterialIcons";
import colors from "constants/colors";
import { useEffect } from "react";

export default function TabLayout() {
  // useEffect(() => {
  //   router.push("/scan");
  // }, []);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.active,
        headerStyle: {
          backgroundColor: colors.glassDark,
        },
        headerTitleStyle: {
          color: "white"
        },
        tabBarStyle: {
          backgroundColor: colors.glassDark,
          height: 60,
          paddingTop: 5,
          paddingBottom: 8,
          borderColor: colors.glassDark,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="home" color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="qr-code" color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
