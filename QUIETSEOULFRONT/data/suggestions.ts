import { SuggestionData } from "@/types/suggestions";

export const fetchApprovedSuggestions = async (): Promise<SuggestionData[]> => {
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
