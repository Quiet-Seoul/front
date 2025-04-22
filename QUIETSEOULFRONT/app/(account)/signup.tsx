import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import LabeledDateInputField from "@/components/inputField/LabeledDateInputField";
import LabeledInputField from "@/components/inputField/LabeledInputField";
import LabeledPhoneInputField from "@/components/inputField/LabeledPhoneInputField";
import { Caption3, Heading1, Heading2 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { Stack, router } from "expo-router";
import React from "react";
import {
	Keyboard,
	Pressable,
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {};

const signup = (props: Props) => {
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
						<Heading2 color={Colors.white}>회원가입</Heading2>
					),
				}}
			/>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAwareScrollView
					contentContainerStyle={styles.contentcontainer}
				>
					<View style={styles.titleContainer}>
						<Heading1 color={Colors.main[700]}>회원가입</Heading1>
					</View>
					<LabeledInputField label="닉네임" placeholder="Username" />
					<LabeledInputField label="아이디" placeholder="ID" />
					<LabeledInputField
						label="패스워드"
						placeholder="PW"
						isPassword
					/>
					<LabeledInputField
						label="패스워드 확인"
						placeholder="PW"
						isPassword
					/>
					<LabeledInputField label="패스워드" placeholder="PW" />
					<LabeledPhoneInputField placeholder="Phone number" />
					<LabeledDateInputField />
					<View style={styles.buttonContainer}>
						<PrimaryButton>등록하기</PrimaryButton>
					</View>
				</KeyboardAwareScrollView>
			</TouchableWithoutFeedback>
		</>
	);
};

export default signup;

const styles = StyleSheet.create({
	contentcontainer: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		rowGap: 24,
		justifyContent: "center",
		alignItems: "center",
	},
	titleContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
	buttonContainer: {
		width: 240,
		backgroundColor: "#FF0000",
		zIndex: 0,
	},
});
