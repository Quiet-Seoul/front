import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { forwardRef, useCallback, useMemo, useRef } from "react";
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Colors } from "@/constants/Colors";

interface FilterSheetProps {
	filters?: Array<string>;
	ref: React.Ref<BottomSheetModal>;
}

const FilterSheet = forwardRef<BottomSheetModal, FilterSheetProps>(
	({ filters }, ref) => {
		const snapPoint = useMemo(() => ["25%", "50%", "70%", "100%"], []);

		const bottomSheetBackdrop = useCallback(
			(props: any) => (
				<BottomSheetBackdrop
					appearsOnIndex={0}
					disappearsOnIndex={-1}
					{...props}
				/>
			),
			[]
		);

		return (
			<BottomSheetModalProvider>
				<BottomSheetModal
					ref={ref}
					enableDynamicSizing
					backdropComponent={bottomSheetBackdrop}
					backgroundStyle={{
						backgroundColor: Colors.white,
					}}
				>
					<BottomSheetView style={styles.contentContainer}>
						<Text>Awesome 🎉</Text>
						<Text>Awesome 🎉</Text>
						<Text>Awesome 🎉</Text>
						<Text>Awesome 🎉</Text>
						<Text>Awesome 🎉</Text>
						<Text>Awesome 🎉</Text>
						<Text>Awesome 🎉</Text>
					</BottomSheetView>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		);
	}
);

export default FilterSheet;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "grey",
	},
	contentContainer: {
		flex: 1,
		padding: 36,
		alignItems: "center",
		borderTopStartRadius: 24,
		borderTopEndRadius: 24,
	},
});
