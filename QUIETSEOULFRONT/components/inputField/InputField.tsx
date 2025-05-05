import { Colors } from "@/constants/Colors";
import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type Props = {
	placeholder?: string;
	readonly?: boolean;
	value?: string;
	onChangeText?: (text: string) => void;
};

const InputField = ({
	placeholder = "내용을 적어주세요",
	readonly = false,
	value,
	onChangeText,
}: Props) => {
	return (
		<TextInput
			style={{
				width: "auto",
				padding: 8,
				borderBottomWidth: 1,
				borderBottomColor: Colors.gray[200],
			}}
			placeholder={placeholder}
			readOnly={readonly}
			value={value}
			onChangeText={onChangeText}
		/>
	);
};

export default InputField;
