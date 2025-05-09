import FilterSheet from "@/components/bottomsheet/FilterSheet";
import CardStatusFlexible from "@/components/cards/CardStatusFlexible";
import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import BottomMargin from "@/components/others/BottomMargin";
import { Heading2 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { fetchPredictList } from "@/data/predict";
import { PlaceDetailData } from "@/types/places";
import { PredictPlaceData } from "@/types/predict";
import { Stack, router } from "expo-router";
import React from "react";
import { FlatList, ListRenderItem, View, StyleSheet } from "react-native";

const PredictList = () => {
	const [predictPlaces, setPredictPlaces] =
		React.useState<PredictPlaceData[]>();

	const renderItems: ListRenderItem<PredictPlaceData> = React.useCallback(
		({ item }) => (
			<CardStatusFlexible
				name={item.name}
				type={item.type}
				status={item.congestionLevel}
				imageUrl={item.imageUrl}
			/>
		),
		[]
	);

	React.useEffect(() => {
		const getfetchPredictList = async () => {
			const result = await fetchPredictList();

			setPredictPlaces(result);
		};

		getfetchPredictList();
	}, []);

	return (
		<>
			<Stack.Screen
				name="predictList"
				options={{
					headerLeft: () => (
						<View onTouchEnd={() => router.back()}>
							<ChevronLeft24 />
						</View>
					),
					headerTitle: () => (
						<Heading2 color={Colors.white}>
							가장 한적할 장소 추천
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
				</View>
				<FlatList
					data={predictPlaces}
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
		</>
	);
};

export default PredictList;

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
});
