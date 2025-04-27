import { Colors } from "@/constants/Colors";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

type Props = {
	placeholder?: string;
	readonly?: boolean;
	value?: string;
	onChangeText?: (text: string) => void;
};

const TextBox = ({
	placeholder = "내용을 적어주세요",
	readonly = false,
	value,
	onChangeText,
}: Props) => {
	return (
		<TextInput
			multiline
			style={[styles.textbox, styles.b3]}
			placeholder={placeholder}
			readOnly={readonly}
			value={value}
			numberOfLines={8}
			verticalAlign="top"
			textAlignVertical="top"
			onChangeText={onChangeText}
		/>
	);
};

export default TextBox;

const styles = StyleSheet.create({
	textbox: {
		width: "100%",
		height: 160,
		padding: 12,
		borderWidth: 1,
		borderColor: Colors.gray[200],
		borderRadius: 8,
	},
	b3: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: 500,
		fontFamily: "Pretendard",
		color: Colors.gray[800],
	},
});
