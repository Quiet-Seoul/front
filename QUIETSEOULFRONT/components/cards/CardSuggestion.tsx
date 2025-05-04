import { CardSItem, CardSuggestionItem } from "@/types/card";
import React from "react";
import { View, Image, Dimensions, Pressable } from "react-native";
import TypeChip from "../chips/TypeChip";
import FromUserChip from "../chips/FromUserChip";
import { Body5, Heading4 } from "../text/Text";
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";
import { getRepEmoticon, getRepText } from "@/lib/util";

const windowWidth = Dimensions.get("window").width;

const CardSuggestion = ({
	id,
	text,
	image = process.env.EXPO_PUBLIC_IMAGE_PLACEHOLDER,
	isFromUser,
	reviews,
	avgRate,
}: CardSuggestionItem) => {
	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "/detail/[details]",
					params: { details: String(id), type: "suggestion" },
				})
			}
		>
			<View
				style={{
					display: "flex",
					flexDirection: "column",
					rowGap: 8,
				}}
			>
				<View>
					<Image
						source={{ uri: image }}
						style={{
							width: (windowWidth - 40) / 2,
							aspectRatio: 1 / 1,
							borderRadius: 4,
						}}
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
						<TypeChip type={"카페"} />
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
						<View style={{ flex: 1 }}>
							<Heading4 ellipsis>{text}</Heading4>
						</View>
					</View>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							gap: 8,
						}}
					>
						<Body5 color={Colors.gray[700]}>
							{`${getRepEmoticon(avgRate)} ${getRepText(
								avgRate
							)}`}
						</Body5>
						<Body5 color={Colors.gray[700]}>💬 {reviews} 건</Body5>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default CardSuggestion;
