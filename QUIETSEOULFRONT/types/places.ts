export interface PlaceDetailData {
	id: number;
	name: string;
	category: "카페" | "공원" | "식당";
	subcategory: string;
	areaCd: string;
	address: string;
	roadAddress: string;
	detailAddress: string;
	lat: number;
	lng: number;
	description: string;
	avgRating: number;
}

export interface PlacesNearbyData {
	baseArea: string;
	category: string;
	places: Places[];
}

export interface Places {
	id: number;
	name: string;
	address: string;
	lat: number;
	lng: number;
	avgRating: number;
}
