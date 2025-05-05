import { Colors } from "@/constants/Colors";
import { CarouselItem } from "@/types/carousel";
import React from "react";
import {
	View,
	Image,
	Dimensions,
	ImageBackground,
	Pressable,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
	ICarouselInstance,
	Pagination,
} from "react-native-reanimated-carousel";
import { Body3, Heading1 } from "../text/Text";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

type Props = {
	items: CarouselItem[];
};

const width = Dimensions.get("window").width;

const HomeCarousel = ({ items }: Props) => {
	const ref = React.useRef<ICarouselInstance>(null);
	const progress = useSharedValue(0);

	return (
		<View style={{ width: "100%" }}>
			<Carousel
				ref={ref}
				width={width}
				height={300}
				data={items}
				onProgressChange={progress}
				autoPlay
				autoPlayInterval={3000}
				renderItem={({ item, index, animationValue }) => (
					<Pressable
						onPress={() =>
							router.push({
								pathname: "/quietplaces",
								params: { areaCd: item.id },
							})
						}
					>
						<ImageBackground
							source={{ uri: item.image }}
							style={{
								height: "100%",
							}}
						>
							<LinearGradient
								colors={["#00000000", "#00000080"]}
								locations={[0.5, 1]}
								start={{ x: 0, y: 0 }}
								end={{ x: 0, y: 1 }}
								style={{
									height: "100%",
									width: "100%",
								}}
							>
								<View
									style={{
										position: "absolute",
										bottom: 28,
										left: 16,
										right: 16,
										display: "flex",
										flexDirection: "column",
										rowGap: 8,
									}}
								>
									<Heading1 color={Colors.white}>
										{item.location}
									</Heading1>
									<Body3 color={Colors.white}>
										{item.description}
									</Body3>
								</View>
							</LinearGradient>
						</ImageBackground>
					</Pressable>
				)}
			/>

			<View
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					paddingHorizontal: 16,
					paddingVertical: 12,
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
				}}
			>
				<Pagination.Custom
					progress={progress}
					data={items}
					containerStyle={{
						width: "100%",
						display: "flex",
						flexDirection: "row",
					}}
					activeDotStyle={{
						backgroundColor: Colors.white,
					}}
					dotStyle={{
						height: 4,
						flex: 1,
						backgroundColor: "rgba(255, 255, 255, 0.4)",
					}}
				/>
			</View>
		</View>
	);
};

export default HomeCarousel;
