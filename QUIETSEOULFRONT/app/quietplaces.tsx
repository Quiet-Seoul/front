import { View, ImageBackground, StyleSheet, ScrollView } from "react-native";
import { Body3, Heading1, Heading2 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import PlacesStatus from "@/components/others/PlacesStatus";
import StatusTitle from "@/components/title/StatusTitle";
import CardL from "@/components/cards/CardL";
import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import { Stack, router } from "expo-router";
import React from "react";
import { fetchPlacesNearbybyCategory } from "@/data/places";
import { PlaceDetailData } from "@/types/places";
import { getRepValue } from "@/lib/util";

export default function QuietPlaces() {
	const areaCd = "POI084";
	const locationName = "하와이";
	const locationDescription = "매일같이 무지개를 감상할 수 있는 하와이";
	const locationImage =
		"https://content.skyscnr.com/m/41acfff761f8ea1a/original/GettyImages-519763361.jpg?resize=1800px:1800px&quality=100";

	const [restaurants, setRestaurants] = React.useState<PlaceDetailData[]>();
	const [fb, setFb] = React.useState<PlaceDetailData[]>();
	const [leisures, setLeisures] = React.useState<PlaceDetailData[]>();
	const [cafes, setCafes] = React.useState<PlaceDetailData[]>();
	const [distributions, setDistributions] =
		React.useState<PlaceDetailData[]>();

	React.useEffect(() => {
		const getPlaces = async () => {
			const restaurantsResult = await fetchPlacesNearbybyCategory(
				areaCd,
				"식당"
			);
			const fbResult = await fetchPlacesNearbybyCategory(
				areaCd,
				"패션·뷰티"
			);
			const leisuresResult = await fetchPlacesNearbybyCategory(
				areaCd,
				"여가"
			);
			const cafesResult = await fetchPlacesNearbybyCategory(
				areaCd,
				"카페"
			);
			const distributionsResult = await fetchPlacesNearbybyCategory(
				areaCd,
				"유통"
			);

			setRestaurants(restaurantsResult.slice(0, 5));
			setFb(fbResult.slice(0, 5));
			setLeisures(leisuresResult.slice(0, 5));
			setCafes(cafesResult.slice(0, 5));
			setDistributions(distributionsResult.slice(0, 5));
		};

		getPlaces();
	});

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
						<PlacesStatus
							restaurantEnabled={
								(restaurants && restaurants.length > 0) || false
							}
							fbEnabled={(fb && fb.length > 0) || false}
							leisureEnabled={
								(leisures && leisures.length > 0) || false
							}
							cafeEnabled={(cafes && cafes.length > 0) || false}
							distributionEnabled={
								(distributions && distributions.length > 0) ||
								false
							}
							restaurantStatus={1}
							fbStatus={2}
							leisureStatus={3}
							cafeStatus={4}
							distributionStatus={5}
						/>
					</View>
					<View style={styles.cardListContainerContainer}>
						{restaurants && restaurants.length > 0 && (
							<View style={styles.cardListContainer}>
								<StatusTitle text="식당" status={3} />
								<ScrollView
									contentContainerStyle={styles.cardList}
									horizontal
								>
									{restaurants?.map((item) => (
										<CardL
											id={item.id}
											key={item.id}
											text={item.name}
											image={item.imageUrl}
											rep={getRepValue(item.avgRating)}
											reviews={0}
										/>
									))}
								</ScrollView>
							</View>
						)}
						{fb && fb.length > 0 && (
							<View style={styles.cardListContainer}>
								<StatusTitle text="패션·뷰티" status={1} />
								<ScrollView
									contentContainerStyle={styles.cardList}
									horizontal
								>
									{fb?.map((item) => (
										<CardL
											id={item.id}
											key={item.id}
											text={item.name}
											image={item.imageUrl}
											rep={getRepValue(item.avgRating)}
											reviews={0}
										/>
									))}
								</ScrollView>
							</View>
						)}
						{leisures && leisures.length > 0 && (
							<View style={styles.cardListContainer}>
								<StatusTitle text="여가" status={3} />
								<ScrollView
									contentContainerStyle={styles.cardList}
									horizontal
								>
									{leisures?.map((item) => (
										<CardL
											id={item.id}
											key={item.id}
											text={item.name}
											image={item.imageUrl}
											rep={getRepValue(item.avgRating)}
											reviews={0}
										/>
									))}
								</ScrollView>
							</View>
						)}
						{cafes && cafes.length > 0 && (
							<View style={styles.cardListContainer}>
								<StatusTitle text="카페" status={3} />
								<ScrollView
									contentContainerStyle={styles.cardList}
									horizontal
								>
									{cafes?.map((item) => (
										<CardL
											id={item.id}
											key={item.id}
											text={item.name}
											image={item.imageUrl}
											rep={getRepValue(item.avgRating)}
											reviews={0}
										/>
									))}
								</ScrollView>
							</View>
						)}
						{distributions && distributions.length > 0 && (
							<View style={styles.cardListContainer}>
								<StatusTitle text="유통" status={3} />
								<ScrollView
									contentContainerStyle={styles.cardList}
									horizontal
								>
									{distributions?.map((item) => (
										<CardL
											id={item.id}
											key={item.id}
											text={item.name}
											image={item.imageUrl}
											rep={getRepValue(item.avgRating)}
											reviews={0}
										/>
									))}
								</ScrollView>
							</View>
						)}
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
