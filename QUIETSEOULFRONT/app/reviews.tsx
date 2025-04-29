import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import Divider from "@/components/divider/Divider";
import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import BottomMargin from "@/components/others/BottomMargin";
import {
	Body2,
	Body3,
	Body5,
	Heading2,
	Heading3,
	Heading4,
} from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { fetchPlaceDetail } from "@/data/places";
import { fetchPlaceReviews } from "@/data/reviews";
import { PlaceDetailData } from "@/types/places";
import { ReviewItem } from "@/types/review";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
	FlatList,
	Image,
	ListRenderItem,
	SafeAreaView,
	StyleSheet,
	View,
} from "react-native";

type Props = {};

const reviews = (props: Props) => {
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

	const imageSrc =
		"https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/07/10/MIwt/5pXvYOvGAg.jpg";
	const placeName = placeDetail.name;
	const placeType = placeDetail.category;
	const address = placeDetail.address;

	React.useEffect(() => {
		const getPlaceDetail = async () => {
			await fetchPlaceDetail(details as string)
				.then((res) => {
					setPlaceDetail(res);
				})
				.catch((err) => {
					alert("장소 정보를 불러오지 못했습니다.");
				});
		};

		const getPlaceReviews = async () => {
			await fetchPlaceReviews(details as string)
				.then((res) => {
					setReviews(res);
				})
				.catch((err) => {
					alert("리뷰 정보를 불러오지 못했습니다.");
				});
		};

		AsyncStorage.getItem("jwt").then((res) => {
			jwt.current = res;
		});

		getPlaceDetail();
		getPlaceReviews();
	}, []);

	const renderItems: ListRenderItem<ReviewItem> = React.useCallback(
		({ item }) => (
			<View style={styles.reviewListRowContainer}>
				<View style={styles.reviewListRowTopContentContainer}>
					<Heading3>
						{/* {`${getRepEmoticon(item.congestionLevel)} ${getRepText(item.congestionLevel)}`} */}
						asd
					</Heading3>
					<Body5 color={Colors.gray[300]}>{item.visitDate}</Body5>
				</View>
				<View style={styles.reviewListRowBottomContentContainer}>
					<Body2>{item.writerUsername}</Body2>
					<Body3>{item.comment}</Body3>
				</View>
			</View>
		),
		[]
	);

	const renderHeader = (
		<View style={styles.headerContainer}>
			<View style={styles.infoContainer}>
				<Image
					source={{ uri: imageSrc }}
					style={{ width: 54, height: 54 }}
				/>
				<View style={styles.infoTextContainer}>
					<View style={styles.infoTextBox}>
						<Heading4>{placeName}</Heading4>
						<Body3 color={Colors.gray[800]}>{placeType}</Body3>
					</View>
					<View style={styles.infoTextBox}>
						<Body5 color={Colors.gray[400]}>위치</Body5>
						<View style={styles.addressBox}>
							<Body5 color={Colors.gray[700]}>{address}</Body5>
						</View>
					</View>
				</View>
			</View>
			<Divider variant="bold" />
		</View>
	);

	const renderSeparator = React.useCallback(
		() => (
			<View style={{ paddingHorizontal: 16 }}>
				<Divider variant="light" />
			</View>
		),
		[]
	);

	return (
		<>
			<Stack.Screen
				name="reviews"
				options={{
					headerLeft: () => (
						<View onTouchEnd={() => router.back()}>
							<ChevronLeft24 />
						</View>
					),
					headerTitle: () => (
						<Heading2 color={Colors.white}>후기 전체 보기</Heading2>
					),
				}}
			/>
			<SafeAreaView>
				<FlatList
					data={reviews}
					renderItem={renderItems}
					keyExtractor={(item, idx) => String(item.id) + idx}
					ListHeaderComponent={renderHeader}
					stickyHeaderIndices={[0]}
					ItemSeparatorComponent={renderSeparator}
					stickyHeaderHiddenOnScroll
					ListFooterComponent={<BottomMargin height={128} />}
				/>
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

export default reviews;

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: Colors.white,
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
		paddingTop: 16,
	},
	infoContainer: {
		paddingHorizontal: 16,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		columnGap: 12,
	},
	infoAlign: {
		display: "flex",
		flexDirection: "row",
		columnGap: 12,
	},
	infoTextContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		rowGap: 8,
	},
	infoTextBox: {
		display: "flex",
		flexDirection: "row",
		columnGap: 8,
	},
	addressBox: {
		flex: 1,
		width: "100%",
	},
	reviewListRowContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 2,
		paddingVertical: 16,
		paddingHorizontal: 16,
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
