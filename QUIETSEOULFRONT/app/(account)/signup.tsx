import CalendarSheet from "@/components/bottomsheet/CalendarSheet";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import RadioButton, { RadioProvider } from "@/components/buttons/RadioButton";
import ChevronLeft24 from "@/components/icons/ChevronLeft24";
import LabeledInputField from "@/components/inputField/LabeledInputField";
import LabeledPhoneInputField from "@/components/inputField/LabeledPhoneInputField";
import {
	Body3,
	Caption1,
	Caption3,
	Heading1,
	Heading2,
} from "@/components/text/Text";
import { Colors } from "@/constants/Colors";
import { fetchCreateUser } from "@/data/user";
import { isSignUpDataValid } from "@/lib/util";
import { DateProps } from "@/types/date";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack, router } from "expo-router";
import React from "react";
import {
	Keyboard,
	Pressable,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CalendarIcon from "@/components/icons/Calendar";

type Props = {};

const signup = (props: Props) => {
	const username = React.useRef<string>("");
	const password = React.useRef<string>("");
	const checkPassword = React.useRef<string>("");
	const name = React.useRef<string>("");
	const phone = React.useRef<string>("");
	// const birthdate = React.useRef<string>("2000-01-01");
	const gender = React.useRef<string>("");

	const bottomSheetRep = React.useRef<BottomSheetModal | null>(null);

	const today = new Date("2000-01-01");
	const todayYear = today.getFullYear();
	const todayMonth = today.getMonth() + 1;
	const todayDay = today.getDate();

	const [dateData, setDateData] = React.useState<DateProps>({
		dateString: `${todayYear}-${todayMonth}-${todayDay}`,
		year: todayYear,
		month: todayMonth,
		day: todayDay,
		timestamp: Date.now(),
	});

	const handleDateChange = (date: DateProps) => {
		setDateData(date);
	};

	const handleSignup = async () => {
		const isValid = isSignUpDataValid({
			username: username.current,
			password: password.current,
			checkPassword: checkPassword.current,
			name: name.current,
			phone: phone.current,
			birthdate: dateData.dateString,
			gender: gender.current,
		});

		if (!isValid) {
			alert("회원가입 정보를 확인해주세요.");
			return;
		} else {
			await fetchCreateUser({
				username: username.current,
				password: password.current,
				name: name.current,
				phone: phone.current,
				birthdate: dateData.dateString,
				gender: gender.current,
			})
				.then(() => {
					alert("회원가입이 완료되었습니다.");
					router.push("/login");
				})
				.catch((err) => {
					alert("회원가입에 실패했습니다.");
					console.log(err);
				});
		}
	};

	return (
		<>
			<Stack.Screen
				name="signup"
				options={{
					headerLeft: () => (
						<View onTouchEnd={() => router.back()}>
							<ChevronLeft24 />
						</View>
					),
					headerTitle: () => (
						<Heading2 color={Colors.white}>회원가입</Heading2>
					),
				}}
			/>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAwareScrollView
					contentContainerStyle={styles.contentcontainer}
				>
					<View style={styles.titleContainer}>
						<Heading1 color={Colors.main[700]}>회원가입</Heading1>
					</View>
					<LabeledInputField
						label="닉네임"
						placeholder="Nickname"
						onChangeText={(value) => (name.current = value)}
					/>
					<LabeledInputField
						label="아이디"
						placeholder="ID"
						onChangeText={(value) => (username.current = value)}
					/>
					<LabeledInputField
						label="패스워드"
						placeholder="PW"
						isPassword
						onChangeText={(value) => (password.current = value)}
					/>
					<LabeledInputField
						label="패스워드 확인"
						placeholder="PW"
						isPassword
						onChangeText={(value) =>
							(checkPassword.current = value)
						}
					/>
					<LabeledPhoneInputField
						placeholder="Phone number"
						onChangeText={(value) => (phone.current = value)}
					/>
					<View style={styles.dateContainer}>
						<Caption1 color={Colors.gray[900]}>생년월일</Caption1>
						{/* 캘린더에서 select box로 바꾸기 */}
						<Pressable
							style={styles.inputField}
							onPress={() => bottomSheetRep.current?.present()}
						>
							<CalendarIcon />
							<Body3
								color={Colors.gray[900]}
							>{`${dateData.year}년 ${dateData.month}월 ${dateData.day}일`}</Body3>
						</Pressable>
					</View>
					<View style={styles.row}>
						<View>
							<Caption1>성별</Caption1>
						</View>
						<View style={styles.buttonsAlign}>
							<RadioProvider>
								<RadioButton
									text="남자"
									value="M"
									onSelect={(value) =>
										(gender.current = value)
									}
								/>
								<RadioButton
									text="여자"
									value="F"
									onSelect={(value) =>
										(gender.current = value)
									}
								/>
							</RadioProvider>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={handleSignup}>
							등록하기
						</PrimaryButton>
					</View>
					<View style={styles.termofuseContainer}>
						<Pressable onPress={() => router.push("/termsofuse")}>
							<Caption3>한적서울 서비스 이용약관</Caption3>
						</Pressable>
						<Caption3>
							회원가입을 진행하실 경우 위 서비스 이용약관에
							동의하는 것으로 간주됩니다.
						</Caption3>
					</View>
					<CalendarSheet
						ref={bottomSheetRep}
						date={dateData}
						onDateSelect={handleDateChange}
					/>
				</KeyboardAwareScrollView>
			</TouchableWithoutFeedback>
		</>
	);
};

export default signup;

const styles = StyleSheet.create({
	contentcontainer: {
		height: "100%",
		paddingTop: 32,
		display: "flex",
		flexDirection: "column",
		rowGap: 24,
		alignItems: "center",
	},
	titleContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
	buttonContainer: {
		width: "100%",
		backgroundColor: Colors.white,
		paddingHorizontal: 16,
		paddingVertical: 8,
		position: "absolute",
		bottom: 56,
		borderTopWidth: 1,
		borderTopColor: Colors.gray[100],
	},
	row: {
		width: 240,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		columnGap: 16,
	},
	buttonsAlign: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
		columnGap: 8,
	},
	termofuseContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		rowGap: 8,
	},
	dateContainer: {
		display: "flex",
		flexDirection: "column",
		rowGap: 4,
	},
	inputField: {
		width: 240,
		padding: 8,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: Colors.gray[200],
		display: "flex",
		flexDirection: "row",
		columnGap: 8,
	},
});
