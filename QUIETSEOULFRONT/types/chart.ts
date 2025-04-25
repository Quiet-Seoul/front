export interface DayPredictData {
	day: string;
	data: ChartData[];
}

interface ChartData {
	label?: string;
	value: number;
	frontColor?: string;
}
