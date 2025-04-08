import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>메인 페이지</Text>
			<Button
				title="카테고리 123 보기"
				onPress={() => router.push("/places/detail/123")}
			/>
		</View>
	);
}
