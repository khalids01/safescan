import { View, Text, Stack, Button, H3 } from "tamagui";
import { Image } from "expo-image";
import COLORS from "constants/colors";
import { blurhash } from "constants/images";
import Icon from "@expo/vector-icons/FontAwesome6";
import { StyleSheet } from "react-native";
import { useFirstLoad } from "store/firstLoad";
import { router } from "expo-router";

export default function Welcome() {
  const images = {
    welcomeTop: {
      src: require("../../assets/images/svg/welcome-top.svg"),
      height: 210,
      width: "100%",
      style: {
        ...styles.shadow,
        shadowColor: "black",
      },
    },
    welcomeHero: {
      src: require("../../assets/images/svg/welcome-hero.svg"),
      height: 200,
      width: 200,
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
      },
      comment: {
        title: "Get Started",
        description: "Scan The Products to check how safe they are",
      },
    },
    welcomeBottom: {
      src: require("../../assets/images/svg/welcome-bottom.svg"),
      height: 200,
      width: "100%",
      styles: {
        ...styles.shadow,
        shadowColor: "black",
      },
    },
    // Add other images as needed
  };
  const { setFirstLoad } = useFirstLoad();
  const onNext = () => {
    setFirstLoad(false);
    router.push("/");
  };

  return (
    <Stack
      justifyContent="space-between"
      alignItems="stretch"
      position="relative"
      h={"100%"}
      backgroundColor={COLORS.primary}
    >
      {Object.values(images).map(
        // @ts-ignore
        ({ height, width, src, style = {}, comment = {} }, i) => (
          // @ts-ignore
          <View
            shadowColor={"black"}
            shadowOffset={{ width: 20, height: 10 }}
            shadowOpacity={1}
            shadowRadius={10}
            key={i}
            style={{
              ...style,
            }}
          >
            <Image
              source={src}
              placeholder={blurhash}
              contentFit="fill"
              // @ts-ignore
              style={{
                height: height as any,
                width: width as any,
              }}
            />
            {Object.keys(comment)?.length > 0 && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <H3>{comment?.title}</H3>
                <Text>{comment?.description}</Text>
              </View>
            )}
          </View>
        )
      )}
      <Button
        onPress={onNext}
        size={"$5"}
        backgroundColor={COLORS.primary}
        style={{
          ...styles.button,
          ...styles.shadow,
        }}
      >
        <Icon
          style={{ color: "white", fontSize: 22 }}
          name="arrow-right-long"
        />
      </Button>
    </Stack>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    shadowColor: COLORS.primary,
  },
  button: {
    position: "absolute",
    bottom: 50,
    right: 50,
    height: 60,
    width: 60,
    padding: 0,
    borderRadius: 100,
  },
});
