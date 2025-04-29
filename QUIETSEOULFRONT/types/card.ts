export interface CardLItem {
	id: number;
	text: string;
	image?: string;
	rep: "good" | "normal" | "bad" | "terrible" | "NaN";
	reviews: number;
}

export interface CardXLItem {
	id: string;
	text: string;
	image?: string;
	subText: string;
	status: "여유" | "보통" | "약간 붐빔" | "붐빔";
}

export interface CardSItem extends CardLItem {
	type: "카페" | "공원" | "식당";
	isFromUser?: boolean;
	distance?: number;
}
