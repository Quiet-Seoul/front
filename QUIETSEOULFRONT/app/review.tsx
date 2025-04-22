import RadioButton, { RadioProvider } from "@/components/buttons/RadioButton";
import Divider from "@/components/divider/Divider";
import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import DateField from "@/components/inputField/DateField";
import TextBox from "@/components/inputField/TextBox";
import BottomMargin from "@/components/others/BottomMargin";
import { Heading4, Body3, Body5, Heading2 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { Stack, router } from "expo-router";
import React from "react";
import {
	StyleSheet,
	View,
	Image,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";

type Props = {};

const review = (props: Props) => {
	const imageSrc =
		"https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/07/10/MIwt/5pXvYOvGAg.jpg";
	const placeName = "뉴욕";
	const placeType = "공원";
	const address = "미국 뉴욕주 뉴욕 맨해튼";

	return (
		<>
			<Stack.Screen
				name="review"
				options={{
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
									<Body5 color={Colors.gray[700]}>
										{address}
									</Body5>
								</View>
							</View>
						</View>
						<Divider variant="light" />
					</View>
					<View style={styles.starContainer}>
						<Heading2>방문하신 장소는 어떠셨나요?</Heading2>
						<View style={styles.starAlign}>
							<RadioProvider>
								<RadioButton text="여유" value="0" />
								<RadioButton text="보통" value="1" />
								<RadioButton text="북적" value="2" />
								<RadioButton text="혼잡" value="3" />
							</RadioProvider>
						</View>
					</View>
					<BottomMargin height={32} />
					<View style={styles.dateContainer}>
						<Heading2>방문 날짜</Heading2>
						<DateField />
						{/* DateField에 바텀 시트 캘린더 추가하기 */}
					</View>
					<View style={styles.commentContainer}>
						<Heading2>후기 작성</Heading2>
						<TextBox />
					</View>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
};

export default review;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
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
		display: "flex",
		flexDirection: "column",
		rowGap: 8,
	},
	infoTextBox: {
		display: "flex",
		flexDirection: "row",
		columnGap: 8,
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
});
