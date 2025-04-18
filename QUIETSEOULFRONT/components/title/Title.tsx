import React from "react";
import { Pressable, View } from "react-native";
import ChevronRight from "../icons/ChevronRight";
import { Caption3, Heading2 } from "../text/Text";
import { Colors } from "@/constants/Colors";

type Props = {
	text: string;
	subText?: string;
	onPress?: () => void;
};

const Title = ({ text, subText, onPress }: Props) => {
	return (
		<Pressable
			style={{ display: "flex", flexDirection: "column", rowGap: 2 }}
			onPress={onPress}
		>
			{subText && (
				<View>
					<Caption3 color={Colors.gray[400]}>{subText}</Caption3>
				</View>
			)}
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<View style={{ display: "flex", flexDirection: "row" }}>
					<Heading2>{text}</Heading2>
				</View>
				<View>
					<ChevronRight />
				</View>
			</View>
		</Pressable>
	);
};

export default Title;
