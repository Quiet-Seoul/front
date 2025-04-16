import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import { Heading2 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const router = useRouter();

	const [fontsLoaded] = useFonts({
		Pretendard: require("../assets/fonts/PretendardVariable.ttf"),
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
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<Stack
					screenOptions={{
						headerShown: true,
						headerStyle: {
							backgroundColor: Colors.main[700],
						},
					}}
				>
					<Stack.Screen
						name="index"
						options={{
							headerTitle: () => (
								<Heading2 style={{ color: Colors.white }}>
									한적서울
								</Heading2>
							),
							headerRight: () => (
								<View onTouchEnd={() => router.push("/inform")}>
									<Heading2 style={{ color: Colors.white }}>
										📢 제보하기
									</Heading2>
								</View>
							),
						}}
					/>
					<Stack.Screen
						name="inform/index"
						options={{
							headerLeft: () => <ChevronLeft24 />,
							headerTitle: () => (
								<Heading2 style={{ color: Colors.white }}>
									제보하기
								</Heading2>
							),
						}}
					/>
				</Stack>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
