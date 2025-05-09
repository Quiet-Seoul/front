import { CardXLItem } from "@/types/card";
import React from "react";
import { FlatList, View, StyleSheet, ListRenderItem } from "react-native";
import CardXL from "./CardXL";

type Props = {
	titleComponent: React.ReactNode;
	items: Array<CardXLItem>;
};

const CardXLList = ({ titleComponent, items }: Props) => {
	const renderItems: ListRenderItem<CardXLItem> = React.useCallback(
		({ item, index }) => (
			<CardXL
				id={item.id}
				key={index}
				text={item.text}
				image={item.image || item.imageUrl}
				subText={item.subText}
				status={item.status}
			/>
		),
		[]
	);

	return (
		<View style={styles.cardListContainer}>
			<View style={styles.cardTitleContainer}>{titleComponent}</View>
			<FlatList
				data={items}
				renderItem={renderItems}
				horizontal
				contentContainerStyle={{
					columnGap: 8,
					paddingHorizontal: 16,
				}}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default CardXLList;

const styles = StyleSheet.create({
	cardTitleContainer: {
		paddingHorizontal: 16,
	},
	cardListContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
	},
});
