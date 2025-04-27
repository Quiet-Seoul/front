import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import {
	View,
	StyleSheet,
	FlatList,
	ListRenderItem,
	Pressable,
} from "react-native";
import { Heading2, Heading3, Heading4 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import Filter from "@/components/icons/Filter";
import { CardSItem } from "@/types/card";
import CardFlexible from "@/components/cards/CardFlexible";
import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import BottomMargin from "@/components/others/BottomMargin";
import FilterSheet from "@/components/bottomsheet/FilterSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import RadioButton, { RadioProvider } from "@/components/buttons/RadioButton";
import CardStatusFlexible from "@/components/cards/CardStatusFlexible";

const aligns = [
	{ label: "전체", value: "all" },
	{ label: "한적도", value: "level" },
	{ label: "거리", value: "distance" },
	{ label: "후기", value: "reviews" },
];

const filters = [
	{ label: "전체", value: "all" },
	{ label: "공원", value: "park" },
	{ label: "카페", value: "cafe" },
	{ label: "식당", value: "restaurant" },
];

const BottomSheetFilters = () => {
	return (
		<View style={styles.filterContainer}>
			<View style={styles.filterHeaderContainer}>
				<Heading3>필터</Heading3>
			</View>
			<View style={styles.filterContentContainer}>
				<View style={styles.filterContentRow}>
					<Heading2>정렬</Heading2>
					<View style={styles.filterContentRowButtons}>
						<RadioProvider>
							{aligns.map((item, idx) => (
								<RadioButton
									key={`${item.value}_${idx}`}
									text={item.label}
									value={item.value}
								/>
							))}
						</RadioProvider>
					</View>
				</View>
				<View style={styles.filterContentRow}>
					<Heading2>필터</Heading2>
					<View style={styles.filterContentRowButtons}>
						<RadioProvider>
							{filters.map((item, idx) => (
								<RadioButton
									key={`${item.value}_${idx}`}
									text={item.label}
									value={item.value}
								/>
							))}
						</RadioProvider>
					</View>
				</View>
			</View>
		</View>
	);
};

type Props = {
	type: string;
};

const recommand = () => {
	const bottomSheetRep = React.useRef<BottomSheetModal | null>(null);

	const { type } = useLocalSearchParams();

	const renderItems: ListRenderItem<CardSItem> = React.useCallback(
		({ item }) => {
			if (type === "predict") {
				return (
					<CardStatusFlexible
						id={item.id}
						text={item.text}
						subText={"asdfasdf"}
						status={0}
					/>
				);
			} else {
				return (
					<CardFlexible
						id={item.id}
						type={item.type}
						text={item.text}
						rep={item.rep}
						reviews={item.reviews}
						distance={item.distance}
						isFromUser
					/>
				);
			}
		},
		[]
	);

	const BottomSheetFiltersMemo = React.memo(BottomSheetFilters);

	return (
		<>
			<Stack.Screen
				name="recommand"
				options={{
					headerLeft: () => (
						<View onTouchEnd={() => router.back()}>
							<ChevronLeft24 />
						</View>
					),
					headerTitle: () => (
						<Heading2 color={Colors.white}>
							사용자 제보 기반 추천
						</Heading2>
					),
				}}
			/>
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<View style={styles.titleAlign}>
						<Heading2 color={Colors.gray[900]}>사용자</Heading2>
						<Heading2 color={Colors.main[700]}> 제보 </Heading2>
						<Heading2 color={Colors.gray[900]}>기반 추천</Heading2>
					</View>
					<Pressable
						style={styles.filterButtonContainer}
						onPress={() => bottomSheetRep.current?.present()}
					>
						<Filter />
						<Heading3 color={Colors.gray[400]}>필터</Heading3>
					</Pressable>
				</View>
				<FlatList
					data={cardSItems}
					renderItem={renderItems}
					keyExtractor={(_, index) => `CARDITEM_${index}`}
					contentContainerStyle={{
						paddingHorizontal: 16,
						rowGap: 40,
					}}
					columnWrapperStyle={{
						justifyContent: "space-between",
					}}
					ListFooterComponent={<BottomMargin height={128} />}
					numColumns={2}
				/>
			</View>
			<FilterSheet
				ref={bottomSheetRep}
				content={<BottomSheetFiltersMemo />}
			/>
		</>
	);
};

export default recommand;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
		paddingVertical: 16,
	},
	titleContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	titleAlign: {
		display: "flex",
		flexDirection: "row",
	},
	filterButtonContainer: {
		display: "flex",
		flexDirection: "row",
		columnGap: 8,
	},
	filterContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	filterHeaderContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray[100],
	},
	filterContentContainer: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		display: "flex",
		flexDirection: "column",
	},
	filterContentRow: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		columnGap: 32,
		paddingVertical: 4,
	},
	filterContentRowButtons: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		columnGap: 8,
	},
	filterFooterContainer: {
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
});

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
		id: 1,
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
		id: 1,
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
		id: 1,
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
];
