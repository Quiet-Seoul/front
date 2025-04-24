import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import HomeCarousel from "@/components/carousel/HomeCarousel";
import React from "react";
import DoubleHighlightTitle from "@/components/title/DoubleHighlightTitle";
import Title from "@/components/title/Title";
import { CardLItem, CardSItem, CardXLItem } from "@/types/card";
import SingleHighlightTitle from "@/components/title/SingleHighlightTitle";
import { router, Stack } from "expo-router";
import CardSList from "@/components/cards/CardSList";
import CardLList from "@/components/cards/CardLList";
import CardXLList from "@/components/cards/CardXLList";
import { Body5, Heading2 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserData } from "@/types/user";
import UserChip from "@/components/chips/UserChip";
import { fetchUserData } from "@/data/user";

export default function Landing() {
	const [userData, setUserData] = React.useState<UserData | null>(null);

	const getLoginInfo = async () => {
		const jwt = await AsyncStorage.getItem("jwt");

		if (jwt) {
			await fetchUserData(jwt).then(async (res) => {
				if (res) {
					await AsyncStorage.setItem("user", JSON.stringify(res));
					setUserData(res);
				}
			});
		}
	};

	const handleDeleteUserData = async () => {
		await AsyncStorage.removeItem("user");
		setUserData(null);
	};

	React.useEffect(() => {
		getLoginInfo();
	}, []);

	return (
		<>
			<Stack.Screen
				name="index"
				options={{
					headerBackVisible: false,
					headerTitle: () => (
						<Heading2 color={Colors.white}>한적서울</Heading2>
					),
					headerRight: () => {
						if (userData) {
							return (
								<UserChip
									userName={userData.name}
									onPress={handleDeleteUserData}
								/>
							);
						}
						return (
							<View onTouchEnd={() => router.push("/login")}>
								<Heading2 color={Colors.white}>로그인</Heading2>
							</View>
						);
					},
				}}
			/>
			<ScrollView>
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
								text1="교대역"
								text2="카페"
								subText="*현재 위치 기반"
								onPress={() => router.push("/quietplaces")}
							/>
						}
						items={cardLItems}
					/>
					<CardXLList
						titleComponent={
							<Title
								text="현재 한적한 지역 추천"
								onPress={() => router.push("/cities")}
							/>
						}
						items={cardXLItems}
					/>
					<CardSList
						titleComponent={
							<SingleHighlightTitle
								text1="사용자"
								text2="기반 추천"
								highlight="제보"
								onPress={() => router.push("/recommand")}
							/>
						}
						items={cardSItems}
					/>
					<CardSList
						titleComponent={
							<SingleHighlightTitle
								text1="사용자"
								text2="기반 추천"
								highlight="후기"
								onPress={() => router.push("/recommand")}
							/>
						}
						items={cardSItems}
					/>
				</View>
				<Pressable
					style={styles.footerContainer}
					onPress={() => router.push("/inform")}
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
});

const carouselItems = [
	{
		id: 1,
		image: "https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/07/10/MIwt/5pXvYOvGAg.jpg",
		location: "뉴욕",
		description: "뉴욕은 정말 멋있어",
	},
	{
		id: 1,
		image: "https://ko.skyticket.com/guide/wp-content/uploads/2024/11/f3b05a7e-shutterstock_2148766635-1200x675.jpg",
		location: "몰디브",
		description: "에메랄드 빛깔의 해변을 지닌 몰디브",
	},
	{
		id: 1,
		image: "https://content.skyscnr.com/m/41acfff761f8ea1a/original/GettyImages-519763361.jpg?resize=1800px:1800px&quality=100",
		location: "하와이",
		description: "매일같이 무지개를 감상할 수 있는 하와이",
	},
];

const cardLItems: Array<CardLItem> = [
	{
		id: 0,
		text: "스타벅스 교대점",
		image: "https://think-note.com/wp-content/uploads/2024/06/starbucks_1-930x620.jpeg",
		rep: "good",
		reviews: 19,
	},
	{
		id: 1,
		text: "스타벅스 교대점",
		image: "https://think-note.com/wp-content/uploads/2024/06/starbucks_1-930x620.jpeg",
		rep: "good",
		reviews: 19,
	},
	{
		id: 2,
		text: "스타벅스 교대점",
		image: "https://think-note.com/wp-content/uploads/2024/06/starbucks_1-930x620.jpeg",
		rep: "good",
		reviews: 19,
	},
];

const cardXLItems: Array<CardXLItem> = [
	{
		text: "용산역",
		image: "https://mediahub.seoul.go.kr/uploads/mediahub/2021/02/6ec15c54a93144dcad71b7e4894bebf5.jpg",
		subText: "현재 1.8만 ~ 2.0만",
		status: 0,
	},
	{
		text: "용산역",
		image: "https://mediahub.seoul.go.kr/uploads/mediahub/2021/02/6ec15c54a93144dcad71b7e4894bebf5.jpg",
		subText: "현재 1.8만 ~ 2.0만",
		status: 0,
	},
	{
		text: "용산역",
		image: "https://mediahub.seoul.go.kr/uploads/mediahub/2021/02/6ec15c54a93144dcad71b7e4894bebf5.jpg",
		subText: "현재 1.8만 ~ 2.0만",
		status: 0,
	},
];

const cardSItems: Array<CardSItem> = [
	{
		id: 0,
		text: "동작충효길",
		type: "카페",
		rep: "good",
		reviews: 0,
		isFromUser: true,
		distance: 1.2,
	},
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
];
