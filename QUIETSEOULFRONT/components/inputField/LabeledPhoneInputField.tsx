import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Caption1 } from "../text/Text";

type Props = {
	placeholder?: string;
	isPassword?: boolean;
	onChangeText?: (value: string) => void;
};

const LabeledPhoneInputField = ({
	placeholder,
	isPassword = false,
	onChangeText,
}: Props) => {
	const [phoneNum, setPhoneNum] = React.useState<string | undefined>(
		undefined
	);

	const handleTextChange = (num: string) => {
		onChangeText?.(num);
		setPhoneNum(
			num
				.replace(/[^0-9.]/g, "")
				.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
				.replace(/(-{1,2})$/g, "")
		);
	};

	return (
		<View style={styles.container}>
			<Caption1 color={Colors.gray[900]}>휴대폰 번호</Caption1>
			<TextInput
				style={[styles.inputField, styles.b3]}
				placeholder={placeholder}
				secureTextEntry={isPassword}
				onChangeText={handleTextChange}
				keyboardType="number-pad"
				value={phoneNum}
			/>
		</View>
	);
};

export default LabeledPhoneInputField;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		rowGap: 4,
	},
	inputField: {
		width: 240,
		padding: 8,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: Colors.gray[200],
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	b3: {
		fontSize: 14,
		fontWeight: 500,
		fontFamily: "Pretendard",
		color: Colors.gray[800],
	},
});
