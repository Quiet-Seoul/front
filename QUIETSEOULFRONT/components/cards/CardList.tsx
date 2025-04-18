import { CardSItem } from "@/types/card";
import React from "react";
import { FlatList, View, StyleSheet, ListRenderItem } from "react-native";
import CardS from "./CardS";

type Props = {
	titleComponent: React.ReactNode;
	items: Array<CardSItem>;
	isFromUser?: boolean;
};

const CardList = ({ titleComponent, items, isFromUser = false }: Props) => {
	const renderItems: ListRenderItem<CardSItem> = React.useCallback(
		({ item, index }) => (
			<CardS
				id={item.id}
				key={index}
				type={item.type}
				text={item.text}
				rep={item.rep}
				reviews={item.reviews}
				distance={item.distance}
				isFromUser={isFromUser}
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

export default CardList;

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
