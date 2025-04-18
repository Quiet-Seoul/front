import React from "react";
import { ImageBackground, Pressable, View } from "react-native";
import { Body3, Body5, Heading2, Heading4 } from "../text/Text";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { CardXLItem } from "@/types/card";
import { router } from "expo-router";

const CardXL = ({ text, image, subText, status }: CardXLItem) => {
	const statusColor = {
		0: Colors.status.positive,
		1: Colors.status.neutral,
		2: Colors.status.negative,
		3: Colors.status.veryNegative,
	};

	return (
		<Pressable onPress={() => router.push("/quietplaces")}>
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
						uri: image ?? "https://placehold.co/400x300.png",
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
