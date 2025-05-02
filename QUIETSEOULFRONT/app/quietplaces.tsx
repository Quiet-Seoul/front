import { View, ImageBackground, StyleSheet, ScrollView } from "react-native";
import { Body3, Heading1, Heading2 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import PlacesStatus from "@/components/others/PlacesStatus";
import StatusTitle from "@/components/title/StatusTitle";
import CardL from "@/components/cards/CardL";
import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
	fetchCategoriesStatus,
	fetchPlacesNearbybyCategory,
} from "@/data/places";
import { CategoriesStatusData, PlaceDetailData } from "@/types/places";
import { getRepValue } from "@/lib/util";
import { fetchAreaCurrentStatus } from "@/data/area";
import { AreaData } from "@/types/area";

export default function QuietPlaces() {
	const areaCd = useLocalSearchParams().areaCd?.toString();

	const [currentStatus, setCurrentStatus] = React.useState<AreaData>();

	const [restaurants, setRestaurants] = React.useState<PlaceDetailData[]>();
	const [fb, setFb] = React.useState<PlaceDetailData[]>();
	const [leisures, setLeisures] = React.useState<PlaceDetailData[]>();
	const [cafes, setCafes] = React.useState<PlaceDetailData[]>();
	const [distributions, setDistributions] =
		React.useState<PlaceDetailData[]>();

	const [categoriesStatus, setCategoriesStatus] =
		React.useState<CategoriesStatusData>();

	React.useEffect(() => {
		const getCurrentStatus = async () => {
			const result = await fetchAreaCurrentStatus(areaCd);

			setCurrentStatus(result[0]);
		};

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

		const getCategoriesStatus = async () => {
			const result = await fetchCategoriesStatus(areaCd);

			setCategoriesStatus(result);
		};

		getCurrentStatus();
		getPlaces();
		getCategoriesStatus();
	}, []);

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
						source={{
							uri:
								currentStatus?.imageUrl ||
								process.env.EXPO_PUBLIC_IMAGE_PLACEHOLDER,
						}}
						style={styles.banner}
					>
						<View style={styles.bannerDim}>
							<View style={styles.bannerContainer}>
								<Heading1 color={Colors.white}>
									{currentStatus?.areaNm || "알 수 없음"}
								</Heading1>
								<Body3 color={Colors.white}>
									{currentStatus?.areaCongestMsg ||
										"알 수 없음"}
								</Body3>
							</View>
						</View>
					</ImageBackground>
					<View style={styles.statusContainer}>
						<PlacesStatus
							restaurantEnabled={
								(restaurants && restaurants.length > 0) || false
							}
							restaurantStatus={categoriesStatus?.식당}
							fbEnabled={(fb && fb.length > 0) || false}
							fbStatus={categoriesStatus?.패션}
							leisureEnabled={
								(leisures && leisures.length > 0) || false
							}
							leisureStatus={categoriesStatus?.여가}
							cafeEnabled={(cafes && cafes.length > 0) || false}
							cafeStatus={categoriesStatus?.카페}
							distributionEnabled={
								(distributions && distributions.length > 0) ||
								false
							}
							distributionStatus={categoriesStatus?.유통}
							areaCd={areaCd}
						/>
					</View>
					<View style={styles.cardListContainerContainer}>
						{restaurants && restaurants.length > 0 && (
							<View style={styles.cardListContainer}>
								<StatusTitle
									text="식당"
									status={categoriesStatus?.식당 || 0}
									onPress={() =>
										router.push({
											pathname: "/recommand",
											params: {
												type: "quietplaces",
												title:
													currentStatus?.areaNm +
													" 전체보기",
												areaCd: areaCd,
											},
										})
									}
								/>
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
								<StatusTitle
									text="패션·뷰티"
									status={categoriesStatus?.패션 || 0}
								/>
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
								<StatusTitle
									text="여가"
									status={categoriesStatus?.여가 || 0}
								/>
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
								<StatusTitle
									text="카페"
									status={categoriesStatus?.카페 || 0}
								/>
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
								<StatusTitle
									text="유통"
									status={categoriesStatus?.유통 || 0}
								/>
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
