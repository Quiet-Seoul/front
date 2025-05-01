import { CardSItem } from "@/types/card";
import React from "react";
import { View, Image, Pressable } from "react-native";
import TypeChip from "../chips/TypeChip";
import FromUserChip from "../chips/FromUserChip";
import { Body5, Heading4 } from "../text/Text";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const CardS = ({
	id,
	text,
	image = process.env.EXPO_PUBLIC_IMAGE_PLACEHOLDER,
	type,
	isFromUser,
	distance,
	rep,
	reviews,
}: CardSItem) => {
	const emojis = {
		good: "☺️ 쾌적해요",
		normal: "🙂 보통이에요",
		bad: "🙁 북적해요",
		terrible: "😔 혼잡해요",
		NaN: "NaN",
	};

	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "/detail/[details]",
					params: { details: String(id) },
				})
			}
		>
			<View
				style={{
					display: "flex",
					flexDirection: "column",
					rowGap: 8,
					alignSelf: "flex-start",
				}}
			>
				<View>
					<Image
						source={{ uri: image }}
						style={{ width: 160, height: 160, borderRadius: 4 }}
					/>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "column",
						rowGap: 4,
					}}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							columnGap: 4,
						}}
					>
						<TypeChip type={type} />
						{isFromUser && <FromUserChip />}
					</View>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							columnGap: 8,
						}}
					>
						<Heading4>{text}</Heading4>
						<Body5 color={Colors.gray[700]}>
							거리 {distance} km
						</Body5>
					</View>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							gap: 8,
						}}
					>
						<Body5 color={Colors.gray[700]}>{emojis[rep]}</Body5>
						<Body5 color={Colors.gray[700]}>💬 {reviews} 건</Body5>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default CardS;
