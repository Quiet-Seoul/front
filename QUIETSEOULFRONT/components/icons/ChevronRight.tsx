import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {};

const ChevronRight = (props: Props) => {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Path
				d="M15 4L22.2929 11.2929C22.6834 11.6834 22.6834 12.3166 22.2929 12.7071L15 20"
				stroke="#212121"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default ChevronRight;
