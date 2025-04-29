import { Colors } from "@/constants/Colors";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Caption1 } from "../text/Text";

type Props = {
	text: string;
};

const RoundChip = ({ text }: Props) => {
	return (
		<Pressable style={styles.container}>
			<Caption1 color={Colors.white}>{text}</Caption1>
		</Pressable>
	);
};

export default RoundChip;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderWidth: 1,
		borderRadius: 100,
		borderColor: Colors.main[300],
		backgroundColor: Colors.main[200],
	},
});
