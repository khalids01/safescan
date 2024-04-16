import { Link, Tabs,  } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "tamagui";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <Text>Hello!</Text>,
          headerRight: () => (
            <Link href="/welcome" asChild>
              <Pressable>
                <Text>Hello!</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
    
    </Tabs>
  );
}
