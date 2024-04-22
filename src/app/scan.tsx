import { View, Text, Button, XStack, YStack } from "tamagui";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Link } from "expo-router";
import { Fragment } from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import colors from "constants/colors";

function Header({
  toggleCamera,
  toggleFlash,
}: {
  toggleCamera: () => void;
  toggleFlash: () => void;
}) {
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
      onClick: toggleFlash,
      size: 28,
    },
    {
      icon: "flip-camera-ios",
      label: "Flip Camera",
      style: {},
      onClick: toggleCamera,
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
function Footer({
  takePicture,
  clearImage,
  image = undefined,
}: {
  takePicture: () => void;
  clearImage: () => void;
  image?: string;
}) {
  const links = [
    { label: "Home", href: "/", icon: "home", size: 30 },
    {
      label: "Scan",
      icon: require("../../assets/images/icon-no-bg.svg"),
      type: "svg",
      size: scanSize,
      href: "",
      show: !image,
      onClick: () => {
        takePicture();
      },
    },
    {
      label: "Scan",
      href: "",
      icon: "close",
      type: "icon",
      size: 40,
      show: !!image && image?.toString().length > 0,
      onClick: () => {
        clearImage();
      },
    },
    { label: "Home", href: "/", icon: "history", size: 30 },
  ];

  return (
    <XStack style={styles.footerWrapper}>
      <XStack style={styles.footer} backgroundColor={colors.darkBg}>
        {links.map((item, i) => (
          <Fragment key={i}>
            {String(item?.href)?.length > 0 ? (
              <Link href={item.href as any}>
                <Icon
                  color={"white"}
                  name={item.icon as any}
                  size={item.size}
                />
              </Link>
            ) : (
              <>
                {item?.show && (
                  <Button
                    onPress={item.onClick}
                    style={styles.scanBtn}
                    borderColor={colors.primary}
                  >
                    {item.type === "svg" ? (
                      <Image
                        source={item.icon}
                        style={{ width: item.size, height: item.size }}
                        contentFit={"contain"}
                      />
                    ) : (
                      <Icon
                        style={{ marginLeft: 3, marginTop: 3 }}
                        name={item.icon as any}
                        size={item.size}
                      />
                    )}
                  </Button>
                )}
              </>
            )}
          </Fragment>
        ))}
      </XStack>
    </XStack>
  );
}

const Scan = () => {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(false);
  const [image, setImage] = useState<{
    height: number;
    width: number;
    uri: string;
  } | null>(null);
  //   @ts-ignore
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();

      const cameraStatus = await Camera.requestCameraPermissionsAsync();

      setHasPermission(cameraStatus.status === "granted");
    })();
  }, []);

  function toggleCamera() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function toggleFlash() {
    setFlash((current: any) =>
      // @ts-ignore
      current === Camera.Constants.FlashMode.off
        ? // @ts-ignore
          Camera.Constants.FlashMode.on
        : // @ts-ignore
          Camera.Constants.FlashMode.off
    );
  }

  const takePicture = async () => {
    if (!!cameraRef) {
      try {
        const data = await cameraRef?.current?.takePictureAsync();
        setImage(data!);
      } catch (error) {
        console.log("Camera Take Picture error: ", error);
      }
    }
  };

  if (!hasPermission) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center">
        <Text>No Access to Camera</Text>
      </YStack>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <View style={styles.container}>
        <Header toggleFlash={toggleFlash} toggleCamera={toggleCamera} />
        {!!image?.uri ? (
          <XStack justifyContent="center">
            <Image
              style={{
                height: image.height,
                width: image.width,
                maxHeight: "100%",
                maxWidth: "100%",
              }}
              source={image.uri}
            />
          </XStack>
        ) : (
          <Camera
            ref={cameraRef}
            focusable
            flashMode={flash}
            style={styles.camera}
            type={type}
          ></Camera>
        )}
        <Footer
          image={image?.uri}
          clearImage={() => setImage(null)}
          takePicture={takePicture}
        />
      </View>
    </SafeAreaView>
  );
};

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  headerWrapper: {
    paddingTop: 5,
    position: "absolute",
    top: 40,
    left: 0,
    zIndex: 10,
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
    position: "absolute",
    left: 0,
    bottom: 10,
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
