import React, { forwardRef, useCallback, useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Calendar } from "react-native-calendars";
import { DateProps } from "@/types/date";
import { Colors } from "@/constants/Colors";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { Body3, Heading2, Heading3 } from "../text/Text";
import CalendarArrowLeft from "../icons/CalendarArrowLeft";
import CalendarArrowRight from "../icons/CalendarArrowRight";
import BottomMargin from "../others/BottomMargin";

interface FilterSheetProps {
  date: DateProps;
  onDateSelect?: (date: DateProps) => void;
}

const CalendarSheet = forwardRef<BottomSheetModal, FilterSheetProps>(
  ({ date, onDateSelect }, ref) => {
    const [dateString, setDateString] = useState(date.dateString);
    const [currentYear, setCurrentYear] = useState(date.year);
    const [currentMonth, setCurrentMonth] = useState(date.month);

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

    const handleOnDateSelect = (selected: DateProps) => {
      onDateSelect?.(selected);
      setDateString(selected.dateString);
    };

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          enableDynamicSizing
          backdropComponent={bottomSheetBackdrop}
          backgroundStyle={{ backgroundColor: Colors.white }}
          handleIndicatorStyle={styles.indicator}
        >
          <BottomSheetView>
            <View style={styles.filterHeaderContainer}>
              <Heading3>캘린더</Heading3>
            </View>

            {/* ✅ 연도 이동 버튼 */}
            <View style={styles.yearNavigation}>
              <Pressable onPress={() => setCurrentYear((prev) => prev - 1)}>
                <Text style={styles.yearButton}>◀</Text>
              </Pressable>
              <Heading2>{currentYear}년</Heading2>
              <Pressable onPress={() => setCurrentYear((prev) => prev + 1)}>
                <Text style={styles.yearButton}>▶</Text>
              </Pressable>
            </View>

            <Calendar
              key={`${currentYear}-${currentMonth}`}
              current={`${currentYear}-${currentMonth
                .toString()
                .padStart(2, "0")}-01`}
              onMonthChange={(month) => {
                setCurrentYear(month.year);
                setCurrentMonth(month.month);
              }}
              markedDates={{
                [dateString]: {
                  selected: true,
                  customTextStyle: {
                    borderRadius: 8,
                  },
                },
              }}
              renderArrow={(direction) =>
                direction === "left" ? (
                  <CalendarArrowLeft />
                ) : (
                  <CalendarArrowRight />
                )
              }
              renderHeader={(date) =>
                date && (
                  <Heading2>{`${date.getFullYear()}년 ${
                    date.getMonth() + 1
                  }월`}</Heading2>
                )
              }
              dayComponent={({ date, state }) => {
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
                          : date?.dateString === dateString
                          ? Colors.white
                          : itemDate?.getDay() === 0
                          ? Colors.warning
                          : itemDate?.getDay() === 6
                          ? Colors.informative
                          : Colors.gray[900]
                      }
                      bold={state === "today"}
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
  filterHeaderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  yearNavigation: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 16,
    marginVertical: 12,
  },
  yearButton: {
    fontSize: 24,
    color: Colors.gray[700],
    paddingHorizontal: 8,
  },
});
