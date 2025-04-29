import { router, Stack } from "expo-router";
import React from "react";
import { Heading2 } from "../text/Text";
import { View } from "react-native";
import { Colors } from "@/constants/Colors";
import ChevronLeft24 from "../icons/ChevronLeft24";
import { fetchUserData } from "@/data/user";
import { UserData } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserChip from "../chips/UserChip";

type Props = {
	chevron?: boolean;
	title: string;
	screenName: string;
};

const Header = ({ chevron = true, title, screenName }: Props) => {
	const [userData, setUserData] = React.useState<UserData | null>(null);

	const getLoginInfo = async () => {
		if (!userData) {
			const jwt = await AsyncStorage.getItem("jwt");

			if (jwt) {
				await fetchUserData(jwt).then(async (res) => {
					if (res) {
						await AsyncStorage.setItem("user", JSON.stringify(res));
						setUserData(res);
					}
				});
			}
		}
	};

	React.useEffect(() => {
		AsyncStorage.getItem("user").then((res) => {
			if (res) {
				setUserData(JSON.parse(res));
			} else {
				getLoginInfo();
			}
		});
	}, []);

	return (
		<Stack.Screen
			name={screenName}
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
				headerRight: () => {
					if (userData) {
						return (
							<UserChip
								userName={userData.name}
								onPress={() => router.push("/mypage")}
							/>
						);
					} else {
						return (
							<View onTouchEnd={() => router.push("/login")}>
								<Heading2 color={Colors.white}>로그인</Heading2>
							</View>
						);
					}
				},
			}}
		/>
	);
};

export default Header;
