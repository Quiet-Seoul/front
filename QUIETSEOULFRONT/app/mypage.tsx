import RoundChip from "@/components/chips/RoundChip";
import Header from "@/components/header/Header";
import { Body2, Heading1, Heading2 } from "@/components/text/Text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Divider from "@/components/divider/Divider";
import { Colors } from "@/constants/Colors";
import ChevronRight from "@/components/icons/ChevronRight";
import { router } from "expo-router";
import { UserData } from "@/types/user";
import { fetchUserData } from "@/data/user";

type Props = {};

const Mypage = (props: Props) => {
	const [userData, setUserData] = React.useState<UserData | null>(null);

	const handleDeleteUserData = () => {
		const logout = async () => {
			await AsyncStorage.removeItem("user");
			await AsyncStorage.removeItem("jwt");
			router.push("/");
		};

		Alert.alert(
			"로그아웃",
			"로그아웃 하시겠어요?",
			[
				{
					text: "확인",
					onPress: () => logout(),
				},
				{ text: "취소", onPress: undefined },
			],
			{ cancelable: false }
		);
	};

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
		<>
			<Header title="내 정보" screenName="mypage" />
			<SafeAreaView style={styles.container}>
				<View style={styles.nameContainer}>
					<Heading1>{userData?.name} 님</Heading1>
					<RoundChip text="내 정보 수정" />
				</View>
				<Divider variant="bold" />
				<View style={styles.listContainer}>
					<View style={styles.listRowContainer}>
						<View style={styles.listRowTextContainer}>
							<Heading2>작성한 후기</Heading2>
							<Heading2 color={Colors.gray[500]}>
								기능 준비중
							</Heading2>
						</View>
						<ChevronRight />
					</View>
					<Divider />
					<View style={styles.listRowContainer}>
						<View style={styles.listRowTextContainer}>
							<Heading2>제보한 장소</Heading2>
							<Heading2 color={Colors.gray[500]}>
								기능 준비중
							</Heading2>
						</View>
						<ChevronRight />
					</View>
				</View>
				<Divider variant="bold" />
				<Pressable
					style={styles.logoutContainer}
					onPress={handleDeleteUserData}
				>
					<Body2 color={Colors.warning}>로그아웃</Body2>
				</Pressable>
			</SafeAreaView>
		</>
	);
};

export default Mypage;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
		paddingVertical: 16,
	},
	nameContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
	},
	listContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 16,
		paddingHorizontal: 16,
	},
	listRowContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 8,
	},
	listRowTextContainer: {
		display: "flex",
		flexDirection: "row",
		columnGap: 8,
	},
	logoutContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
});
