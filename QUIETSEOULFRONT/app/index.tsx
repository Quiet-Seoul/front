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
import Font from "expo-font";
import Header from "@/components/header/Header";
import { fetchPlacesNearby } from "@/data/places";
import { PlacesNearbyData } from "@/types/places";
import { getRepValue } from "@/lib/util";
import { fetchQuietAreas } from "@/data/area";
import { AreaData } from "@/types/area";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
	duration: 2000,
	fade: true,
});

export default function Landing() {
	const jwt = React.useRef<string | null>(null);

	const [location, setLocation] =
		React.useState<Location.LocationObject | null>(null);

	const [appIsReady, setAppIsReady] = React.useState(false);

	const [placesNearby, setPlacesNearby] = React.useState<PlacesNearbyData>();
	const [quietAreas, setQuietAreas] = React.useState<AreaData[]>();

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
			SplashScreen.hide();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<>
			<Header title="한적서울" screenName="index" chevron={false} />
			<ScrollView onLayout={onLayoutRootView}>
				<HomeCarousel items={carouselItems} />
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
									reviews: 0,
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
								};

								return cardItem;
							}) || []
						}
					/>
					<View>
						<SquareCarousel items={carouselItems} />
					</View>
					<CardSList
						titleComponent={
							<SingleHighlightTitle
								text1="사용자"
								text2="기반 추천"
								highlight="제보"
								onPress={() =>
									router.push({
										pathname: "/recommand",
										params: { type: "suggestion" },
									})
								}
							/>
						}
						items={cardSItems}
						isFromUser
					/>
					<CardSList
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
					/>
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

const carouselItems = [
	{
		id: 1,
		image: "https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/07/10/MIwt/5pXvYOvGAg.jpg",
		location: "뉴욕",
		description: "뉴욕은 정말 멋있어",
	},
	{
		id: 2,
		image: "https://ko.skyticket.com/guide/wp-content/uploads/2024/11/f3b05a7e-shutterstock_2148766635-1200x675.jpg",
		location: "몰디브",
		description: "에메랄드 빛깔의 해변을 지닌 몰디브",
	},
	{
		id: 3,
		image: "https://content.skyscnr.com/m/41acfff761f8ea1a/original/GettyImages-519763361.jpg?resize=1800px:1800px&quality=100",
		location: "하와이",
		description: "매일같이 무지개를 감상할 수 있는 하와이",
	},
];

const cardSItems: Array<CardSItem> = [
	{
		id: 1,
		text: "동작충효길",
		type: "카페",
		rep: "good",
		reviews: 0,
		isFromUser: true,
		distance: 1.2,
	},
	{
		id: 2,
		text: "동작충효길",
		type: "카페",
		rep: "good",
		reviews: 0,
		isFromUser: true,
		distance: 1.2,
	},
	{
		id: 3,
		text: "동작충효길",
		type: "카페",
		rep: "good",
		reviews: 0,
		isFromUser: true,
		distance: 1.2,
	},
];
