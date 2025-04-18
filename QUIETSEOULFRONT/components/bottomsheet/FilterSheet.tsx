import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import { forwardRef, useCallback } from "react";
import {
	BottomSheetBackdrop,
	BottomSheetFooter,
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Colors } from "@/constants/Colors";
import { PrimaryButton } from "../buttons/PrimaryButton";

interface FilterSheetProps {
	content: React.ReactNode;
}

const FilterSheet = forwardRef<BottomSheetModal, FilterSheetProps>(
	({ content }, ref) => {
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

		const renderFooter = useCallback(
			(props: any) => (
				<BottomSheetFooter {...props}>
					<View style={styles.filterFooterContainer}>
						<PrimaryButton>적용하기</PrimaryButton>
					</View>
				</BottomSheetFooter>
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
					footerComponent={renderFooter}
					handleIndicatorStyle={styles.indicator}
					// bottomInset={56}
				>
					<BottomSheetView>{content}</BottomSheetView>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		);
	}
);

export default FilterSheet;

const styles = StyleSheet.create({
	indicator: {
		width: 40,
		height: 4,
		backgroundColor: Colors.gray[100],
	},
	filterFooterContainer: {
		backgroundColor: Colors.white,
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
});
