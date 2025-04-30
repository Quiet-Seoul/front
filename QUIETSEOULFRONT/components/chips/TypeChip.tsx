import React from "react";
import { View } from "react-native";
import Cafe from "../icons/Cafe";
import Restaurant from "../icons/Restaurant";
import { Body3 } from "../text/Text";
import { Colors } from "@/constants/Colors";
import Fb from "../icons/Fb";
import Leisure from "../icons/Leisure";
import Distribution from "../icons/Distribution";

type Props = {
	type: "식당" | "여가" | "카페" | "유통" | "패션";
};

const TypeChip = ({ type }: Props) => {
	const RenderIcon = () => {
		switch (type) {
			case "패션":
				return <Fb />;
			case "여가":
				return <Leisure />;
			case "유통":
				return <Distribution />;
			case "카페":
				return <Cafe />;
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
