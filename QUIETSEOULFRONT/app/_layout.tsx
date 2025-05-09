import { Colors } from "@/constants/Colors";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StatusBar style="light" />
			<BottomSheetModalProvider>
				<Stack
					screenOptions={{
						headerStyle: {
							backgroundColor: Colors.main[700],
						},
						contentStyle: {
							backgroundColor: Colors.white,
							// height: 40,
						},
					}}
				/>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
