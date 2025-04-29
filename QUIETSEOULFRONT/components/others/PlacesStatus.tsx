import { Colors } from "@/constants/Colors";
import React from "react";
import { View, StyleSheet } from "react-native";
import Park48 from "../icons/Park48";
import { Body5 } from "../text/Text";
import Cafe48 from "../icons/Cafe48";
import Restaurant48 from "../icons/Restaurant48";
import { getRepColor } from "@/lib/util";
import Fb48 from "../icons/Fb48";
import Leisure48 from "../icons/Leisure48";
import Distribution48 from "../icons/Distribution48";

type StatusItemProps = {
	type: string;
	status: number;
};

const StatusItem = ({ type, status }: StatusItemProps) => {
	const lineColor = getRepColor(status);

	switch (type) {
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
		case "패션·뷰티":
			return (
				<View style={styles.item}>
					<Fb48 />
					<View style={styles.textView}>
						<Body5 color={Colors.main[700]}>패션·뷰티</Body5>
					</View>
					<View
						style={[
							styles.statusLine,
							{ backgroundColor: lineColor },
						]}
					/>
				</View>
			);
		case "여가":
			return (
				<View style={styles.item}>
					<Leisure48 />
					<View style={styles.textView}>
						<Body5 color={Colors.main[700]}>여가</Body5>
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
		case "유통":
			return (
				<View style={styles.item}>
					<Distribution48 />
					<View style={styles.textView}>
						<Body5 color={Colors.main[700]}>유통</Body5>
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

type PlacesStatusProps = {
	restaurantEnabled: boolean;
	fbEnabled: boolean;
	leisureEnabled: boolean;
	cafeEnabled: boolean;
	distributionEnabled: boolean;
	restaurantStatus: number;
	fbStatus: number;
	leisureStatus: number;
	cafeStatus: number;
	distributionStatus: number;
};

const PlacesStatus = (props: PlacesStatusProps) => {
	return (
		<View style={styles.container}>
			{props.restaurantEnabled && (
				<StatusItem type="식당" status={props.restaurantStatus} />
			)}
			{props.fbEnabled && (
				<StatusItem type="패션·뷰티" status={props.fbStatus} />
			)}
			{props.leisureEnabled && (
				<StatusItem type="여가" status={props.leisureStatus} />
			)}
			{props.cafeEnabled && (
				<StatusItem type="카페" status={props.cafeStatus} />
			)}
			{props.distributionEnabled && (
				<StatusItem type="유통" status={props.distributionStatus} />
			)}
		</View>
	);
};

export default PlacesStatus;

const styles = StyleSheet.create({
	container: {
		width: "auto",
		paddingVertical: 8,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: Colors.gray[300],
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
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
