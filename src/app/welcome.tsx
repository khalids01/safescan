import { IMAGES } from "constants/images";
import { View, Text } from "tamagui";
import { Image } from "expo-image";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj";
export default function ModalScreen() {
  console.log(IMAGES.welcome.top);
  const images = {
    welcomeTop: require("../../assets/images/svg/welcome-top.svg"),
    // Add other images as needed
  };
  return (
    <View>
      <Image
        source={images.welcomeTop}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
        style={{
          height: 210,
          width: "100%",
        }}
      />
      <Text>Welcome</Text>
    </View>
  );
}
