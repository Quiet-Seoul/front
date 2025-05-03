export interface PlaceDetailData {
	id: number;
	name: string;
	category: "식당" | "패션" | "여가" | "카페" | "유통";
	subcategory: string;
	areaCd: string;
	address: string;
	lat: number;
	lng: number;
	description: string;
	avgRating: number;
	imageUrl: string;
}

export interface PlacesNearbyData {
	baseArea: string;
	areaCd: string;
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
	reviewCount: number;
}

export interface CategoriesStatusData {
	식당: number;
	패션뷰티: number;
	여가: number;
	유통: number;
	카페: number;
}
