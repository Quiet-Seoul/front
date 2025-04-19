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
