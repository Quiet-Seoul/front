import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import BottomMargin from "@/components/others/BottomMargin";
import DaysStatus from "@/components/others/DaysStatus";
import { Body3, Heading2 } from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import {
	fetchAreaWeeklyStatus,
	fetchAreaWeeklyStatusDetail,
} from "@/data/predict";
import { getRepStringToNumber, getWeekdayKR } from "@/lib/util";
import { DayStatus, WeeklyStatus } from "@/types/predict";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ListRenderItem, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { BarChart, barDataItem } from "react-native-gifted-charts";

const predict = () => {
	const placeName = useLocalSearchParams().name.toString();
	const placeType = useLocalSearchParams().type.toString();

	const [weeklyStatus, setWeeklyStatus] = React.useState<DayStatus[]>();
	const [weeklyStatusDetail, setWeeklyStatusDetail] =
		React.useState<WeeklyStatus[]>();

	const statusColor = {
		여유: Colors.status.positive,
		보통: Colors.status.neutral,
		"약간 혼잡": Colors.status.negative,
		혼잡: Colors.status.veryNegative,
	};

	React.useEffect(() => {
		const getAreaWeeklyStatus = async () => {
			if (placeName) {
				const result = await fetchAreaWeeklyStatus(placeName);

				setWeeklyStatus(result);
			}
		};

		const getAreaWeeklyStatusDetail = async () => {
			if (placeName && placeType) {
				const result = await fetchAreaWeeklyStatusDetail(
					placeName,
					placeType
				);

				setWeeklyStatusDetail(result);
			}
		};

		getAreaWeeklyStatus();
		getAreaWeeklyStatusDetail();
	}, []);

	const renderGraphItem: ListRenderItem<WeeklyStatus> = React.useCallback(
		({ item }) => {
			const today = new Date(item.date);
			const first = item.hourlyForecasts.findIndex(
				(item) => item.congestionLevel === "혼잡"
			);
			let last = first;

			for (
				let i = first;
				i !== -1 && i < item.hourlyForecasts.length;
				i++
			) {
				if (item.hourlyForecasts[i].congestionLevel !== "혼잡") {
					last = i - 1;
					i = item.hourlyForecasts.length;
				}
			}

			return (
				<View style={styles.itemContainer}>
					<View style={styles.graphTitleAlign}>
						<Heading2>{getWeekdayKR(today.getDay())}요일</Heading2>
						<Body3 color={Colors.gray[800]}>
							{first === -1
								? item.hourlyForecasts.findIndex(
										(item) =>
											item.congestionLevel === "약간 혼잡"
								  ) !== -1
									? "대체적으로 활동하기 좋아요"
									: "사람이 적어 한산해요"
								: `${first}시 ~ ${last}시의 활동을 피해주세요`}
						</Body3>
					</View>
					<BarChart
						data={item.hourlyForecasts.map((elem) => {
							const chartData: barDataItem = {
								label:
									elem.hour % 6
										? undefined
										: String(elem.hour),
								value: elem.stayPopulation,
								frontColor: statusColor[elem.congestionLevel],
							};

							console.log(chartData);

							return chartData;
						})}
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
						yAxisLabelWidth={50}
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
					<Heading2 color={Colors.main[700]}>{placeName}</Heading2>
					<Heading2> 예상 한적도</Heading2>
				</View>
				<DaysStatus data={weeklyStatus || []} />
				<FlatList
					data={weeklyStatusDetail}
					renderItem={renderGraphItem}
					contentContainerStyle={{
						rowGap: 40,
					}}
					ListFooterComponent={<BottomMargin height={256} />}
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
