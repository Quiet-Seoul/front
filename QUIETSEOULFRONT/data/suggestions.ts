import { PlaceDetailData } from "@/types/places";
import { SuggestionData, SuggestionSubmitData } from "@/types/suggestions";

export const fetchApprovedSuggestions = async (): Promise<
	PlaceDetailData[]
> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL + `/api/suggestions/approved`,
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

export const fetchSubmitSuggestion = async (
	data: SuggestionSubmitData,
	token: string
): Promise<PlaceDetailData> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL + `/api/suggestions`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		}
	);

	if (response.status !== 200) {
		throw new Error("Failed to fetch data");
	}

	const result = await response.json();

	return result;
};

export const fetchSuggestionPlaceDetail = async (
	placeId: string
): Promise<PlaceDetailData> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL +
			`/api/suggestions/suggestion/${placeId}`,
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
