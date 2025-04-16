import { Colors } from "@/constants/Colors";
import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type Props = {
	placeholder?: string;
};

const InputField = ({ placeholder = "내용을 적어주세요" }: Props) => {
	return (
		<TextInput
			style={{
				width: "auto",
				padding: 8,
				borderBottomWidth: 1,
				borderBottomColor: Colors.gray[200],
			}}
			placeholder={placeholder}
		/>
	);
};

export default InputField;
