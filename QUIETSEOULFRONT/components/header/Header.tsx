import { router, Stack } from "expo-router";
import React from "react";
import { Heading2 } from "../text/Text";
import { View } from "react-native";
import { Colors } from "@/constants/Colors";
import ChevronLeft24 from "../icons/ChevronLeft24";

type Props = {
	chevron?: boolean;
	title: string;
};

const Header = ({ chevron = true, title }: Props) => {
	return (
		<Stack.Screen
			name="index"
			options={{
				headerLeft: chevron
					? () => (
							<View onTouchEnd={() => router.back()}>
								<ChevronLeft24 />
							</View>
					  )
					: undefined,
				headerTitle: () => (
					<Heading2 color={Colors.white}>{title}</Heading2>
				),
				headerRight: () => (
					<View onTouchEnd={() => router.push("/inform")}>
						<Heading2 color={Colors.white}>로그인</Heading2>
					</View>
				),
			}}
		/>
	);
};

export default Header;
