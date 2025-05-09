import React from "react";
import { ImageBackground, Pressable, View } from "react-native";
import { Body5, Heading4 } from "../text/Text";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { CardLItem } from "@/types/card";
import { router } from "expo-router";

const CardL = ({ id, text, image, rep, reviews }: CardLItem) => {
	const emojis = {
		good: "☺️ 여유",
		normal: "🙂 보통",
		bad: "😔 북적",
		terrible: "😔 혼잡",
		NaN: "❔ 평점없음",
	};

	const fallbackImage = process.env.EXPO_PUBLIC_IMAGE_PLACEHOLDER;
	const validImageUrl = image && image.startsWith("http") ? image : fallbackImage;

	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "/detail/[details]",
					params: { details: String(id) },
				})
			}
		>
			<ImageBackground
				source={{ uri: validImageUrl }}
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
		</Pressable>
	);
};

export default CardL;
