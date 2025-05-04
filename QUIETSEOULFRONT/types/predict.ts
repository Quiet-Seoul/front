export interface PredictPlaceData {
	name: string;
	type: string;
	congestionLevel: "여유" | "보통" | "약간 혼잡" | "혼잡";
	imageUrl: string;
	description: string;
}

export interface DayStatus {
	date: string;
	level: "여유" | "보통" | "약간 혼잡" | "혼잡";
}

export interface WeeklyStatus {
	date: string;
	hourlyForecasts: WeeklyStatusDetail[];
}

export interface WeeklyStatusDetail {
	hour: number;
	congestionLevel: "여유" | "보통" | "약간 혼잡" | "혼잡";
	stayPopulation: number;
}
