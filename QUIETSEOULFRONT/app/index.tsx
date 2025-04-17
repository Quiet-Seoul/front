import { View, ScrollView } from "react-native";
import HomeCarousel from "@/components/carousel/HomeCarousel";
import React from "react";
import CardL from "@/components/cards/CardL";
import DoubleHighlightTitle from "@/components/title/DoubleHighlightTitle";
import CardXL from "@/components/cards/CardXL";
import Title from "@/components/title/Title";
import { CardLItem, CardSItem, CardXLItem } from "@/types/card";
import CardS from "@/components/cards/CardS";
import SingleHighlightTitle from "@/components/title/SingleHighlightTitle";
import { router } from "expo-router";

export default function Landing() {
	return (
		<ScrollView>
			<HomeCarousel items={carouselItems} />
			<View
				style={{
					display: "flex",
					flexDirection: "column",
					rowGap: 64,
					paddingHorizontal: 16,
					paddingVertical: 64,
				}}
			>
				<View
					style={{
						display: "flex",
						flexDirection: "column",
						rowGap: 16,
					}}
				>
					<DoubleHighlightTitle
						text1="교대역"
						text2="카페"
						subText="*현재 위치 기반"
						onTouchEnd={() => router.push("/quietplaces")}
					/>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							columnGap: 8,
						}}
					>
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
				<View
					style={{
						display: "flex",
						flexDirection: "column",
						rowGap: 16,
					}}
				>
					<Title
						text="현재 한적한 지역 추천"
						onTouchEnd={() => router.push("/cities")}
					/>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							columnGap: 8,
						}}
					>
						{cardXLItems.map((item, idx) => (
							<CardXL
								key={idx}
								text={item.text}
								image={item.image}
								subText={item.subText}
								status={0}
							/>
						))}
					</View>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "column",
						rowGap: 16,
					}}
				>
					<SingleHighlightTitle
						text1="사용자"
						text2="기반 추천"
						highlight="제보"
						onTouchEnd={() => router.push("/recommand")}
					/>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							columnGap: 8,
						}}
					>
						{cardSItems.map((item, idx) => (
							<CardS
								key={idx}
								type={item.type}
								text={item.text}
								rep={item.rep}
								reviews={item.reviews}
								distance={item.distance}
								isFromUser
							/>
						))}
					</View>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "column",
						rowGap: 16,
					}}
				>
					<SingleHighlightTitle
						text1="사용자"
						text2="기반 추천"
						highlight="후기"
						onTouchEnd={() => router.push("/recommand")}
					/>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							columnGap: 8,
						}}
					>
						{cardSItems.map((item, idx) => (
							<CardS
								key={idx}
								type={item.type}
								text={item.text}
								rep={item.rep}
								reviews={item.reviews}
								distance={item.distance}
								isFromUser
							/>
						))}
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

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
		text: "동작충효길",
		type: "카페",
		rep: "good",
		reviews: 0,
		isFromUser: true,
		distance: 1.2,
	},
	{
		text: "동작충효길",
		type: "카페",
		rep: "good",
		reviews: 0,
		isFromUser: true,
		distance: 1.2,
	},
	{
		text: "동작충효길",
		type: "카페",
		rep: "good",
		reviews: 0,
		isFromUser: true,
		distance: 1.2,
	},
];
