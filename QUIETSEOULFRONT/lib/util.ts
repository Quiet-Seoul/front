import { Colors } from "@/constants/Colors";
import { LoginData, SignUpValidationData } from "@/types/user";

export const getRepText = (rep?: number) => {
	if (typeof rep === "undefined") return "NaN";

	if (rep >= 4) {
		return "한적해요";
	} else if (rep >= 3) {
		return "보통이에요";
	} else if (rep >= 2) {
		return "북적해요";
	} else if (rep > 0) {
		return "혼잡해요";
	} else {
		return "평점없음";
	}
};

export const getRepEmoticon = (rep?: number) => {
	if (typeof rep === "undefined") return "❔";

	if (rep >= 4) {
		return "☺️";
	} else if (rep >= 3) {
		return "🙂";
	} else if (rep >= 2) {
		return "🙁";
	} else if (rep > 0) {
		return "😔";
	} else {
		return "❔";
	}
};

export const getRepValue = (rep?: number) => {
	if (typeof rep === "undefined") return "NaN";

	if (rep >= 4) {
		return "good";
	} else if (rep >= 3) {
		return "normal";
	} else if (rep >= 2) {
		return "bad";
	} else if (rep > 0) {
		return "terrible";
	} else {
		return "NaN";
	}
};

export const getRepTextToColor = (rep: string) => {
	if (!rep) return Colors.gray[300];

	switch (rep) {
		case "여유":
			return Colors.status.positive;
		case "보통":
			return Colors.status.neutral;
		case "약간 붐빔":
			return Colors.status.negative;
		case "붐빔":
			return Colors.status.veryNegative;
		default:
			return Colors.gray[300];
	}
};

export const getRepColor = (rep?: number) => {
	if (rep === undefined) return Colors.gray[300];

	if (rep >= 4) {
		return Colors.status.positive;
	} else if (rep >= 3) {
		return Colors.status.neutral;
	} else if (rep >= 2) {
		return Colors.status.negative;
	} else if (rep > 0) {
		return Colors.status.veryNegative;
	} else {
		return Colors.gray[300];
	}
};

export const getStatusColor = (status: 0 | 1 | 2 | 3) => {
	return status === 0
		? Colors.status.positive
		: status === 1
		? Colors.status.neutral
		: status === 2
		? Colors.status.negative
		: status === 3
		? Colors.status.veryNegative
		: "";
};

export const getRepStringToNumber = (
	rep?: "여유" | "보통" | "약간 혼잡" | "혼잡"
) => {
	if (rep === "여유") {
		return 4;
	} else if (rep === "보통") {
		return 3;
	} else if (rep === "약간 혼잡") {
		return 2;
	} else {
		return 1;
	}
};

export const getWeekdayKR = (weekday: number) => {
	switch (weekday) {
		case 0:
			return "일";
		case 1:
			return "월";
		case 2:
			return "화";
		case 3:
			return "수";
		case 4:
			return "목";
		case 5:
			return "금";
		case 6:
			return "토";
		default:
			return "?";
	}
};

export const isSignUpDataValid = (data: SignUpValidationData) => {
	let checkUsername = false;
	let checkPassword = false;
	let checkPhone = false;
	let checkName = false;
	let checkBirth = false;
	let checkGender = false;

	if (data.username.length > 0) {
		checkUsername = true;
	}

	if (data.password.length > 0 && data.password === data.checkPassword) {
		checkPassword = true;
	}

	if (data.phone.length === 13) {
		checkPhone = true;
	}

	if (data.name.length > 0) {
		checkName = true;
	}

	if (data.birthdate.length > 0) {
		checkBirth = true;
	}

	if (data.gender === "M" || data.gender === "F") {
		checkGender = true;
	}

	return (
		checkUsername &&
		checkPassword &&
		checkPhone &&
		checkName &&
		checkBirth &&
		checkGender
	);
};

export const isLoginDataValid = (data: LoginData) => {
	let checkUsername = false;
	let checkPassword = false;

	if (data.username.length > 0) {
		checkUsername = true;
	}

	if (data.password.length > 0) {
		checkPassword = true;
	}

	return checkUsername && checkPassword;
};

type Days = "일" | "월" | "화" | "수" | "목" | "금" | "토";

export const getAlignedDaysFromTheDay = (day: string) => {
	const days: string[] = ["일", "월", "화", "수", "목", "금", "토"];
	const index = days.indexOf(day);

	if (index === -1) return undefined;

	const alignedDays = days.slice(index).concat(days.slice(0, index));

	return alignedDays;
};
