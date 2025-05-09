import React from "react";
import { ImageBackground, Pressable, View } from "react-native";
import { Body3, Heading2 } from "../text/Text";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { CardXLItem } from "@/types/card";
import { router } from "expo-router";

const CardXL = ({ id, text, image, subText, status }: CardXLItem) => {
	const statusColor = {
		여유: Colors.status.positive,
		보통: Colors.status.neutral,
		"약간 붐빔": Colors.status.negative,
		붐빔: Colors.status.veryNegative,
	};

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
			<View
				style={{
					width: 160,
					height: 220,
					backgroundColor: statusColor[status],
					borderRadius: 8,
				}}
			>
				<ImageBackground
					source={{
						uri: validImageUrl,
					}}
					style={{
						width: 160,
						height: 216,
					}}
					imageStyle={{
						borderRadius: 8,
					}}
				>
					<LinearGradient
						colors={["#00000000", "#00000080"]}
						locations={[0.3, 1]}
						style={{
							overflow: "hidden",
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
								<Heading2 color={Colors.white}>{text}</Heading2>
							</View>
							<View>
								<Body3 color={Colors.white}>{subText}</Body3>
							</View>
						</View>
					</LinearGradient>
				</ImageBackground>
			</View>
		</Pressable>
	);
};

export default CardXL;
