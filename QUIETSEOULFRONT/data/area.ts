import { AreaData } from "@/types/area";

export const fetchQuietAreas = async (): Promise<AreaData[]> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL + `/area/live/quiet`,
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

export const fetchAreaCurrentStatus = async (
	areaCd: string
): Promise<AreaData[]> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL + `/area/live/${areaCd}`,
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

export const fetchDistrictAreas = async (
	districtId: number
): Promise<AreaData[]> => {
	const response = await fetch(
		process.env.EXPO_PUBLIC_API_URL + `/area/district/${districtId}`,
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
