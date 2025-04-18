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
