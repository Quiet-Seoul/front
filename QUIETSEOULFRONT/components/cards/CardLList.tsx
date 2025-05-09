import { CardLItem } from "@/types/card";
import React from "react";
import { FlatList, View, StyleSheet, ListRenderItem } from "react-native";
import CardL from "./CardL";

type Props = {
	titleComponent: React.ReactNode;
	items: Array<CardLItem>;
};

const CardLList = ({ titleComponent, items }: Props) => {
	const renderItems: ListRenderItem<CardLItem> = React.useCallback(
		({ item, index }) => (
			<CardL
				id={item.id}
				key={index}
				text={item.text}
				image={item.image || item.imageUrl}
				rep={item.rep}
				reviews={item.reviews}
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

export default CardLList;

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
