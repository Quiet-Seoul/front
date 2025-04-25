import { Colors } from "@/constants/Colors";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Body3, Caption1 } from "../components/text/Text";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CalendarIcon from "../components/icons/Calendar";
import CalendarSheet from "../components/bottomsheet/CalendarSheet";
import { DateProps } from "@/types/date";

type Props = {
	setBirthday?: (date: DateProps) => void;
};

const LabeledDateInputField = ({ setBirthday }: Props) => {
	const bottomSheetRep = React.useRef<BottomSheetModal | null>(null);

	const today = new Date("2000-01-01");
	const todayYear = today.getFullYear();
	const todayMonth = today.getMonth() + 1;
	const todayDay = today.getDate();

	const [dateData, setDateData] = React.useState<DateProps>({
		dateString: `${todayYear}-${todayMonth}-${todayDay}`,
		year: todayYear,
		month: todayMonth,
		day: todayDay,
		timestamp: Date.now(),
	});

	const handleDateChange = (date: DateProps) => {
		setDateData(date);
		setBirthday?.(date);
	};

	return (
		<>
			<View style={styles.container}>
				<Caption1 color={Colors.gray[900]}>생년월일</Caption1>
				<Pressable
					style={styles.inputField}
					onPress={() => bottomSheetRep.current?.present()}
				>
					<CalendarIcon />
					<Body3
						color={Colors.gray[900]}
					>{`${dateData.year}년 ${dateData.month}월 ${dateData.day}일`}</Body3>
				</Pressable>
			</View>
			<CalendarSheet
				ref={bottomSheetRep}
				date={dateData}
				onDateSelect={handleDateChange}
			/>
		</>
	);
};

export default LabeledDateInputField;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		rowGap: 4,
	},
	inputField: {
		width: 240,
		padding: 8,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: Colors.gray[200],
		display: "flex",
		flexDirection: "row",
		columnGap: 8,
	},
});
