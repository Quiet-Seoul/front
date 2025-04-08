import React, { createContext, useContext } from "react";
import { Pressable, StyleSheet } from "react-native";
import type { PressableProps } from "react-native";
import { Heading3 } from "../Text";
import { Colors } from "@/constants/Colors";

import { View, ViewStyle } from "react-native";

// ChipButtonGroup

interface ChipGroupProps {
	selected?: string;
	children: React.ReactNode;
	onSelected?: (selected: string) => void;
	containerStyle?: ViewStyle;
}

type ContextProps = Omit<ChipGroupProps, "children" | "containerStyle">;
export const ChipGroupContext = createContext<ContextProps>({});

const ChipButtonGroup = ({
	selected,
	children,
	onSelected,
	containerStyle,
}: ChipGroupProps) => {
	const { Provider } = ChipGroupContext;

	return (
		<Provider
			value={{
				onSelected,
				selected,
			}}
		>
			<View style={[containerStyle]}>{children}</View>
		</Provider>
	);
};

ChipButtonGroup.ChipButtonItem = ChipButtonItem;

export default ChipButtonGroup;

// ChipButtonItem

interface ChipItemProps {
	props?: PressableProps;
	children: React.ReactNode;
	enabled?: boolean;
	value: string;
}

export function ChipButtonItem({
	props,
	children,
	enabled = true,
	value,
}: ChipItemProps) {
	const { onSelected, selected } = useContext(ChipGroupContext);

	const isSelected = () => {
		return selected === value;
	};

	const triggerRadioButton = () => {
		if (onSelected && value !== selected) {
			onSelected(value);
		}
	};
	return (
		<Pressable
			{...props}
			style={[
				enabled
					? isSelected()
						? styles.active
						: styles.default
					: styles.disabled,
				{
					borderRadius: 4,
					paddingVertical: 4,
					borderWidth: 1,
				},
			]}
			onPress={triggerRadioButton}
			disabled={!enabled}
		>
			<Heading3
				style={{
					color: enabled
						? isSelected()
							? Colors.white
							: Colors.main[700]
						: Colors.gray[300],
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
		backgroundColor: Colors.main[400],
		borderColor: Colors.main[300],
	},
	disabled: {
		backgroundColor: Colors.white,
		borderColor: Colors.gray[200],
	},
});
