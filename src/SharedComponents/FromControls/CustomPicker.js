import { Picker } from "@react-native-community/picker";
import React from "react";
import { Text, View } from "react-native";
const CustomPicker = (props) => {
	const { placeholder, label, value, onChange, onChangeText, options = [], ...rest } = props;
	return (
		<View style={{ width: "100%" }}>
			<Text
				style={{
					fontWeight: "bold",
					marginVertical: 10,
					color: "#000",
					fontSize: 18,
				}}>
				{label}
			</Text>
			<Picker
				selectedValue={value}
				// style={{ height: 50, width: "100%" ,borderColor:''}}
				style={{
					borderWidth: 1,
					borderColor: "black",
					width: "80%",
					height: 50,
					borderRadius: 12,
					// backgroundColor: "red",
					fontSize: 15,
				}}
				onValueChange={(itemValue) => onChange(itemValue)}
				{...rest}>
				{options.map(({ label: optionLabel, value: optionValue }) => (
					<Picker.Item key={optionLabel} label={optionLabel} value={optionValue} />
				))}
			</Picker>
		</View>
	);
};

export default CustomPicker;
