import React from "react";
import { Pressable, View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Heading4, Body5 } from "../text/Text";
import { Colors } from "@/constants/Colors";
import { CardSuggestionItem } from "@/types/card";
import { router } from "expo-router";

const CardSuggestion = ({ id, text, image, category }: CardSuggestionItem) => {
	const fallbackImage = process.env.EXPO_PUBLIC_IMAGE_PLACEHOLDER;
	const validImageUrl = image && image.startsWith("http") ? image : fallbackImage;

	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "/detail/[details]",
					params: { details: String(id), isSuggestion: "true" },
				})
			}
		>
			<ImageBackground
				source={{ uri: validImageUrl }}
				style={{
					width: 160,
					height: 160,
					borderRadius: 4,
					overflow: "hidden",
				}}
				imageStyle={{ borderRadius: 4 }}
			>
				<LinearGradient
					colors={["#00000000", "#00000080"]}
					locations={[0.3, 1]}
					style={{ flex: 1, justifyContent: "flex-end", padding: 8 }}
				>
					<Heading4 color={Colors.white}>{text}</Heading4>
					<Body5 color={Colors.white}>{category}</Body5>
				</LinearGradient>
			</ImageBackground>
		</Pressable>
	);
};

export default CardSuggestion;
