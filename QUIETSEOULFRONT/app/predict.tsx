import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import BottomMargin from "@/components/others/BottomMargin";
import DaysStatus from "@/components/others/DaysStatus";
import { Body3, Heading2, Heading4 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { graphData } from "@/data/dummy";
import { DayPredictData } from "@/types/chart";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, ListRenderItem, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { BarChart } from "react-native-gifted-charts";

const predict = () => {
	const { id } = useLocalSearchParams();

	console.log("id", id);

	const placename = "한강공원";

	const renderGraphItem: ListRenderItem<DayPredictData> = React.useCallback(
		({ item }) => {
			return (
				<View style={styles.itemContainer}>
					<View style={styles.graphTitleAlign}>
						<Heading2>{item.day}요일</Heading2>
						<Body3 color={Colors.gray[800]}>
							12시 ~ 18시의 활동을 피해주세요
						</Body3>
					</View>
					<BarChart
						data={item.data}
						// width={Dimensions.get("window").width}
						height={100}
						// hideAxesAndRules
						// hideYAxisText
						noOfSections={2}
						barBorderRadius={4}
						barWidth={8}
						labelWidth={40}
						xAxisLabelTextStyle={{
							textAlign: "left",
							fontSize: 12,
						}}
						spacing={4}
						disablePress
					/>
				</View>
			);
		},
		[]
	);

	return (
		<>
			<Stack.Screen
				name="predict"
				options={{
					headerLeft: () => (
						<View onTouchEnd={() => router.back()}>
							<ChevronLeft24 />
						</View>
					),
					headerTitle: () => (
						<Heading2 color={Colors.white}>예상 한적도</Heading2>
					),
				}}
			/>
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Heading2 color={Colors.main[700]}>{placename}</Heading2>
					<Heading2> 예상 한적도</Heading2>
				</View>
				<DaysStatus />
				<FlatList
					data={graphData}
					renderItem={renderGraphItem}
					contentContainerStyle={{
						rowGap: 40,
					}}
					ListFooterComponent={<BottomMargin height={128} />}
				/>
			</View>
		</>
	);
};

export default predict;

const styles = StyleSheet.create({
	container: {
		padding: 16,
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
	},
	titleContainer: {
		display: "flex",
		flexDirection: "row",
	},
	itemContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
	},
	graphTitleAlign: {
		display: "flex",
		flexDirection: "row",
		columnGap: 8,
		alignItems: "center",
	},
});
