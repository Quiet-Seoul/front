import { Colors } from "@/constants/Colors";
import { CarouselItem } from "@/types/carousel";
import React from "react";
import {
	View,
	Image,
	Dimensions,
	ImageBackground,
	StyleSheet,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
	ICarouselInstance,
	Pagination,
} from "react-native-reanimated-carousel";
import { Body3, Heading1 } from "../text/Text";
import { LinearGradient } from "expo-linear-gradient";
import SingleHighlightTitle from "../title/SingleHighlightTitle";
import { router } from "expo-router";

type Props = {
	items: CarouselItem[];
};

const width = Dimensions.get("window").width;

const SquareCarousel = ({ items }: Props) => {
	const ref = React.useRef<ICarouselInstance>(null);
	const progress = useSharedValue(0);

	return (
		<View style={{ width: "100%" }}>
			<View style={styles.titleContainer}>
				<SingleHighlightTitle
					text1="가장 한적할"
					text2="추천"
					highlight="공원"
					onPress={() => router.push("/predictList")}
				/>
			</View>
			<Carousel
				ref={ref}
				width={width}
				data={items}
				onProgressChange={progress}
				containerStyle={{
					aspectRatio: 1,
				}}
				autoPlay
				autoPlayInterval={3000}
				renderItem={({ item }) => (
					<View style={{ padding: 16 }}>
						<ImageBackground
							source={{
								uri:
									item.image ||
									process.env.EXPO_PUBLIC_IMAGE_PLACEHOLDER,
							}}
							style={{
								height: "100%",
							}}
							imageStyle={{
								borderRadius: 8,
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
									borderRadius: 8,
								}}
							>
								<View
									style={{
										position: "absolute",
										bottom: 32,
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
					</View>
				)}
			/>

			<View
				style={{
					position: "absolute",
					bottom: 16,
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
					size={8}
					activeDotStyle={{
						backgroundColor: Colors.white,
					}}
					dotStyle={{
						borderRadius: 8,
						backgroundColor: "rgba(255, 255, 255, 0.4)",
					}}
					containerStyle={{
						columnGap: 4,
					}}
					horizontal
				/>
			</View>
		</View>
	);
};

export default SquareCarousel;

const styles = StyleSheet.create({
	titleContainer: {
		paddingHorizontal: 16,
	},
});
