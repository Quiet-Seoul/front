import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import { Heading2 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { Stack, router } from "expo-router";
import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";

type Props = {};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Termsofuse = (props: Props) => {
	return (
		<>
			<Stack.Screen
				name="signup"
				options={{
					headerLeft: () => (
						<View onTouchEnd={() => router.back()}>
							<ChevronLeft24 />
						</View>
					),
					headerTitle: () => (
						<Heading2 color={Colors.white}>이용약관</Heading2>
					),
				}}
			/>
			<SafeAreaView style={styles.container}>
				<WebView
					style={styles.webview}
					// render 배포 후 바꾸기
					source={{ uri: "http://10.0.2.2:3000/termsofuse" }}
				/>
			</SafeAreaView>
		</>
	);
};

export default Termsofuse;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
	},
	webview: {
		flex: 1,
		width: windowWidth,
		height: windowHeight,
	},
});
