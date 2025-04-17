import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

type Props = {};

const Filter = (props: Props) => {
	return (
		<Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
			<Path
				d="M1 3.5H17"
				stroke="#A3A8B2"
				strokeWidth="1.25"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Circle
				cx="5.5"
				cy="3.5"
				r="2"
				fill="white"
				stroke="#A3A8B2"
				strokeWidth="1.25"
			/>
			<Path
				d="M1 9H17"
				stroke="#A3A8B2"
				strokeWidth="1.25"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Circle
				cx="12.5"
				cy="9"
				r="2"
				fill="white"
				stroke="#A3A8B2"
				strokeWidth="1.25"
			/>
			<Path
				d="M1 14.5H17"
				stroke="#A3A8B2"
				strokeWidth="1.25"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Circle
				cx="5.5"
				cy="14.5"
				r="2"
				fill="white"
				stroke="#A3A8B2"
				strokeWidth="1.25"
			/>
		</Svg>
	);
};

export default Filter;
