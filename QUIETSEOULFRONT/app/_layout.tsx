import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import { Heading2 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Pressable } from "react-native";
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
				>
					<Stack.Screen
						name="index"
						options={{
							headerTitle: () => (
								<Heading2 color={Colors.white}>
									한적서울
								</Heading2>
							),
							headerRight: () => (
								<Pressable
									onTouchEnd={() => router.push("/inform")}
								>
									<Heading2 color={Colors.white}>
										📢 제보하기
									</Heading2>
								</Pressable>
							),
						}}
					/>
					<Stack.Screen
						name="inform"
						options={{
							headerLeft: () => (
								<Pressable onTouchEnd={() => router.back()}>
									<ChevronLeft24 />
								</Pressable>
							),
							headerTitle: () => (
								<Heading2 color={Colors.white}>
									제보하기
								</Heading2>
							),
						}}
					/>
					<Stack.Screen
						name="quietplaces"
						options={{
							headerLeft: () => (
								<Pressable onTouchEnd={() => router.back()}>
									<ChevronLeft24 />
								</Pressable>
							),
							headerTitle: () => (
								<Heading2 color={Colors.white}>
									한적한 장소
								</Heading2>
							),
						}}
					/>
					<Stack.Screen
						name="cities"
						options={{
							headerLeft: () => (
								<Pressable onTouchEnd={() => router.back()}>
									<ChevronLeft24 />
								</Pressable>
							),
							headerTitle: () => (
								<Heading2 color={Colors.white}>
									한적한 지역
								</Heading2>
							),
						}}
					/>
				</Stack>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
