import React from "react";
import { View } from "react-native";
import Cafe from "../icons/Cafe";
import Park from "../icons/Park";
import Restaurant from "../icons/Restaurant";
import { Body3 } from "../text/Text";
import { Colors } from "@/constants/Colors";

type Props = {
	type: "카페" | "공원" | "식당";
};

const TypeChip = ({ type }: Props) => {
	const RenderIcon = () => {
		switch (type) {
			case "카페":
				return <Cafe />;
			case "공원":
				return <Park />;
			case "식당":
				return <Restaurant />;
		}
	};

	return (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				borderWidth: 1,
				borderColor: Colors.main[300],
				borderRadius: 4,
				padding: 4,
				columnGap: 4,
			}}
		>
			<View>
				<RenderIcon />
			</View>
			<View>
				<Body3 color={Colors.main[300]}>{type}</Body3>
			</View>
		</View>
	);
};

export default TypeChip;
