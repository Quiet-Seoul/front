import React from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import type { PressableProps } from "react-native";
import { Heading3 } from "../text/Text";
import { Colors } from "@/constants/Colors";

interface Props extends PressableProps {
	children: React.ReactNode;
	enabled?: boolean;
	onPress?: () => void;
}

export function PrimaryButton({
	children,
	enabled = true,
	onPress,
	...pressableProps
}: Props) {
	const [isActive, setIsActive] = React.useState(false);

	return (
		<Pressable
			{...pressableProps}
			style={[
				enabled
					? isActive
						? styles.active
						: styles.default
					: styles.disabled,
				styles.base,
			]}
			onPressIn={() => setIsActive(true)}
			onPressOut={() => setIsActive(false)}
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
	base: {
		borderRadius: 8,
		paddingVertical: 14,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
});
