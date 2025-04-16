import React from "react";
import { View } from "react-native";
import ChevronRight from "../icons/ChevronRight";
import { Caption3, Heading2 } from "../text/Text";
import { Colors } from "@/constants/Colors";

type Props = {
	text: string;
	subText?: string;
	onTouchEnd?: () => void;
};

const Title = ({ text, subText, onTouchEnd }: Props) => {
	return (
		<View
			style={{ display: "flex", flexDirection: "column", rowGap: 2 }}
			onTouchEnd={onTouchEnd}
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
		</View>
	);
};

export default Title;
