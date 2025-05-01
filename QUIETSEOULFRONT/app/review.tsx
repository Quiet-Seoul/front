import CalendarSheet from "@/components/bottomsheet/CalendarSheet";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import RadioButton, { RadioProvider } from "@/components/buttons/RadioButton";
import Divider from "@/components/divider/Divider";
import Camera from "@/components/icons/Camera";
import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import DateField from "@/components/inputField/DateField";
import TextBox from "@/components/inputField/TextBox";
import BottomMargin from "@/components/others/BottomMargin";
import {
	Heading4,
	Body3,
	Body5,
	Heading2,
	Caption1,
	Caption3,
} from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { fetchPlaceDetail } from "@/data/places";
import { DateProps } from "@/types/date";
import { PlaceDetailData } from "@/types/places";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
	StyleSheet,
	View,
	Image,
	TouchableWithoutFeedback,
	Keyboard,
	SafeAreaView,
	Pressable,
	ImageBackground,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import Delete from "@/components/icons/Delete";
import { sendPlaceReview } from "@/data/reviews";

type Props = {};

const review = (props: Props) => {
	const { details } = useLocalSearchParams();

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

	const imageSrc =
		"https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/07/10/MIwt/5pXvYOvGAg.jpg";
	const placeName = placeDetail.name;
	const placeType = placeDetail.category;
	const address = placeDetail.address;

	const bottomSheetRep = React.useRef<BottomSheetModal | null>(null);

	const today = new Date("2000-01-01");
	const todayYear = today.getFullYear();
	const todayMonth = today.getMonth() + 1;
	const todayDay = today.getDate();

	const [dateData, setDateData] = React.useState<DateProps>({
		dateString: `${todayYear}-${todayMonth}-${todayDay}`,
		year: todayYear,
		month: todayMonth,
		day: todayDay,
		timestamp: Date.now(),
	});

	const congestionLevel = React.useRef<string>("");
	const comment = React.useRef<string>("");

	const handleCrowdLevel = (level: string) => {
		congestionLevel.current = level;
	};

	const handleDateChange = (date: DateProps) => {
		setDateData(date);
	};

	const handleChangeText = (text: string) => {
		comment.current = text;
	};

	const handleReviewSubmit = async () => {
		const reviewForm = new FormData();

		images?.forEach((item) => {
			reviewForm.append("imageUrlList", {
				uri: item.uri,
				type: "image/png",
				name: item.fileName,
			} as any);
		});

		reviewForm.append("congestionLevel", congestionLevel.current);
		reviewForm.append("comment", comment.current);
		reviewForm.append("visitDate", dateData.dateString);

		await sendPlaceReview(placeDetail.id, reviewForm)
			.then((res) => {
				console.log(res);
				alert("성공적으로 리뷰를 등록했습니다!");
			})
			.catch((err) => {
				console.log(err);
				alert("리뷰 등록에 실패했습니다.");
			});
	};

	const [images, setImages] = React.useState<
		ImagePicker.ImagePickerAsset[] | undefined
	>(undefined);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			quality: 1,
			allowsMultipleSelection: true,
		});

		if (!result.canceled) {
			const imageArr = result.assets.filter(
				(item) =>
					!images
						?.map((item) => item.fileName)
						.includes(item.fileName)
			);
			setImages(images ? imageArr.concat(images) : imageArr);
		}
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

		getPlaceDetail();
	}, []);

	return (
		<SafeAreaView style={{ position: "relative", flex: 1 }}>
			<Stack.Screen
				name="review"
				options={{
					// headerShown: false,
					headerLeft: () => (
						<View onTouchEnd={() => router.back()}>
							<ChevronLeft24 />
						</View>
					),
					headerTitle: () => (
						<Heading2 color={Colors.white}>후기 남기기</Heading2>
					),
				}}
			/>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<View style={styles.infoContainer}>
							<Image
								source={{ uri: imageSrc }}
								style={{ width: 54, height: 54 }}
							/>
							<View style={styles.infoTextContainer}>
								<View style={styles.infoTextBox}>
									<Heading4>{placeName}</Heading4>
									<Body3 color={Colors.gray[800]}>
										{placeType}
									</Body3>
								</View>
								<View style={styles.infoTextBox}>
									<Body5 color={Colors.gray[400]}>위치</Body5>

									<View style={styles.addressBox}>
										<Body5 color={Colors.gray[700]}>
											{address}
										</Body5>
									</View>
								</View>
							</View>
						</View>
						<Divider variant="light" />
					</View>
					<ScrollView
						contentContainerStyle={{
							paddingVertical: 16,
							display: "flex",
							flexDirection: "column",
							rowGap: 16,
						}}
					>
						<View style={styles.starContainer}>
							<Heading2>방문하신 장소는 어떠셨나요?</Heading2>
							<View style={styles.starAlign}>
								<RadioProvider>
									<RadioButton
										text="여유"
										value="0"
										onSelect={handleCrowdLevel}
									/>
									<RadioButton
										text="보통"
										value="1"
										onSelect={handleCrowdLevel}
									/>
									<RadioButton
										text="북적"
										value="2"
										onSelect={handleCrowdLevel}
									/>
									<RadioButton
										text="혼잡"
										value="3"
										onSelect={handleCrowdLevel}
									/>
								</RadioProvider>
							</View>
							<BottomMargin height={32} />
						</View>
						<View style={styles.dateContainer}>
							<Heading2>방문 날짜</Heading2>
							<DateField
								onPress={() =>
									bottomSheetRep.current?.present()
								}
								dateString={dateData.dateString}
							/>
						</View>
						<View style={styles.dateContainer}>
							<Heading2>사진 업로드</Heading2>
							<ScrollView
								contentContainerStyle={styles.imageContainer}
								horizontal
								showsHorizontalScrollIndicator={false}
							>
								<Pressable
									style={styles.imageUploadBox}
									onPress={pickImage}
								>
									<Camera />
									<Caption1 color={Colors.gray[400]}>
										0 / 5
									</Caption1>
								</Pressable>
								{images?.map((item, idx) => (
									<ImageBackground
										key={idx}
										source={{
											uri:
												item.uri ||
												process.env
													.EXPO_PUBLIC_IMAGE_PLACEHOLDER,
										}}
										style={styles.imageBox}
										imageStyle={styles.imageContentBox}
									>
										<Pressable
											style={styles.imageDeleteBox}
											onPress={() =>
												setImages((prev) =>
													prev?.filter(
														(elem) =>
															elem.fileName !==
															item.fileName
													)
												)
											}
										>
											<Delete />
										</Pressable>
									</ImageBackground>
								))}
							</ScrollView>
						</View>
						<View style={styles.commentContainer}>
							<Heading2>후기 작성</Heading2>
							<TextBox onChangeText={handleChangeText} />
						</View>
					</ScrollView>
					<View style={styles.bottomButtonContainer}>
						<PrimaryButton onPress={handleReviewSubmit}>
							작성 완료
						</PrimaryButton>
					</View>
				</View>
			</TouchableWithoutFeedback>
			<CalendarSheet
				ref={bottomSheetRep}
				date={dateData}
				onDateSelect={handleDateChange}
			/>
		</SafeAreaView>
	);
};

export default review;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
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
	starContainer: {
		paddingHorizontal: 16,
		display: "flex",
		flexDirection: "column",
		rowGap: 12,
	},
	starAlign: {
		display: "flex",
		flexDirection: "row",
		// justifyContent: "space-around",
		columnGap: 16,
	},
	dateContainer: {
		paddingHorizontal: 16,
		display: "flex",
		flexDirection: "column",
		rowGap: 8,
	},
	commentContainer: {
		paddingHorizontal: 16,
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
	},
	bottomButtonContainer: {
		flex: 1,
		width: "100%",
		backgroundColor: Colors.white,
		paddingHorizontal: 16,
		paddingVertical: 8,
		// position: "absolute",
		// bottom: 0,
		borderTopWidth: 1,
		borderTopColor: Colors.gray[100],
	},
	imageContainer: {
		display: "flex",
		flexDirection: "row",
		columnGap: 8,
		alignItems: "center",
	},
	imageUploadBox: {
		width: 96,
		height: 96,
		backgroundColor: Colors.gray[100],
		borderRadius: 4,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		rowGap: 2,
	},
	imageBox: {
		width: 96,
		height: 96,
	},
	imageContentBox: {
		borderRadius: 4,
	},
	imageDeleteBox: {
		position: "absolute",
		top: 4,
		right: 4,
	},
});
