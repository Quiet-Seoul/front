export default () => ({
  expo: {
    name: "한적서울",
    slug: "QUIETSEOULFRONT",
    version: "1.0.3",
    orientation: "portrait",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    icon: "./assets/images/quietseoullogo.png",

    platforms: ["ios", "android", "web"],

    splash: {
      image: "./assets/images/quietseoullogo.png",
      imageWidth: 200,
      resizeMode: "contain",
      backgroundColor: "#FFFFFF",
    },

    assetBundlePatterns: ["**/*"],

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.gunyange.QUIETSEOULFRONT",
    },

    android: {
      package: "com.gunyange.QUIETSEOULFRONT",
      adaptiveIcon: {
        foregroundImage: "./assets/images/quietseoullogo.png",
        backgroundColor: "#FFFFFF",
      },
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    plugins: [
      "expo-router",
      "expo-font",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#FFFFFF",
          image: "./assets/images/quietseoullogo.png",
          imageResizeMode: "contain",
          imageWidth: 200,
        },
      ],
    ],

    experiments: {
      typedRoutes: false,
    },

    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "60a390b1-9c0d-4100-817f-b47797ced81d",
      },
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
      EXPO_PUBLIC_IMAGE_PLACEHOLDER: process.env.EXPO_PUBLIC_IMAGE_PLACEHOLDER,
    },

    owner: "xaexix",
  },
});
