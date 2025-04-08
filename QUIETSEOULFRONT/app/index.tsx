import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {
	Body1,
	Body2,
	Body3,
	Body3C,
	Body4,
	Body5,
	Caption1,
	Caption2,
	Caption3,
	Heading1,
	Heading2,
	Heading3,
	Heading4,
} from "@/components/Text";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import ChipButtonGroup, {
	ChipButtonItem,
} from "@/components/buttons/ChipButton";
import { useCallback, useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Landing() {
	const router = useRouter();

	const [selected, setSelected] = useState("gangnam");

	// ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	return (
		<View>
			<Heading1>안녕하세요.</Heading1>
			<Heading2>안녕하세요.</Heading2>
			<Heading3>안녕하세요.</Heading3>
			<Heading4>안녕하세요.</Heading4>
			<Body1>안녕하세요.</Body1>
			<Body2>안녕하세요.</Body2>
			<Body3>안녕하세요.</Body3>
			<Body3C>안녕하세요.</Body3C>
			<Body4>안녕하세요.</Body4>
			<Body5>안녕하세요.</Body5>
			<Caption1>안녕하세요.</Caption1>
			<Caption2>안녕하세요.</Caption2>
			<Caption3>안녕하세요.</Caption3>
			<View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
				<PrimaryButton enabled onPress={() => alert("hello world!")}>
					이동하기
				</PrimaryButton>
			</View>
			<View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
				<PrimaryButton
					enabled={false}
					onPress={() => alert("hello world!")}
				>
					이동하기
				</PrimaryButton>
			</View>
			<View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
				<SecondaryButton enabled onPress={() => alert("hello world!")}>
					이동하기
				</SecondaryButton>
			</View>
			<View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
				<SecondaryButton
					enabled={false}
					onPress={() => alert("hello world!")}
				>
					이동하기
				</SecondaryButton>
			</View>
			<View>
				<ChipButtonGroup selected={selected} onSelected={setSelected}>
					<ChipButtonItem value="gangnam">강남구</ChipButtonItem>
					<ChipButtonItem value="gangseo">강서구</ChipButtonItem>
					<ChipButtonItem value="gangbuk" enabled={false}>
						강북구
					</ChipButtonItem>
				</ChipButtonGroup>
			</View>
			<BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges}>
				<BottomSheetView style={styles.contentContainer}>
					<Text>Awesome 🎉</Text>
				</BottomSheetView>
			</BottomSheet>
			<Button
				title="Bottom Sheet"
				onPress={() => bottomSheetRef.current?.expand}
			/>
			<Button
				title="메인으로 이동"
				onPress={() => router.push("/places")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "grey",
	},
	contentContainer: {
		flex: 1,
		padding: 36,
		alignItems: "center",
	},
});
