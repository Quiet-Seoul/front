import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import { Heading2 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const router = useRouter();

	const [fontsLoaded] = useFonts({
		Pretendard: require("../assets/fonts/PretendardVariable.ttf"),
		"Pretendard-Light": require("../assets/fonts/Pretendard-Light.otf"),
		"Pretendard-Black": require("../assets/fonts/Pretendard-Black.otf"),
		"Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
		"Pretendard-ExtraBold": require("../assets/fonts/Pretendard-ExtraBold.otf"),
		"Pretendard-Thin": require("../assets/fonts/Pretendard-Thin.otf"),
		"Pretendard-ExtraLight": require("../assets/fonts/Pretendard-ExtraLight.otf"),
		"Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.otf"),
		"Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
		"Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.otf"),
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<GestureHandlerRootView>
			<BottomSheetModalProvider>
				<Stack
					screenOptions={{
						headerShown: true,
						headerStyle: {
							backgroundColor: Colors.main[700],
						},
						contentStyle: {
							backgroundColor: Colors.white,
						},
					}}
				/>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
