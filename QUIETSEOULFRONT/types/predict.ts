export interface PredictPlaceData {
	name: string;
	type: string;
	congestionLevel: "여유" | "보통" | "약간 혼잡" | "혼잡";
	imageUrl: string;
	description: string;
}
