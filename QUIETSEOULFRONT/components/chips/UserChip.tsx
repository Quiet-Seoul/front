import React from "react";
import { Pressable, StyleSheet } from "react-native";
import User from "../icons/User";
import { Body5 } from "../text/Text";
import { Colors } from "@/constants/Colors";

type Props = {
	userName: string;
};

const UserChip = ({ userName }: Props) => {
	return (
		<Pressable style={styles.container}>
			<User />
			<Body5 color={Colors.white}>{userName}</Body5>
		</Pressable>
	);
};

export default UserChip;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.main[500],
		borderRadius: 4,
		padding: 4,
		display: "flex",
		flexDirection: "row",
		columnGap: 4,
	},
});
