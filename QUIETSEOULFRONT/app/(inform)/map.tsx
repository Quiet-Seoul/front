import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import { Heading2 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { Stack, router } from "expo-router";
import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import * as Location from "expo-location";
import { Coordinates } from "@/types/location";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Map = () => {
	const webViewRef = React.useRef<WebView>(null);

	const address = React.useRef<string>("");

	const onMessage = (e: WebViewMessageEvent) => {
		const data = e.nativeEvent.data;

		address.current = data;
	};

	React.useEffect(() => {
		async function sendCurrentLocation() {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				alert("Permission to access location was denied");
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			const coords: Coordinates = {
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			};
			webViewRef.current?.postMessage(JSON.stringify(coords));
		}

		sendCurrentLocation();
	}, []);

	return (
		<>
			<Stack.Screen
				name="map"
				options={{
					headerLeft: () => (
						<View onTouchEnd={() => router.back()}>
							<ChevronLeft24 />
						</View>
					),
					headerTitle: () => (
						<Heading2 color={Colors.white}>지도</Heading2>
					),
				}}
			/>
			<SafeAreaView style={styles.container}>
				<WebView
					ref={webViewRef}
					style={styles.webview}
					source={{
						uri: "https://nextjs-boilerplate-one-ecru-11.vercel.app/map",
						// uri: "http://192.168.0.111:3000/map",
					}}
					onMessage={onMessage}
				/>
				<View style={styles.bottomButtonContainer}>
					<PrimaryButton
						onPress={() => {
							router.back();
							router.setParams({ address: address.current });
						}}
					>
						이곳으로 지정
					</PrimaryButton>
				</View>
			</SafeAreaView>
		</>
	);
};

export default Map;

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		height: windowHeight,
	},
	webview: {
		flex: 1,
		width: windowWidth,
		// height: windowHeight,
	},
	bottomButtonContainer: {
		width: "100%",
		backgroundColor: Colors.white,
		paddingHorizontal: 16,
		paddingVertical: 8,
		position: "absolute",
		// bottom: 0,
		borderTopWidth: 1,
		borderTopColor: Colors.gray[100],
	},
});
