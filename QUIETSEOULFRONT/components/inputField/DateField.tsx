import { Colors } from "@/constants/Colors";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Calendar from "../icons/Calendar";
import { Body3 } from "../text/Text";
import { getWeekdayKR } from "@/lib/util";

type Props = {
	onPress?: () => void;
	dateString: string;
};

const DateField = ({ onPress, dateString }: Props) => {
	const today = new Date(dateString);
	const todayYear = today.getFullYear();
	const todayMonth = today.getMonth() + 1;
	const todayDay = today.getDate();
	const todayWeekday = getWeekdayKR(today.getDay());

	return (
		<Pressable style={styles.container} onPress={onPress}>
			<Calendar />
			<Body3
				color={Colors.gray[900]}
			>{`${todayYear}년 ${todayMonth}월 ${todayDay}일 ${todayWeekday}요일`}</Body3>
		</Pressable>
	);
};

export default DateField;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		padding: 12,
		display: "flex",
		flexDirection: "row",
		columnGap: 8,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: Colors.gray[200],
	},
});
