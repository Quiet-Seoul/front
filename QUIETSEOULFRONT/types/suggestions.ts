export interface SuggestionData {
	id: string;
	name: string;
	address: string;
	description: string;
	latitude: number;
	longitude: number;
	approved: boolean;
}

export interface SuggestionSubmitData {
	placeName: string;
	category: string;
	description: string;
	address: string;
	latitude: number;
	longitude: number;
}
