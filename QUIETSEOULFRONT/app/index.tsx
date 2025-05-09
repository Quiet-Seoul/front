import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import HomeCarousel from "@/components/carousel/HomeCarousel";
import React from "react";
import DoubleHighlightTitle from "@/components/title/DoubleHighlightTitle";
import Title from "@/components/title/Title";
import { CardLItem, CardSItem, CardXLItem } from "@/types/card";
import SingleHighlightTitle from "@/components/title/SingleHighlightTitle";
import { router } from "expo-router";
import CardSList from "@/components/cards/CardSList";
import CardLList from "@/components/cards/CardLList";
import CardXLList from "@/components/cards/CardXLList";
import { Body5 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SquareCarousel from "@/components/carousel/SquareCarousel";
import * as Location from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import * as Font from 'expo-font';
import Header from "@/components/header/Header";
import { fetchPlacesNearby } from "@/data/places";
import { PlaceDetailData, PlacesNearbyData } from "@/types/places";
import { getRepValue } from "@/lib/util";
import { fetchQuietAreas } from "@/data/area";
import { AreaData } from "@/types/area";
import { fetchPredictQuietList } from "@/data/predict";
import { PredictPlaceData } from "@/types/predict";
import { CarouselItem } from "@/types/carousel";
import { fetchApprovedSuggestions } from "@/data/suggestions";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
	duration: 2000,
	fade: true,
});

export default function Index() {
	const jwt = React.useRef<string | null>(null);

	const [location, setLocation] =
		React.useState<Location.LocationObject | null>(null);

	const [appIsReady, setAppIsReady] = React.useState(false);

	const [placesNearby, setPlacesNearby] = React.useState<PlacesNearbyData>();
	const [quietAreas, setQuietAreas] = React.useState<AreaData[]>();
	const [predictQuietList, setPredictQuietList] =
		React.useState<PredictPlaceData[]>();
	const [suggestionPlaces, setSuggestionPlaces] =
		React.useState<PlaceDetailData[]>();

	React.useEffect(() => {
		AsyncStorage.getItem("jwt").then((res) => {
			jwt.current = res;
		});

		async function getCurrentLocation() {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				alert("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		}

		async function prepare() {
			try {
				// Pre-load fonts, make any API calls you need to do here
				await Font.loadAsync({
					Pretendard: require("../assets/fonts/PretendardVariable.ttf"),
					"Pretendard-Light": require("../assets/fonts/Pretendard-Light.otf"),
					"Pretendard-Black": require("../assets/fonts/Pretendard-Black.otf"),
					"Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
					"Pretendard-ExtraBold": require("../assets/fonts/Pretendard-ExtraBold.otf"),
					"Pretendard-Thin": require("../assets/fonts/Pretendard-Thin.otf"),
					"Pretendard-ExtraLight": require("../assets/fonts/Pretendard-ExtraLight.otf"),
					"Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.otf"),
					"Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
					"Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.otf"),
				});

				await new Promise((resolve) => setTimeout(resolve, 5000));

				console.log("Fonts loaded successfully!");
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
		getCurrentLocation();
	}, []);

	React.useEffect(() => {
		const getPredictQuietList = async () => {
			const result = await fetchPredictQuietList();

			setPredictQuietList(result);
		};

		const getSuggesitonPlaces = async () => {
			const result = await fetchApprovedSuggestions();

			setSuggestionPlaces(result);
		};

		getPredictQuietList();
		getSuggesitonPlaces();
	}, []);

	React.useEffect(() => {
		const getPlacesNearby = async () => {
			if (location) {
				const result = await fetchPlacesNearby(
					location.coords.latitude,
					location.coords.longitude
				);

				setPlacesNearby(result);
			}
		};

		const getQuietAreas = async () => {
			const result = await fetchQuietAreas();

			setQuietAreas(result.slice(0, 5));
		};

		getPlacesNearby();
		getQuietAreas();
	}, [location]);

	const onLayoutRootView = React.useCallback(() => {
		if (appIsReady) {
			SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<>
			<Header title="한적서울" screenName="index" chevron={false} />
			<ScrollView onLayout={onLayoutRootView}>
				<HomeCarousel
					items={
						quietAreas?.slice(0, 3).map((item) => {
							const carouselItem: CarouselItem = {
								id: item.areaCd,
								image: item.imageUrl,
								location: item.areaNm,
								description: item.areaCongestMsg,
							};

							return carouselItem;
						}) || []
					}
				/>
				<View
					style={{
						display: "flex",
						flexDirection: "column",
						rowGap: 64,
						paddingVertical: 64,
					}}
				>
					<CardLList
						titleComponent={
							<DoubleHighlightTitle
								text1={placesNearby?.baseArea || "unknown"}
								text2={placesNearby?.category || "unknown"}
								subText="*현재 위치 기반"
								onPress={() =>
									router.push({
										pathname: "/quietplaces",
										params: {
											areaCd: placesNearby?.areaCd,
										},
									})
								}
							/>
						}
						items={
							placesNearby?.places.map((item) => {
								const cardItem: CardLItem = {
									id: item.id,
									text: item.name,
									rep: getRepValue(item.avgRating),
									reviews: item.reviewCount,
									image: item.imageUrl,
								};

								return cardItem;
							}) || []
						}
					/>
					<CardXLList
						titleComponent={
							<Title
								text="현재 한적한 지역 추천"
								onPress={() => router.push("/cities")}
							/>
						}
						items={
							quietAreas?.map((item) => {
								const cardItem: CardXLItem = {
									id: item.areaCd,
									text: item.areaNm,
									subText: `${
										item.areaPpltnMin / 10000
									}만 ~ ${item.areaPpltnMax / 10000}만`,
									status: item.areaCongestLvl,
									image: item.imageUrl,
								};

								return cardItem;
							}) || []
						}
					/>
					<View>
						<SquareCarousel
                          items={
                            predictQuietList?.map((item) => {
                              const fallback = "https://quietseoul-review-images.s3.ap-northeast-2.amazonaws.com/defaults/park.png"; // ✅ 실제 URL을 명시적으로
                              const imageUrl =
                                item.imageUrl && item.imageUrl.startsWith("http")
                                  ? item.imageUrl
                                  : fallback;

                              const card: CarouselItem = {
                                type: item.type,
                                image: imageUrl,
                                location: item.name,
                                description:
                                  item.type === "park"
                                    ? "공원"
                                    : item.type === "mainstreet"
                                    ? "길거리"
                                    : "기타",
                              };
                              return card;
                            }) || []
                          }
                        />
					</View>
					<CardSList
						titleComponent={
							<SingleHighlightTitle
								text1="사용자"
								text2="기반 추천"
								highlight="제보"
								onPress={() => router.push("/suggestions")}
							/>
						}
						items={
							suggestionPlaces?.slice(0, 5).map((item) => {
								const cardData: CardSItem = {
									type: item.category,
									id: item.id,
									text: item.name,
									rep: getRepValue(item.avgRating),
									reviews: 0,
								};

								return cardData;
							}) || []
						}
						isFromUser
					/>
					{/* <CardSList
						titleComponent={
							<SingleHighlightTitle
								text1="사용자"
								text2="기반 추천"
								highlight="후기"
								onPress={() =>
									router.push({
										pathname: "/recommand",
										params: { type: "review" },
									})
								}
							/>
						}
						items={cardSItems}
					/> */}
				</View>
				<Pressable
					style={styles.footerContainer}
					onPress={() => {
						if (jwt.current) {
							router.push("/inform");
						} else {
							alert("로그인 후 이용해주세요.");
						}
					}}
				>
					<Body5 color={Colors.gray[800]}>
						📢 한적한 장소를 알고 계시다면 저희에게 제보해주세요! →
					</Body5>
				</Pressable>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	footerContainer: {
		paddingVertical: 32,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
	squareCarouselContainer: {
		paddingHorizontal: 16,
	},
});
