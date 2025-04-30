import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import ChevronRight from "../icons/ChevronRight";
import { Body3, Caption3, Heading2 } from "../text/Text";
import { Colors } from "@/constants/Colors";

type StatusTextProps = {
	status: 0 | 1 | 2 | 3;
};

const StatusText = ({ status }: StatusTextProps) => {
	switch (status) {
		case 0:
			return <Body3 color={Colors.status.positive}>여유</Body3>;
		case 1:
			return <Body3 color={Colors.status.neutral}>보통</Body3>;
		case 2:
			return <Body3 color={Colors.status.negative}>조금 혼잡</Body3>;
		case 3:
			return <Body3 color={Colors.status.veryNegative}>혼잡</Body3>;
	}
};

type StatusTitleProps = {
	text: string;
	status: 0 | 1 | 2 | 3;
	subText?: string;
	onPress?: () => void;
};

const StatusTitle = ({ text, subText, status, onPress }: StatusTitleProps) => {
	return (
		<Pressable style={styles.titleContainer} onPress={onPress}>
			{subText && (
				<View>
					<Caption3 color={Colors.gray[400]}>{subText}</Caption3>
				</View>
			)}
			<View style={styles.titleBox}>
				<View style={styles.title}>
					<Heading2 color={Colors.main[700]}>{text}</Heading2>
					<StatusText status={status} />
				</View>
				<View>
					<ChevronRight />
				</View>
			</View>
		</Pressable>
	);
};

export default StatusTitle;

const styles = StyleSheet.create({
	titleContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 2,
	},
	titleBox: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		columnGap: 8,
	},
	title: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		columnGap: 8,
	},
});
