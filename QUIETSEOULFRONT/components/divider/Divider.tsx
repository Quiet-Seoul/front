import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
	variant?: "bold" | "light";
};

const Divider = ({ variant = "light" }: Props) => {
	switch (variant) {
		case "bold":
			return <View style={[styles.bold, { height: 8 }]} />;
		case "light":
			return <View style={[styles.light, { height: 1 }]} />;
	}
};

export default Divider;

const styles = StyleSheet.create({
	bold: {
		backgroundColor: Colors.gray[50],
		height: 8,
	},
	light: {
		backgroundColor: Colors.gray[100],
		height: 1,
	},
});
