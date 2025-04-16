import { View, Text, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function CategoryDetail() {
	const { id } = useLocalSearchParams();
	const router = useRouter();

	return (
		<View>
			<Text>카테고리 상세 - ID: {id}</Text>
			<Button
				title={`${id}의 리뷰 보기`}
				onPress={() => router.push(`/places/detail/123/reviews`)}
			/>
		</View>
	);
}
