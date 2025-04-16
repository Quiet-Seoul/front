import { Colors } from "@/constants/Colors";
import React from "react";
import { View, StyleSheet } from "react-native";
import Park48 from "../icons/Park48";
import { Body5 } from "../text/Text";
import Cafe48 from "../icons/Cafe48";
import Restaurant48 from "../icons/Restaurant48";

type StatusItemProps = {
	type: "공원" | "카페" | "식당";
	status: 0 | 1 | 2 | 3;
};

const StatusItem = ({ type, status }: StatusItemProps) => {
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

	switch (type) {
		case "공원":
			return (
				<View style={styles.item}>
					<Park48 />
					<View style={styles.textView}>
						<Body5 color={Colors.main[700]}>공원</Body5>
					</View>
					<View
						style={[
							styles.statusLine,
							{ backgroundColor: lineColor },
						]}
					/>
				</View>
			);
		case "카페":
			return (
				<View style={styles.item}>
					<Cafe48 />
					<View style={styles.textView}>
						<Body5 color={Colors.main[700]}>카페</Body5>
					</View>
					<View
						style={[
							styles.statusLine,
							{ backgroundColor: lineColor },
						]}
					/>
				</View>
			);
		case "식당":
			return (
				<View style={styles.item}>
					<Restaurant48 />
					<View style={styles.textView}>
						<Body5 color={Colors.main[700]}>식당</Body5>
					</View>
					<View
						style={[
							styles.statusLine,
							{ backgroundColor: lineColor },
						]}
					/>
				</View>
			);
	}
};

type PlacesStatusProps = {};

const PlacesStatus = (props: PlacesStatusProps) => {
	return (
		<View style={styles.container}>
			<StatusItem type="공원" status={0} />
			<StatusItem type="카페" status={1} />
			<StatusItem type="식당" status={2} />
			<StatusItem type="식당" status={3} />
		</View>
	);
};

export default PlacesStatus;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: Colors.gray[300],
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	item: {
		display: "flex",
		flexDirection: "column",
		rowGap: 4,
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
