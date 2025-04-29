import React from "react";
import { Dimensions, ImageBackground, Pressable, View } from "react-native";
import { Body3, Body5, Heading2, Heading4 } from "../text/Text";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { CardXLItem } from "@/types/card";
import { router } from "expo-router";

const windowWidth = Dimensions.get("window").width;

const CardStatusFlexible = ({
	id,
	text,
	image,
	subText,
	status,
}: CardXLItem) => {
	const statusColor = {
		3: Colors.status.positive,
		2: Colors.status.neutral,
		1: Colors.status.negative,
		0: Colors.status.veryNegative,
		4: Colors.gray[300],
	};

	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "/predict",
					params: { id: id },
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
						uri: image ?? "https://placehold.co/400x300.png",
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

export default CardStatusFlexible;
