import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Caption1 } from "../text/Text";

type Props = {
	label: string;
	placeholder?: string;
	isPassword?: boolean;
	onChangeText?: (value: string) => void;
};

const LabeledInputField = ({
	label,
	placeholder,
	isPassword = false,
	onChangeText,
}: Props) => {
	return (
		<View style={styles.container}>
			<Caption1 color={Colors.gray[900]}>{label}</Caption1>
			<TextInput
				style={[styles.inputField, styles.b3]}
				placeholder={placeholder}
				secureTextEntry={isPassword}
				onChangeText={onChangeText}
			/>
		</View>
	);
};

export default LabeledInputField;

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
	},
	b3: {
		fontSize: 14,
		fontWeight: 500,
		fontFamily: "Pretendard",
		color: Colors.gray[800],
	},
});
