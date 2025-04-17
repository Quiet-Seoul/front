import { Colors } from "@/constants/Colors";
import React, { ReactNode } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Body2, Caption2 } from "../text/Text";

interface RadioProps {
	selected?: string;
	setSelected: (value: string) => void;
}

export const useRadioContext = (): RadioProps => {
	const context = React.useContext(RadioContext);
	if (!context) {
		throw new Error("useRadioContext must be used within a RadioProvider");
	}
	return context;
};

const RadioContext = React.createContext<RadioProps | null>(null);

interface RadioProviderProps {
	children: ReactNode;
	defaultValue?: string;
}

export const RadioProvider = ({
	children,
	defaultValue,
}: RadioProviderProps) => {
	const [selected, setSelected] = React.useState<string | undefined>(
		defaultValue
	);

	return (
		<RadioContext.Provider value={{ selected, setSelected }}>
			{children}
		</RadioContext.Provider>
	);
};

type Props = {
	text: string;
	value: string;
};

const RadioButton = ({ text, value }: Props) => {
	const { selected, setSelected } = useRadioContext();

	const isSelected = selected === value;

	if (isSelected) {
		return (
			<Pressable onPress={() => setSelected(value)}>
				<View
					style={[
						styles.radioButton,
						{
							backgroundColor: Colors.main[400],
						},
					]}
				>
					<Body2 color={Colors.white}>{text}</Body2>
				</View>
			</Pressable>
		);
	} else {
		return (
			<Pressable onTouchEnd={() => setSelected(value)}>
				<View
					style={[
						styles.radioButton,
						{
							backgroundColor: Colors.white,
						},
					]}
				>
					<Body2 color={Colors.main[700]}>{text}</Body2>
				</View>
			</Pressable>
		);
	}
};

export default RadioButton;

const styles = StyleSheet.create({
	radioButton: {
		borderWidth: 1,
		borderColor: Colors.main[100],
		borderRadius: 4,
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
});
