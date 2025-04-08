import React from "react";
import { Pressable, StyleSheet } from "react-native";
import type { PressableProps } from "react-native";
import { Heading3 } from "../Text";
import { Colors } from "@/constants/Colors";

interface Props {
	props?: PressableProps;
	children: React.ReactNode;
	enabled?: boolean;
	onPress?: () => void;
}

export function SecondaryButton({
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
					paddingVertical: 11,
					borderWidth: 1,
				},
			]}
			onTouchStart={() => setIsActive(true)}
			onTouchEnd={() => setIsActive(false)}
			onPress={onPress}
			disabled={!enabled}
		>
			<Heading3
				style={{
					color: enabled ? Colors.main[800] : Colors.gray[300],
					textAlign: "center",
				}}
			>
				{children}
			</Heading3>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	default: {
		backgroundColor: Colors.white,
		borderColor: Colors.main[100],
	},
	active: {
		backgroundColor: Colors.main[100],
		borderColor: Colors.main[300],
	},
	disabled: {
		backgroundColor: Colors.white,
		borderColor: Colors.gray[200],
	},
});
