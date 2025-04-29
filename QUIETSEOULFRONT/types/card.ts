export interface CardLItem {
	id: number;
	text: string;
	image?: string;
	rep: "good" | "normal" | "bad" | "terrible" | "NaN";
	reviews: number;
}

export interface CardXLItem {
	id: number;
	text: string;
	image?: string;
	subText: string;
	status: 0 | 1 | 2 | 3;
}

export interface CardSItem extends CardLItem {
	type: "카페" | "공원" | "식당";
	isFromUser?: boolean;
	distance?: number;
}
