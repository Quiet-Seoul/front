import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import LabeledInputField from "@/components/inputField/LabeledInputField";
import { Caption3, Heading2 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { router, Stack } from "expo-router";
import React from "react";
import {
	Keyboard,
	Pressable,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {};

const login = (props: Props) => {
	const [id, setId] = React.useState<string | undefined>(undefined);
	const [pw, setPw] = React.useState<string | undefined>(undefined);

	const handleIdTextChange = (text: string) => {
		setId(text);
	};

	const handlePwTextChange = (text: string) => {
		setPw(text);
	};

	return (
		<>
			<Stack.Screen
				name="login"
				options={{
					headerLeft: () => (
						<View onTouchEnd={() => router.back()}>
							<ChevronLeft24 />
						</View>
					),
					headerTitle: () => (
						<Heading2 color={Colors.white}>로그인</Heading2>
					),
				}}
			/>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAwareScrollView
					style={styles.container}
					contentContainerStyle={styles.contentcontainer}
				>
					<View>
						<Text style={styles.titleContainer}>한적서울</Text>
					</View>
					<View style={styles.inputFieldContainer}>
						<LabeledInputField
							label="아이디"
							placeholder="ID"
							onChangeText={handleIdTextChange}
						/>
						<LabeledInputField
							label="패스워드"
							placeholder="PW"
							isPassword
							onChangeText={handlePwTextChange}
						/>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton>로그인</PrimaryButton>
					</View>
					<Pressable onPress={() => router.push("/signup")}>
						<Caption3 color={Colors.gray[700]}>
							아직 회원이 아니시라면 →
						</Caption3>
					</Pressable>
				</KeyboardAwareScrollView>
			</TouchableWithoutFeedback>
		</>
	);
};

export default login;

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
	contentcontainer: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		rowGap: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	titleContainer: {
		fontSize: 40,
		fontWeight: 600,
		fontFamily: "Pretendard",
		color: Colors.main[700],
	},
	inputFieldContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
		alignItems: "center",
	},
	buttonContainer: {
		width: 240,
	},
});
