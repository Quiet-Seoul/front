import { Colors } from "@/constants/Colors";
import React from "react";
import { Caption1 } from "../text/Text";
import { View } from "react-native";

const FromUserChip = () => {
	return (
		<View
			style={{
				display: "flex",
				alignItems: "center",
				borderWidth: 1,
				borderColor: Colors.gray[400],
				borderRadius: 4,
				padding: 4,
			}}
		>
			<Caption1 style={{ color: Colors.gray[500] }}>사용자 제보</Caption1>
		</View>
	);
};

export default FromUserChip;
