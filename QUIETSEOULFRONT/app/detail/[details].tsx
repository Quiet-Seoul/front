import TypeChip from "@/components/chips/TypeChip";
import Divider from "@/components/divider/Divider";
import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import Clipboard from "@/components/icons/Clipboard";
import {
	Body2,
	Body3,
	Body4,
	Body5,
	Heading1,
	Heading2,
	Heading3,
} from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
	ImageBackground,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import * as ClipboardAPI from "expo-clipboard";
import { getRepEmoticon, getRepText } from "@/lib/util";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import Title from "@/components/title/Title";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { CardSItem } from "@/types/card";
import CardSList from "@/components/cards/CardSList";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import BottomMargin from "@/components/others/BottomMargin";
import { fetchPlaceDetail } from "@/data/places";
import { PlaceDetailData } from "@/types/places";
import { ReviewItem } from "@/types/review";
import { fetchPlaceReviews } from "@/data/reviews";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const detail = (props: Props) => {
	const { details } = useLocalSearchParams();

	const jwt = React.useRef<string | null>(null);

	const [placeDetail, setPlaceDetail] = React.useState<PlaceDetailData>({
		id: 0,
		name: "",
		category: "카페",
		subcategory: "",
		areaCd: "",
		address: "",
		lat: 0,
		lng: 0,
		description: "",
		avgRating: 0,
		imageUrl: "",
	});
	const [reviews, setReviews] = React.useState<Array<ReviewItem>>([]);

	const placeName = placeDetail.name;
	const placeType = placeDetail.category;
	const address = placeDetail.address;
	const imageSrc = null;
	const rep = placeDetail.avgRating;
	const emoticon = getRepEmoticon(rep);
	const repText = getRepText(rep);
	const description = placeDetail.description;
	const reviewCount = 19;

	const copyToClipboard = async () => {
		await ClipboardAPI.setStringAsync(address).then(() =>
			alert("클립보드에 복사되었습니다!")
		);
	};

	React.useEffect(() => {
		const getPlaceDetail = async () => {
			await fetchPlaceDetail(details as string)
				.then((res) => {
					setPlaceDetail(res);
				})
				.catch((err) => {
					console.log(err);
					alert("장소 정보를 불러오지 못했습니다.");
				});
		};

		const getPlaceReviews = async () => {
			await fetchPlaceReviews(details as string)
				.then((res) => {
					setReviews(res);
				})
				.catch((err) => {
					console.log(err);
					alert("리뷰 정보를 불러오지 못했습니다.");
				});
		};

		AsyncStorage.getItem("jwt").then((res) => {
			jwt.current = res;
		});

		getPlaceDetail();
		getPlaceReviews();
	}, []);

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
			/>
			<SafeAreaView>
				<ScrollView style={styles.container}>
					<ImageBackground
						source={{
							uri:
								imageSrc ||
								process.env.EXPO_PUBLIC_IMAGE_PLACEHOLDER,
						}}
						style={styles.imageContainer}
					>
						<LinearGradient
							colors={["#00000060", "#00000000"]}
							locations={[0, 0.3]}
							style={styles.dimContainer}
						>
							<Pressable
								style={styles.chevronContainer}
								onPress={() => router.back()}
							>
								<ChevronLeft24 />
							</Pressable>
						</LinearGradient>
					</ImageBackground>
					<View style={styles.contentContainer}>
						<View style={styles.titleRootContainer}>
							<View style={styles.chipContainer}>
								<TypeChip type={placeType} />
							</View>
							<View style={styles.titleAlign}>
								<View style={styles.titleContainer}>
									<Heading1>{placeName}</Heading1>
									<Body5 color={Colors.gray[800]}>
										{address}
									</Body5>
								</View>
								<View style={styles.repContainer}>
									<Heading1>{emoticon}</Heading1>
									<Body4 color={Colors.gray[800]}>
										{repText}
									</Body4>
								</View>
							</View>
						</View>
						<Divider />
						<View>
							<Body3>{description}</Body3>
						</View>
						<View style={styles.mapContainer}>
							<View
								style={{
									height: 200,
									borderRadius: 8,
									borderColor: Colors.gray[300],
									backgroundColor: Colors.gray[100],
								}}
							/>
							<TouchableOpacity
								style={styles.addressAlign}
								onPress={copyToClipboard}
							>
								<Body5 color={Colors.gray[800]}>
									{address}
									<Clipboard />
									복사
								</Body5>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.dividerContainer}>
						<Divider variant="bold" />
					</View>
					<View style={styles.reviewContainer}>
						<View style={styles.reviewTitleContainer}>
							<Heading2>장소 후기</Heading2>
							<Heading2 color={Colors.gray[500]}>
								{reviews.length}
							</Heading2>
						</View>
						<View style={styles.reviewListContainer}>
							{reviews.map((item, idx) => (
								<View
									style={styles.reviewListRowContainer}
									key={`REVIEW_${idx}`}
								>
									<View
										style={
											styles.reviewListRowTopContentContainer
										}
									>
										<Heading3>
											{`${getRepEmoticon(0)} ${getRepText(
												0
											)}`}
										</Heading3>
										<Body5 color={Colors.gray[300]}>
											{item.visitDate}
										</Body5>
									</View>
									<View
										style={
											styles.reviewListRowBottomContentContainer
										}
									>
										<Body2>{item.writerUsername}</Body2>
										<Body3>{item.comment}</Body3>
									</View>
									{idx !== reviews.length - 1 && <Divider />}
								</View>
							))}
							<SecondaryButton
								onPress={() =>
									router.push({
										pathname: "/reviews",
										params: { details: details },
									})
								}
							>
								후기 전체보기
							</SecondaryButton>
						</View>
					</View>
					<CardSList
						titleComponent={
							<Title
								text="유사한 장소 추천"
								onPress={() => router.push("/recommand")}
							/>
						}
						items={cardSItems}
					/>
					<BottomMargin height={128} />
				</ScrollView>
				<View style={styles.bottomButtonContainer}>
					<PrimaryButton
						enabled={jwt.current ? true : false}
						onPress={() => {
							if (jwt.current)
								router.push({
									pathname: "/review",
									params: { details: details },
								});
						}}
					>
						후기 남기기
					</PrimaryButton>
				</View>
			</SafeAreaView>
		</>
	);
};

export default detail;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
	},
	imageContainer: {
		height: 300,
	},
	dimContainer: {
		height: 300,
	},
	chevronContainer: {
		display: "flex",
		flexDirection: "row",
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	contentContainer: {
		display: "flex",
		flexDirection: "column",
		paddingHorizontal: 16,
		paddingVertical: 12,
		rowGap: 12,
	},
	titleRootContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 8,
	},
	titleAlign: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	titleContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		rowGap: 2,
	},
	chipContainer: {
		display: "flex",
		alignSelf: "flex-start",
	},
	repContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 2,
		alignItems: "center",
	},
	mapContainer: {
		paddingTop: 24,
		rowGap: 8,
	},
	addressAlign: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		columnGap: 4,
		alignItems: "center",
	},
	copyContainer: {
		display: "flex",
		flexDirection: "row",
		columnGap: 2,
	},
	dividerContainer: {
		paddingVertical: 16,
	},
	reviewContainer: {
		paddingHorizontal: 16,
		paddingVertical: 16,
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
	},
	reviewTitleContainer: {
		display: "flex",
		flexDirection: "row",
		columnGap: 8,
	},
	reviewListContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
	},
	reviewListRowContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 2,
	},
	reviewListRowTopContentContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	reviewListRowBottomContentContainer: {
		display: "flex",
		flexDirection: "row",
		columnGap: 4,
		marginBottom: 16,
	},
	bottomButtonContainer: {
		width: "100%",
		backgroundColor: Colors.white,
		paddingHorizontal: 16,
		paddingVertical: 8,
		position: "absolute",
		bottom: 0,
		borderTopWidth: 1,
		borderTopColor: Colors.gray[100],
	},
});

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
