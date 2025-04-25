import { Colors } from "@/constants/Colors";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Body2 } from "../text/Text";
import { getAlignedDaysFromTheDay, getWeekdayKR } from "@/lib/util";

type StatusItemProps = {
	day: string;
	status: 0 | 1 | 2 | 3;
};

const StatusItem = ({ day, status }: StatusItemProps) => {
	let lineColor = "";

	switch (status) {
		case 0:
			lineColor = Colors.status.positive;
			break;
		case 1:
			lineColor = Colors.status.neutral;
			break;
		case 2:
			lineColor = Colors.status.negative;
			break;
		case 3:
			lineColor = Colors.status.veryNegative;
			break;
	}

	return (
		<View style={styles.item}>
			<View style={styles.textView}>
				<Body2 color={Colors.gray[800]}>{day}요일</Body2>
			</View>
			<View style={[styles.statusLine, { backgroundColor: lineColor }]} />
		</View>
	);
};

const DaysStatus = () => {
	const today = new Date(Date.now());
	const days = getAlignedDaysFromTheDay(getWeekdayKR(today.getDay()));

	return (
		<View style={styles.container}>
			{days?.map((item, idx) => (
				<StatusItem key={idx} day={item} status={0} />
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
