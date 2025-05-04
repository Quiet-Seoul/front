import { DayStatus, PredictPlaceData, WeeklyStatus } from "@/types/predict";

export const fetchPredictList = async (): Promise<PredictPlaceData[]> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL + `/congestion/current`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	if (response.status !== 200) {
		throw new Error("Failed to fetch data");
	}

	const result = await response.json();

	return result;
};

export const fetchPredictQuietList = async (): Promise<PredictPlaceData[]> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL + `/congestion/relaxed`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	if (response.status !== 200) {
		throw new Error("Failed to fetch data");
	}

	const result = await response.json();

	return result;
};

export const fetchAreaWeeklyStatus = async (
	name: string
): Promise<DayStatus[]> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL + `/congestion/weekly-summary/${name}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	if (response.status !== 200) {
		throw new Error("Failed to fetch data");
	}

	const result = await response.json();

	return result;
};

export const fetchAreaWeeklyStatusDetail = async (
	name: string,
	type: string
): Promise<WeeklyStatus[]> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL + `/congestion/weekly/${type}/${name}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	if (response.status !== 200) {
		throw new Error("Failed to fetch data");
	}

	const result = await response.json();

	return result;
};
