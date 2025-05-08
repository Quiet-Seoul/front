export default () => ({
  expo: {
    name: "한적서울",
    slug: "QUIETSEOULFRONT",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    icon: "./assets/images/quietseoullogo.png",
    splash: {
      image: "./assets/images/quietseoullogo.png",
      imageWidth: 200,
      resizeMode: "contain",
      backgroundColor: "#3b8d55",
    },
    updates: {
      enabled: false,
      checkAutomatically: "ON_LOAD",
      fallbackToCacheTimeout: 0,
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
        backgroundColor: "#3b8d55",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      bundler: "webpack",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-font",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#3b8d55",
          image: "./assets/images/quietseoullogo.png",
          imageResizeMode: "contain",
          imageWidth: 200,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "60a390b1-9c0d-4100-817f-b47797ced81d", // 그대로 유지
      },
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
      EXPO_PUBLIC_IMAGE_PLACEHOLDER: process.env.EXPO_PUBLIC_IMAGE_PLACEHOLDER,
    },
    owner: "xaexix", // Expo 계정명
  },
});
