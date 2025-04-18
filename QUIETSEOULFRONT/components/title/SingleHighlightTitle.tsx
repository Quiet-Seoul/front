import React from "react";
import { Pressable, View } from "react-native";
import ChevronRight from "../icons/ChevronRight";
import { Caption3, Heading2 } from "../text/Text";
import { Colors } from "@/constants/Colors";

type Props = {
	text1: string;
	text2: string;
	highlight: string;
	subText?: string;
	onPress?: () => void;
};

const SingleHighlightTitle = ({
	text1,
	text2,
	highlight,
	subText,
	onPress,
}: Props) => {
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
					<Heading2>{text1} </Heading2>
					<Heading2 color={Colors.main[700]}>{highlight}</Heading2>
					<Heading2> {text2}</Heading2>
				</View>
				<View>
					<ChevronRight />
				</View>
			</View>
		</Pressable>
	);
};

export default SingleHighlightTitle;
