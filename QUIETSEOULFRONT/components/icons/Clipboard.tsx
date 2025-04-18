import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

type Props = {};

const Clipboard = (props: Props) => {
	return (
		<Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<Rect width="16" height="16" fill="white" />
			<Path
				d="M11.5 3C12.0523 3 12.5 3.44772 12.5 4V11C12.5 11.5523 12.0523 12 11.5 12H11C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V5C4 4.44772 4.44772 4 5 4H5.5C5.5 3.44772 5.94772 3 6.5 3H11.5ZM6.5 3.5C6.22386 3.5 6 3.72386 6 4H10C10.5523 4 11 4.44772 11 5V11.5H11.5C11.7761 11.5 12 11.2761 12 11V4C12 3.72386 11.7761 3.5 11.5 3.5H6.5Z"
				fill="#4A4D51"
			/>
		</Svg>
	);
};

export default Clipboard;
