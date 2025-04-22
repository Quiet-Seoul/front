import React from "react";
import Svg, { Path } from "react-native-svg";

const CalendarArrowLeft = () => {
	return (
		<Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
			<Path
				d="M24 12L16.7071 19.2929C16.3166 19.6834 16.3166 20.3166 16.7071 20.7071L24 28"
				stroke="black"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default CalendarArrowLeft;
