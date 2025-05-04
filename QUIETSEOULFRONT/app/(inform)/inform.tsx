import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import RadioButton, { RadioProvider } from "@/components/buttons/RadioButton";
import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import InputField from "@/components/inputField/InputField";
import TextBox from "@/components/inputField/TextBox";
import { Heading2, Heading4 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	SafeAreaView,
	Pressable,
	Button,
} from "react-native";

const Inform = () => {
	const { address } = useLocalSearchParams();

	return (
		<SafeAreaView>
			<Stack.Screen
				name="inform"
				options={{
					headerLeft: () => (
						<View onTouchEnd={() => router.back()}>
							<ChevronLeft24 />
						</View>
					),
					headerTitle: () => (
						<Heading2 color={Colors.white}>제보하기</Heading2>
					),
				}}
			/>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View
					style={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
						rowGap: 16,
						paddingTop: 16,
					}}
				>
					<View style={styles.row}>
						<View
							style={{
								width: 40,
							}}
						>
							<Heading4>장소</Heading4>
						</View>
						<View style={{ flex: 1 }}>
							<InputField />
						</View>
					</View>
					<View style={styles.row}>
						<View
							style={{
								width: 40,
							}}
						>
							<Heading4>종류</Heading4>
						</View>
						<View
							style={{
								flex: 1,
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								padding: 8,
								columnGap: 8,
							}}
						>
							<RadioProvider>
								<RadioButton text="공원" value="park" />
								<RadioButton text="카페" value="cafe" />
								<RadioButton text="식당" value="restaurant" />
							</RadioProvider>
						</View>
					</View>
					<View style={styles.row}>
						<View
							style={{
								width: 40,
							}}
						>
							<Heading4>위치</Heading4>
						</View>
						<View
							style={{
								flex: 1,
								display: "flex",
								flexDirection: "row",
								columnGap: 16,
							}}
						>
							<View
								style={{
									flex: 1,
								}}
							>
								<InputField
									readonly
									placeholder="지도에서 위치를 검색해주세요"
									value={address?.toString() || undefined}
								/>
							</View>
							<Button
								title="지도"
								onPress={() => router.push("./map")}
								color={Colors.main[500]}
							/>
						</View>
					</View>
					<View
						style={{
							display: "flex",
							flexDirection: "column",
							rowGap: 16,
							paddingHorizontal: 16,
						}}
					>
						<Heading2>설명</Heading2>
						<TextBox />
					</View>
					<View style={styles.bottomButtonContainer}>
						<PrimaryButton>후기 남기기</PrimaryButton>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default Inform;

const styles = StyleSheet.create({
	row: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		columnGap: 16,
		paddingHorizontal: 16,
	},
	bottomButtonContainer: {
		width: "100%",
		backgroundColor: Colors.white,
		paddingHorizontal: 16,
		paddingVertical: 8,
		position: "absolute",
		bottom: 0,
		borderTopWidth: 1,
		borderTopColor: Colors.gray[100],
	},
});
