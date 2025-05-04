import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { Heading2, Heading3, Heading4 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import CardFlexible from "@/components/cards/CardFlexible";
import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import BottomMargin from "@/components/others/BottomMargin";
import FilterSheet from "@/components/bottomsheet/FilterSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import RadioButton, { RadioProvider } from "@/components/buttons/RadioButton";
import { fetchAreaPlaces } from "@/data/places";
import { PlaceDetailData } from "@/types/places";
import { getRepValue } from "@/lib/util";
import { fetchApprovedSuggestions } from "@/data/suggestions";
import { SuggestionData } from "@/types/suggestions";

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

const suggestions = () => {
	const bottomSheetRep = React.useRef<BottomSheetModal | null>(null);

	const [areaPlaces, setAreaPlaces] = React.useState<SuggestionData[]>();

	const renderItems: ListRenderItem<SuggestionData> = React.useCallback(
		({ item }) => (
			<CardFlexible
				id={item.id}
				type={item.category}
				text={item.name}
				rep={getRepValue(item.avgRating)}
				reviews={0}
				distance={0}
				isFromUser
			/>
		),
		[]
	);

	const BottomSheetFiltersMemo = React.memo(BottomSheetFilters);

	React.useEffect(() => {
		const getPlaces = async () => {
			const result = await fetchApprovedSuggestions();

			setAreaPlaces(result);
		};

		getPlaces();
	}, []);

	return (
		<>
			<Stack.Screen
				name="suggestions"
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
					{/* <Pressable
						style={styles.filterButtonContainer}
						onPress={() => bottomSheetRep.current?.present()}
					>
						<Filter />
						<Heading3 color={Colors.gray[400]}>필터</Heading3>
					</Pressable> */}
				</View>
				<FlatList
					data={areaPlaces}
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

export default suggestions;

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
		// justifyContent: "space-between",
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
