import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
	variant?: "bold" | "light";
};

const Divider = ({ variant = "light" }: Props) => {
	switch (variant) {
		case "bold":
			return <View style={[styles.divider, { height: 8 }]} />;
		case "light":
			return <View style={[styles.divider, { height: 1 }]} />;
	}
};

export default Divider;

const styles = StyleSheet.create({
	divider: {
		backgroundColor: Colors.gray[100],
	},
});
