import { Text, StyleSheet, View, SafeAreaView, Pressable } from "react-native";
import { forwardRef, useCallback } from "react";
import {
	BottomSheetBackdrop,
	BottomSheetFooter,
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Colors } from "@/constants/Colors";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { Calendar } from "react-native-calendars";
import { DateProps } from "@/types/date";
import CalendarArrowLeft from "../icons/CalendarArrowLeft";
import CalendarArrowRight from "../icons/CalendarArrowRight";
import { Body3, Heading2, Heading3 } from "../text/Text";
import React from "react";
import BottomMargin from "../others/BottomMargin";

interface FilterSheetProps {
	date: DateProps;
	onDateSelect?: (date: DateProps) => void;
}

const CalendarSheet = forwardRef<BottomSheetModal, FilterSheetProps>(
	({ date, onDateSelect }, ref) => {
		const [dateString, setDateString] = React.useState(
			`${date.dateString}`
		);

		const today = new Date(Date.now());
		const todayYear = today.getFullYear();
		const todayMonth = today.getMonth() + 1;
		const todayDay = today.getDate();
		const todayString = `${todayYear}-${todayMonth}-${todayDay}`;

		const bottomSheetBackdrop = useCallback(
			(props: any) => (
				<BottomSheetBackdrop
					appearsOnIndex={0}
					disappearsOnIndex={-1}
					{...props}
				/>
			),
			[]
		);

		const renderFooter = useCallback(
			(props: any) => (
				<BottomSheetFooter {...props}>
					<View style={styles.footerContainer}>
						<PrimaryButton>적용하기</PrimaryButton>
					</View>
				</BottomSheetFooter>
			),
			[]
		);

		const handleOnDateSelect = (date: DateProps) => {
			onDateSelect?.(date);
			setDateString(date.dateString);
		};

		return (
			<BottomSheetModalProvider>
				<BottomSheetModal
					ref={ref}
					enableDynamicSizing
					backdropComponent={bottomSheetBackdrop}
					backgroundStyle={{
						backgroundColor: Colors.white,
					}}
					handleIndicatorStyle={styles.indicator}
					// bottomInset={56}
				>
					<BottomSheetView>
						<View style={styles.filterHeaderContainer}>
							<Heading3>캘린더</Heading3>
						</View>
						<Calendar
							markedDates={{
								[dateString]: {
									selected: true,
									customTextStyle: {
										borderRadius: 8,
									},
								},
							}}
							monthFormat="yyyy년 MM월"
							renderArrow={(direction) => {
								if (direction === "left") {
									return <CalendarArrowLeft />;
								} else {
									return <CalendarArrowRight />;
								}
							}}
							renderHeader={(date) =>
								date && (
									<Heading2>{`${date.getFullYear()}년 ${
										date.getMonth() + 1
									}월`}</Heading2>
								)
							}
							dayComponent={({ date, state, marking }) => {
								const itemDate = date
									? new Date(date.dateString)
									: undefined;

								return (
									<Pressable
										onPress={() => {
											if (date)
												handleOnDateSelect({
													dateString: date.dateString,
													year: date.year,
													month: date.month,
													day: date.day,
													timestamp: date.timestamp,
												});
										}}
										style={{
											width: 40,
											height: 40,
											display: "flex",
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
											backgroundColor:
												date?.dateString === dateString
													? Colors.main[700]
													: Colors.white,
											borderRadius: 8,
										}}
									>
										<Body3
											color={
												state === "disabled"
													? Colors.gray[300]
													: date?.dateString ===
													  dateString
													? Colors.white
													: itemDate?.getDay() === 0
													? Colors.warning
													: itemDate?.getDay() === 6
													? Colors.informative
													: Colors.gray[900]
											}
											bold={
												state === "today" ? true : false
											}
										>
											{date?.day}
										</Body3>
									</Pressable>
								);
							}}
						/>
						<BottomMargin height={32} />
					</BottomSheetView>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		);
	}
);

export default CalendarSheet;

const styles = StyleSheet.create({
	indicator: {
		width: 40,
		height: 4,
		backgroundColor: Colors.gray[100],
	},
	footerContainer: {
		backgroundColor: Colors.white,
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	calendarTitle: {
		fontSize: 20,
		lineHeight: 24,
		fontWeight: 600,
		fontFamily: "Pretendard",
		color: Colors.gray[900],
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
});
