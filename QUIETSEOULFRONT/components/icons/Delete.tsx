import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

type Props = {};

const Delete = (props: Props) => {
	return (
		<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<Circle cx="8" cy="8" r="6" fill="#DBDFE8" />
			<Path
				d="M5 5L11 11"
				stroke="#C1C5CD"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<Path
				d="M11 5L5 11"
				stroke="#C1C5CD"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</Svg>
	);
};

export default Delete;
