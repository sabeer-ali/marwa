import React from "react";
import { Text, TextInput, View } from "react-native";
const CustomInput = (props) => {
	const { placeholder, label, onChange, onChangeText, ...rest } = props;
	return (
		<View style={{ width: "100%" }}>
			<Text
				style={{
					fontWeight: "bold",
					marginVertical: 10,
					color: "#000",
					fontSize: 16,
				}}>
				{label}
			</Text>
			<TextInput
				placeholder={placeholder && placeholder}
				onChangeText={onChangeText ? onChangeText : onChange}
				style={{
					borderWidth: 1,
					borderColor: "#000",
					width: "80%",
					borderRadius: 12,
					backgroundColor: "#fff",
					fontSize: 13,
					paddingHorizontal : 15,
					paddingVertical : 5
				}}
				{...rest}
			/>
		</View>
	);
};

export default CustomInput;
