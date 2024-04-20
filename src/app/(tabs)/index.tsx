import { router } from "expo-router";
import { Pressable } from "react-native";
import { Text, View } from "tamagui";
import { Image } from "expo-image";
import colors from "constants/colors";

export default function TabOneScreen() {
  return (
    <View flex={1} alignItems="center" backgroundColor={"$blue1Dark"}>
      <Pressable
        onPress={() => router.push("/scan")}
        style={{ marginTop: 100, elevation: 20, shadowColor: colors.active }}
      >
        <Image
          source={require("../../../assets/images/icon-no-bg.svg")}
          contentFit="fill"
          // @ts-ignore
          style={{
            height: 200,
            width: 200,
          }}
        />
      </Pressable>
    </View>
  );
}
