import React from "react";
import { Dimensions, ImageBackground, Pressable, View } from "react-native";
import { Body3, Heading2 } from "../text/Text";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const windowWidth = Dimensions.get("window").width;

interface CardStatusFlexibleProps {
	name: string;
	type: string;
	imageUrl?: string;
	status: "여유" | "보통" | "약간 혼잡" | "혼잡";
}

const CardStatusFlexible = ({
	name,
	type,
	status,
	imageUrl,
}: CardStatusFlexibleProps) => {
	const statusColor = {
		여유: Colors.status.positive,
		보통: Colors.status.neutral,
		"약간 혼잡": Colors.status.negative,
		혼잡: Colors.status.veryNegative,
	};

	const fallbackImage = process.env.EXPO_PUBLIC_IMAGE_PLACEHOLDER;
	const validImageUrl =
		imageUrl && imageUrl.startsWith("http") ? imageUrl : fallbackImage;

	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "/predict",
					params: { name: name, type: type },
				})
			}
		>
			<View
				style={{
					width: (windowWidth - 40) / 2,
					aspectRatio: 1 / 1,
					backgroundColor: statusColor[status],
					borderRadius: 8,
				}}
			>
				<ImageBackground
					source={{
						uri: validImageUrl,
					}}
					style={{
						width: (windowWidth - 40) / 2,
						marginBottom: 4,
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
								<Heading2 color={Colors.white}>{name}</Heading2>
							</View>
							<View>
								<Body3 color={Colors.white}>
									{type === "park"
										? "공원"
										: type === "mainstreet"
										? "길거리"
										: "기타"}
								</Body3>
							</View>
						</View>
					</LinearGradient>
				</ImageBackground>
			</View>
		</Pressable>
	);
};

export default CardStatusFlexible;
