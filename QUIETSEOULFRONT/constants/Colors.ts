export const Colors = {
	white: "#FFFFFF",
	black: "#000000",
	warning: "#EB535D",
	informative: "#5599FF",
	gray: {
		50: "#F7F8FA",
		100: "#EAEBED",
		200: "#D7D8DB",
		300: "#C0C2C5",
		400: "#A1A4A9",
		500: "#898C8E",
		600: "#78797C",
		700: "#616264",
		800: "#424242",
		900: "#212121",
	},
	main: {
		50: "#e8f5ec",
		100: "#c7e6d0",
		200: "#a4d6b3",
		300: "#80c696",
		400: "#66ba81",
		500: "#4cae6b",
		600: "#449f61",
		700: "#3b8d55",
		800: "#347c4a",
		900: "#285c37",
	},
	status: {
		positive: "#00e676",
		neutral: "#fbc02d",
		negative: "#f58016",
		veryNegative: "#ef5350",
	},
} as const;

export type ColorKeysUnion =
	| "white"
	| "black"
	| "warning"
	| "informative"
	| "gray.50"
	| "gray.100"
	| "gray.200"
	| "gray.300"
	| "gray.400"
	| "gray.500"
	| "gray.600"
	| "gray.700"
	| "gray.800"
	| "gray.900"
	| "main.50"
	| "main.100"
	| "main.200"
	| "main.300"
	| "main.400"
	| "main.500"
	| "main.600"
	| "main.700"
	| "main.800"
	| "main.900"
	| "status.positive"
	| "status.neutral"
	| "status.negative"
	| "status.veryNegative";

export type ColorValuesUnion =
	| "#FFFFFF"
	| "#000000"
	| "#EB535D"
	| "#5599FF"
	| "#F7F8FA"
	| "#EAEBED"
	| "#D7D8DB"
	| "#C0C2C5"
	| "#A1A4A9"
	| "#898C8E"
	| "#78797C"
	| "#616264"
	| "#424242"
	| "#212121"
	| "#e8f5ec"
	| "#c7e6d0"
	| "#a4d6b3"
	| "#80c696"
	| "#66ba81"
	| "#4cae6b"
	| "#449f61"
	| "#3b8d55"
	| "#347c4a"
	| "#285c37"
	| "#00e676"
	| "#fbc02d"
	| "#f58016"
	| "#ef5350";
