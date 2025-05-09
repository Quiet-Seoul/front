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
	type: "식당" | "패션" | "여가" | "카페" | "유통";
	isFromUser?: boolean;
	distance?: number;
}

export interface CardSuggestionItem {
	id: string;
	text: string;
	image?: string;
	category: string;
	avgRate: number;
	reviews: number;
	isFromUser?: boolean;
}
