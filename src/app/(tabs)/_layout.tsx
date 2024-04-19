import { Link, Navigator, Slot, router, usePathname } from "expo-router";
import { TabRouter } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { StyleSheet } from "react-native";
import { Button, XStack, View } from "tamagui";
import colors from "constants/colors";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fragment } from "react";

export default function TabLayout() {
  return (
    <Navigator router={TabRouter}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <View flex={1}>
          <Slot />
        </View>
        <Footer />
      </SafeAreaView>
    </Navigator>
  );
}

function Header() {
  const items = [
    {
      icon: "collections",
      label: "Gallery",
      style: {},
      onClick: () => {},
      size: 24,
    },
    {
      icon: "bolt",
      label: "Flash Light",
      style: {},
      onClick: () => {},
      size: 28,
    },
    {
      icon: "flip-camera-ios",
      label: "Flip Camera",
      style: {},
      onClick: () => {},
      size: 24,
    },
  ];
  return (
    <XStack style={styles.headerWrapper}>
      <XStack style={styles.header} backgroundColor={colors.darkBg}>
        {items.map((item, index) => (
          <Button
            p="$1"
            backgroundColor={"$colorTransparent"}
            key={index}
            onPress={item.onClick}
          >
            <Icon color={"white"} size={item.size} name={item.icon as any} />
          </Button>
        ))}
      </XStack>
    </XStack>
  );
}
const scanSize = 50;
function Footer() {
  const pathname = usePathname();

  const links = [
    { label: "Home", href: "/", icon: "home", size: 30 },
    {
      label: "Scan",
      href: "/",
      icon: require("../../../assets/images/icon-no-bg.svg"),
      type: "svg",
      size: scanSize,
      onClick: () => {
        router.push("/scan");
      },
    },
    { label: "Home", href: "/", icon: "history", size: 30 },
  ];

  return (
    <XStack style={styles.footerWrapper}>
      <XStack style={styles.footer} backgroundColor={colors.darkBg}>
        {links.map((item, i) => (
          <Fragment key={i}>
            {item.type === "svg" ? (
              <Button
                onPress={item.onClick}
                style={styles.scanBtn}
                borderColor={colors.primary}
              >
                <Image
                  source={item.icon}
                  style={{ width: item.size, height: item.size }}
                  contentFit={"contain"}
                />
              </Button>
            ) : (
              <Link href={item.href as any}>
                <Icon
                  color={"white"}
                  name={item.icon as any}
                  size={item.size}
                />
              </Link>
            )}
          </Fragment>
        ))}
      </XStack>
    </XStack>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    paddingTop: 5,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 30,
    paddingVertical: 5,
    maxWidth: 300,
    width: "100%",
  },

  footerWrapper: {
    paddingBottom: 10,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },

  scanBtn: {
    position: "absolute",
    left: "50%",
    top: -(scanSize / 2) - 10,
    transform: [{ translateX: -(scanSize / 2) + 10 }],
    backgroundColor: colors.primary,
    height: "auto",
    width: "auto",
    borderRadius: 100,
    padding: 13,
    elevation: 10,
    shadowColor: colors.primary,

    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  footer: {
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 300,
    width: "100%",
    paddingHorizontal: 20,
    borderRadius: 50,
    paddingVertical: 13,
  },
});
