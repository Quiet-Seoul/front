import InputField from "@/components/inputField/InputField";
import { Heading4 } from "@/components/text/Text";
import React from "react";
import { View } from "react-native";

type Props = {};

const index = (props: Props) => {
	return (
		<View
			style={{
				display: "flex",
				flexDirection: "column",
				rowGap: 16,
				padding: 16,
				height: "100%",
			}}
		>
			<View
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					columnGap: 16,
					paddingHorizontal: 16,
				}}
			>
				<View style={{ width: 40 }}>
					<Heading4 style={{ textAlign: "center" }}>장소명</Heading4>
				</View>
				<View style={{ flex: 1 }}>
					<InputField />
				</View>
			</View>
			<View
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					columnGap: 16,
					paddingHorizontal: 16,
				}}
			>
				<View style={{ width: 40 }}>
					<Heading4 style={{ textAlign: "center" }}>종류</Heading4>
				</View>
				<View style={{ flex: 1 }}>
					<InputField />
				</View>
			</View>
		</View>
	);
};

export default index;
