import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import ChevronRight36 from "@/components/icons/ChevronRight36";
import BottomMargin from "@/components/others/BottomMargin";
import { Body3, Heading1, Heading2 } from "@/components/text/Text";
import cityList from "@/constants/Cities";
import { Colors } from "@/constants/Colors";
import { fetchDistrictAreas } from "@/data/area";
import { getRepTextToColor } from "@/lib/util";
import { AreaData } from "@/types/area";
import { CardXLItem } from "@/types/card";
import { DistrictData } from "@/types/district";
import { Stack, router } from "expo-router";
import React from "react";
import {
	View,
	StyleSheet,
	ImageBackground,
	FlatList,
	ListRenderItem,
	SafeAreaView,
	Pressable,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type WideCardProps = {
	text: string;
	subText?: string;
	image?: string;
	status: "여유" | "보통" | "약간 붐빔" | "붐빔";
	areaCd: string;
};

const WideCard = ({
	text,
	subText,
	image = process.env.EXPO_PUBLIC_IMAGE_PLACEHOLDER,
	status,
	areaCd,
}: WideCardProps) => {
	const statusColor = {
		여유: Colors.status.positive,
		보통: Colors.status.neutral,
		"약간 붐빔": Colors.status.negative,
		붐빔: Colors.status.veryNegative,
	};

	return (
		<Pressable
			style={[
				styles.cardContainer,
				{ backgroundColor: getRepTextToColor(status) },
			]}
			onPress={() =>
				router.push({
					pathname: "/quietplaces",
					params: { areaCd: areaCd },
				})
			}
		>
			<ImageBackground
				source={{ uri: image }}
				style={styles.cardImageBackground}
				imageStyle={styles.cardImageStyle}
			>
				<View style={styles.cardDim}>
					<View style={styles.cardTextContainer}>
						<Heading1 color={Colors.white}>{text}</Heading1>
						<Body3 color={Colors.white}>{subText}</Body3>
					</View>
					<View style={styles.cardChevron}>
						<ChevronRight36 />
					</View>
				</View>
			</ImageBackground>
		</Pressable>
	);
};

type Props = {};

const cities = (props: Props) => {
	const [district, setDistrict] = React.useState<DistrictData>();
	const [isFocus, setIsFocus] = React.useState(false);
	const [areaDatas, setAreaDatas] = React.useState<AreaData[]>();

	const renderItems: ListRenderItem<AreaData> = React.useCallback(
		({ item }) => (
			<WideCard
				status={item.areaCongestLvl}
				text={item.areaNm}
				subText={item.areaCongestMsg}
				image={process.env.EXPO_PUBLIC_IMAGE_PLACEHOLDER}
				areaCd={item.areaCd}
			/>
		),
		[]
	);

	React.useEffect(() => {
		const getDistrictAreas = async () => {
			if (district) {
				const result = await fetchDistrictAreas(district.id);

				setAreaDatas(result);
			}
		};

		getDistrictAreas();
	}, [district]);

	return (
		<>
			<Stack.Screen
				name="cities"
				options={{
					headerLeft: () => (
						<View onTouchEnd={() => router.back()}>
							<ChevronLeft24 />
						</View>
					),
					headerTitle: () => (
						<Heading2 color={Colors.white}>한적한 지역</Heading2>
					),
				}}
			/>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					<View style={styles.dropdownContainer}>
						<Heading2>시 · 구 선택</Heading2>
						<Dropdown
							style={[
								styles.dropdown,
								isFocus && { borderColor: "blue" },
							]}
							fontFamily="Pretendard"
							placeholderStyle={styles.placeholderStyle}
							selectedTextStyle={styles.selectedTextStyle}
							inputSearchStyle={styles.inputSearchStyle}
							iconStyle={styles.iconStyle}
							data={cityList}
							search
							maxHeight={300}
							labelField="label"
							valueField="id"
							placeholder={!isFocus ? "지역 선택" : "..."}
							searchPlaceholder="검색어 입력"
							value={district}
							onFocus={() => setIsFocus(true)}
							onBlur={() => setIsFocus(false)}
							onChange={(item) => {
								setDistrict(item);
								setIsFocus(false);
							}}
						/>
					</View>
					<View style={styles.cardList}>
						<FlatList
							data={areaDatas}
							renderItem={renderItems}
							contentContainerStyle={{
								flexGrow: 1,
								paddingHorizontal: 16,
								rowGap: 16,
							}}
							ListFooterComponent={<BottomMargin height={128} />}
						/>
					</View>
					{/* <View style={styles.dropdownContainer}>
						<Heading2>한적한 지역 추천</Heading2>
						<View style={styles.cardList}>
							{cardItems.map((item, idx) => (
								<WideCard
									key={idx}
									status={item.status}
									text={item.text}
									subText={item.subText}
									image={item.image}
								/>
							))}
						</View>
					</View> */}
				</View>
			</SafeAreaView>
		</>
	);
};

export default cities;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 16,
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
	},
	cardList: {
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
	},
	cardContainer: {
		display: "flex",
		height: 120,
		paddingLeft: 8,
		borderRadius: 8,
	},
	cardImageBackground: {
		height: "100%",
	},
	cardImageStyle: {
		borderRadius: 8,
	},
	cardTextContainer: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		rowGap: 8,
		justifyContent: "flex-end",
	},
	cardDim: {
		height: "100%",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 8,
		backgroundColor: "#00000040",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	cardChevron: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	dropdownContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
		paddingHorizontal: 16,
		borderRadius: 8,
	},
	dropdown: {
		borderColor: Colors.gray[300],
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: "absolute",
		backgroundColor: "white",
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
		borderRadius: 8,
	},
	placeholderStyle: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: 400,
		color: Colors.gray[900],
	},
	selectedTextStyle: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: 400,
		color: Colors.gray[900],
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 14,
		lineHeight: 20,
		fontWeight: 400,
		color: Colors.gray[900],
	},
});
