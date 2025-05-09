import {
	CategoriesStatusData,
	PlaceDetailData,
	PlacesNearbyData,
} from "@/types/places";

export const fetchPlaceDetail = async (
	placeId: string
): Promise<PlaceDetailData> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL + `/places/${placeId}`,
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

export const fetchPlacesNearby = async (
	lat: number,
	lng: number
): Promise<PlacesNearbyData> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL +
			`/places/nearby?lat=${lat}&lng=${lng}`,
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

export const fetchPlacesNearbybyCategory = async (
	areaCd: string,
	category: string
): Promise<PlaceDetailData[]> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL +
			`/places/category?areaCd=${areaCd}&category=${category}`,
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

export const fetchCategoriesStatus = async (
	areaCd: string
): Promise<CategoriesStatusData> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL + `/area/industry/${areaCd}/score`,
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

export const fetchAreaPlaces = async (
	areaCd: string
): Promise<PlaceDetailData[]> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL + `/places/area?areaCd=${areaCd}`,
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
