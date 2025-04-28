import { PlaceDetailData } from "@/types/places";

const domain = "http://15.165.203.85:8080";

export const fetchPlaceDetail = async (
	placeId: string
): Promise<PlaceDetailData> => {
	const response = await fetch(domain + `/places/${placeId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.status !== 200) {
		console.log(response.json());
		throw new Error("Failed to fetch data");
	}

	const result = await response.json();

	return result;
};
