import { View, ImageBackground, StyleSheet, ScrollView } from "react-native";
import { Body3, Heading1, Heading2 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import PlacesStatus from "@/components/others/PlacesStatus";
import StatusTitle from "@/components/title/StatusTitle";
import { CardLItem } from "@/types/card";
import CardL from "@/components/cards/CardL";
import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import { Stack, router } from "expo-router";

export default function QuietPlaces() {
	const locationName = "하와이";
	const locationDescription = "매일같이 무지개를 감상할 수 있는 하와이";
	const locationImage =
		"https://content.skyscnr.com/m/41acfff761f8ea1a/original/GettyImages-519763361.jpg?resize=1800px:1800px&quality=100";

	return (
		<>
			<Stack.Screen
				name="quietplaces"
				options={{
					headerLeft: () => (
						<View onTouchEnd={() => router.back()}>
							<ChevronLeft24 />
						</View>
					),
					headerTitle: () => (
						<Heading2 color={Colors.white}>한적한 장소</Heading2>
					),
				}}
			/>
			<ScrollView>
				<View style={styles.container}>
					<ImageBackground
						source={{ uri: locationImage }}
						style={styles.banner}
					>
						<View style={styles.bannerDim}>
							<View style={styles.bannerContainer}>
								<Heading1 color={Colors.white}>
									{locationName}
								</Heading1>
								<Body3 color={Colors.white}>
									{locationDescription}
								</Body3>
							</View>
						</View>
					</ImageBackground>
					<View style={styles.statusContainer}>
						<PlacesStatus />
					</View>
					<View style={styles.cardListContainerContainer}>
						<View style={styles.cardListContainer}>
							<StatusTitle text="공원" status={0} />
							<View style={styles.cardList}>
								{cardLItems.map((item, idx) => (
									<CardL
										key={idx}
										text={item.text}
										image={item.image}
										rep={item.rep}
										reviews={item.reviews}
									/>
								))}
							</View>
						</View>
						<View style={styles.cardListContainer}>
							<StatusTitle text="카페" status={1} />
							<View style={styles.cardList}>
								{cardLItems.map((item, idx) => (
									<CardL
										key={idx}
										text={item.text}
										image={item.image}
										rep={item.rep}
										reviews={item.reviews}
									/>
								))}
							</View>
						</View>
						<View style={styles.cardListContainer}>
							<StatusTitle text="식당" status={3} />
							<View style={styles.cardList}>
								{cardLItems.map((item, idx) => (
									<CardL
										key={idx}
										text={item.text}
										image={item.image}
										rep={item.rep}
										reviews={item.reviews}
									/>
								))}
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
	},
	banner: {
		height: 120,
	},
	bannerDim: {
		height: "100%",
		width: "100%",
		backgroundColor: "#00000040",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		paddingHorizontal: 16,
		paddingVertical: 12,
		rowGap: 16,
	},
	bannerContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 8,
	},
	statusContainer: {
		paddingHorizontal: 16,
	},
	cardListContainerContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 64,
		paddingBottom: 64,
	},
	cardListContainer: {
		paddingHorizontal: 16,
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
	},
	cardList: {
		display: "flex",
		flexDirection: "row",
		columnGap: 8,
	},
});

const cardLItems: Array<CardLItem> = [
	{
		text: "스타벅스 교대점",
		image: "https://think-note.com/wp-content/uploads/2024/06/starbucks_1-930x620.jpeg",
		rep: "good",
		reviews: 19,
	},
	{
		text: "스타벅스 교대점",
		image: "https://think-note.com/wp-content/uploads/2024/06/starbucks_1-930x620.jpeg",
		rep: "good",
		reviews: 19,
	},
	{
		text: "스타벅스 교대점",
		image: "https://think-note.com/wp-content/uploads/2024/06/starbucks_1-930x620.jpeg",
		rep: "good",
		reviews: 19,
	},
];
