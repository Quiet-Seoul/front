import { ReviewItem } from "@/types/review";

export const fetchPlaceReviews = async (
	placeId: string
): Promise<Array<ReviewItem>> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL + `/places/${placeId}/reviews`,
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

export const sendPlaceReview = async (
	placeId: number,
	data: FormData,
	token?: string
) => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL + `/places/${placeId}/reviews`,
		{
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
			body: data,
		}
	);

	if (response.status !== 200) {
		throw new Error("Failed to fetch data");
	}

	const result = await response.json();

	return result;
};
