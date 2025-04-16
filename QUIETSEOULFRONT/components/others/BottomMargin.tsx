import React from "react";
import { View } from "react-native";

type Props = {
	height?: 32 | 64 | 128 | 256;
};

const BottomMargin = ({ height = 64 }: Props) => {
	return <View style={{ height: height }} />;
};

export default BottomMargin;
