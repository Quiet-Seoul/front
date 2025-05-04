import { Colors } from "@/constants/Colors";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Body2 } from "../text/Text";
import { getAlignedDaysFromTheDay, getWeekdayKR } from "@/lib/util";
import { DayStatus } from "@/types/predict";

const StatusItem = ({ date, level }: DayStatus) => {
	let lineColor = "";

	switch (level) {
		case "여유":
			lineColor = Colors.status.positive;
			break;
		case "보통":
			lineColor = Colors.status.neutral;
			break;
		case "약간 혼잡":
			lineColor = Colors.status.negative;
			break;
		case "혼잡":
			lineColor = Colors.status.veryNegative;
			break;
	}

	return (
		<View style={styles.item}>
			<View style={styles.textView}>
				<Body2 color={Colors.gray[800]}>{date}요일</Body2>
			</View>
			<View style={[styles.statusLine, { backgroundColor: lineColor }]} />
		</View>
	);
};

type Props = {
	data: DayStatus[];
};

const DaysStatus = ({ data }: Props) => {
	return (
		<View style={styles.container}>
			{data?.map((item, idx) => (
				<StatusItem
					key={idx}
					date={getWeekdayKR(new Date(item.date).getDay())}
					level={item.level}
				/>
			))}
		</View>
	);
};

export default DaysStatus;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: Colors.gray[300],
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	item: {
		paddingHorizontal: 8,
		display: "flex",
		flexDirection: "column",
		rowGap: 8,
	},
	textView: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
	statusLine: {
		height: 4,
		borderRadius: 4,
	},
});
