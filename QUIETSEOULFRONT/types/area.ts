export interface AreaData {
	areaCd: string;
	areaNm: string;
	imageurl: string;
	ppltnTime: string;
	areaCongestLvl: "여유" | "보통" | "약간 붐빔" | "붐빔";
	areaCongestMsg: string;
	areaPpltnMin: number;
	areaPpltnMax: number;
	areaCmrclLvl: string;
	areaShPaymentCnt: number;
	areaShPaymentAmtMin: number;
	areaShPaymentAmtMax: number;
	createdAt: string;
}
