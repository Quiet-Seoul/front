import React from "react";
import { Pressable, View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Heading4, Body5 } from "../text/Text";
import { Colors } from "@/constants/Colors";
import { CardStatusFlexibleItem } from "@/types/card";
import { router } from "expo-router";

const CardStatusFlexible = ({ id, text, image, rep }: CardStatusFlexibleItem) => {
	const fallbackImage = process.env.EXPO_PUBLIC_IMAGE_PLACEHOLDER;
	const validImageUrl = image && image.startsWith("http") ? image : fallbackImage;

	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "/quietplaces",
					params: { areaCd: id },
				})
			}
		>
			<ImageBackground
				source={{ uri: validImageUrl }}
				style={{
					width: "100%",
					aspectRatio: 4 / 3,
					borderRadius: 8,
					overflow: "hidden",
				}}
				imageStyle={{ borderRadius: 8 }}
			>
				<LinearGradient
					colors={["#00000000", "#00000080"]}
					locations={[0.3, 1]}
					style={{ flex: 1, justifyContent: "flex-end", padding: 12 }}
				>
					<Heading4 color={Colors.white}>{text}</Heading4>
					<Body5 color={Colors.white}>{rep}</Body5>
				</LinearGradient>
			</ImageBackground>
		</Pressable>
	);
};

export default CardStatusFlexible;
