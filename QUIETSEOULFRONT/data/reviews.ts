import { ReviewItem } from "@/types/review";

const domain = "http://54.180.114.193:8080";

export const fetchPlaceReviews = async (
	placeId: string
): Promise<Array<ReviewItem>> => {
	const response = await fetch(domain + `/places/${placeId}/reviews`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.status !== 200) {
		throw new Error("Failed to fetch data");
	}

	const result = await response.json();

	return result;
};
