import { Heading2, Heading3 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

type Props = {};

const layout = (props: Props) => {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: {
					backgroundColor: Colors.main[700],
				},
			}}
		></Stack>
	);
};

export default layout;
