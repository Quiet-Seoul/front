import React from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import type { PressableProps } from "react-native";
import { Heading3 } from "../text/Text";
import { Colors } from "@/constants/Colors";

interface Props {
	props?: PressableProps;
	children: React.ReactNode;
	enabled?: boolean;
	onPress?: () => void;
}

export function PrimaryButton({
	children,
	props,
	enabled = true,
	onPress,
}: Props) {
	const [isActive, setIsActive] = React.useState(false);

	return (
		<Pressable
			{...props}
			style={[
				enabled
					? isActive
						? styles.active
						: styles.default
					: styles.disabled,
				{
					borderRadius: 8,
					paddingVertical: 14,
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
				},
			]}
			onTouchStart={() => setIsActive(true)}
			onTouchEnd={() => setIsActive(false)}
			onPress={onPress}
			disabled={!enabled}
		>
			<Heading3 color={Colors.white}>{children}</Heading3>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	default: {
		backgroundColor: Colors.main[700],
	},
	active: {
		backgroundColor: Colors.main[800],
	},
	disabled: {
		backgroundColor: Colors.gray[200],
	},
});
