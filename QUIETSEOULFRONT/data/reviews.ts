import { ReviewItem } from "@/types/review";

const domain = "http://15.165.203.85:8080";

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

export const sendPlaceReview = async (placeId: number, data: FormData) => {
	const response = await fetch(domain + `/places/${placeId}/reviews`, {
		method: "POST",
		headers: {
			// "Content-Type": "multipart/form-data",
		},
		body: data,
	});

	if (response.status !== 200) {
		console.log(response);
		throw new Error("Failed to fetch data");
	}

	const result = await response.json();

	return result;
};
