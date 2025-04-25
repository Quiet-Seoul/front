import { Colors } from "@/constants/Colors";
import { LoginData, SignUpValidationData } from "@/types/user";

export const getRepText = (rep: number) => {
	return rep === 0
		? "한적해요"
		: rep === 1
		? "보통이에요"
		: rep === 2
		? "북적해요"
		: rep === 3
		? "혼잡해요"
		: "";
};

export const getRepEmoticon = (rep: number) => {
	return rep === 0
		? "☺️"
		: rep === 1
		? "🙂"
		: rep === 2
		? "🙁"
		: rep === 3
		? "😔"
		: "";
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

	console.log(
		checkUsername,
		checkPassword,
		checkPhone,
		checkName,
		checkBirth,
		checkGender
	);

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
