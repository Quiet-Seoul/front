import React from "react";
import { ImageBackground, View } from "react-native";
import { Body5, Heading4 } from "../text/Text";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { CardLItem } from "@/types/card";

const CardL = ({ text, image, rep, reviews }: CardLItem) => {
	const emojis = {
		good: "☺️ 여유",
		normal: "🙂 보통",
		bad: "😔 혼잡",
	};

	return (
		<ImageBackground
			source={{
				uri: image ?? "https://placehold.co/400x300.png",
			}}
			style={{
				width: 160,
				height: 200,
			}}
			imageStyle={{
				borderRadius: 8,
			}}
		>
			<LinearGradient
				colors={["#00000080", "#00000000"]}
				locations={[0.3, 1]}
				start={{ x: 0, y: 1 }}
				end={{ x: 0, y: 0.5 }}
				style={{
					padding: 12,
					borderRadius: 8,
				}}
			>
				<View
					style={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-end",
						gap: 4,
					}}
				>
					<View>
						<Heading4 color={Colors.white}>{text}</Heading4>
					</View>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							gap: 8,
						}}
					>
						<Body5 color={Colors.white}>{emojis[rep]}</Body5>
						<Body5 color={Colors.white}>💬 {reviews} 건</Body5>
					</View>
				</View>
			</LinearGradient>
		</ImageBackground>
	);
};

export default CardL;
