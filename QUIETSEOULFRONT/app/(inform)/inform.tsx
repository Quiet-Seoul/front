import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import RadioButton, { RadioProvider } from "@/components/buttons/RadioButton";
import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import InputField from "@/components/inputField/InputField";
import TextBox from "@/components/inputField/TextBox";
import { Heading2, Heading4 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { fetchSubmitSuggestion } from "@/data/suggestions";
import { Coordinates } from "@/types/location";
import { SuggestionSubmitData } from "@/types/suggestions";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
	Dimensions,
} from "react-native";

const Inform = () => {
	const { address, latitude, longitude } = useLocalSearchParams();

	const placeName = React.useRef<string>();
	const placeType = React.useRef<string>();
	const description = React.useRef<string>();

	const handleSuggestionSubmit = () => {
		const getJwt = async () => {
			return await AsyncStorage.getItem("jwt").then((res) => {
				if (res) return res;
			});
		};

		getJwt().then((res) => {
			const jwt = res;

			if (jwt) {
				const suggestionData: SuggestionSubmitData = {
					placeName: "",
					category: "",
					description: "",
					address: "",
					latitude: 0,
					longitude: 0,
				};

				if (placeName.current) {
					suggestionData.placeName = placeName.current;
				} else {
					alert("장소를 입력해주세요");
					return;
				}

				if (placeType.current) {
					suggestionData.category = placeType.current;
				} else {
					alert("종류를 입력해주세요");
					return;
				}

				if (description.current) {
					suggestionData.description = description.current;
				} else {
					alert("설명을 입력해주세요");
					return;
				}

				if (address) {
					suggestionData.address = address.toString();
				} else {
					alert("위치를 입력해주세요");
					return;
				}

				if (latitude) {
					suggestionData.latitude = +latitude.toString();
				} else {
					alert("위치를 입력해주세요");
					return;
				}

				if (longitude) {
					suggestionData.longitude = +longitude.toString();
				} else {
					alert("위치를 입력해주세요");
					return;
				}

				const submitSuggestion = async () => {
					const result = await fetchSubmitSuggestion(
						suggestionData,
						jwt
					);

					alert(
						`${result.name}(이)가 등록되었습니다. 관리자 승인까지 시간이 소요될 수 있습니다.`
					);
					router.push("/");
				};

				submitSuggestion();
			}
		});
	};

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
						height: Dimensions.get("window").height - 80,
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
							<InputField
								onChangeText={(text) =>
									(placeName.current = text)
								}
							/>
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
								<RadioButton
									text="공원"
									value="공원"
									onSelect={(val) =>
										(placeType.current = val)
									}
								/>
								<RadioButton
									text="카페"
									value="카페"
									onSelect={(val) =>
										(placeType.current = val)
									}
								/>
								<RadioButton
									text="식당"
									value="식당"
									onSelect={(val) =>
										(placeType.current = val)
									}
								/>
								<RadioButton
									text="기타"
									value="기타"
									onSelect={(val) =>
										(placeType.current = val)
									}
								/>
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
								onPress={() =>
									router.push({
										pathname: "./map",
										params: { latitude: 0, longitude: 0 },
									})
								}
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
						<TextBox
							onChangeText={(text) =>
								(description.current = text)
							}
						/>
					</View>
					<View style={styles.bottomButtonContainer}>
						<PrimaryButton onPress={handleSuggestionSubmit}>
							제보 등록하기
						</PrimaryButton>
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
