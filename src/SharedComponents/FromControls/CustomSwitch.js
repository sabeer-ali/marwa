import React from "react";
import { Switch, Text, View } from "react-native";
const CustomSwitch = (props) => {
	const { placeholder, label, onChange, onChangeText, ...rest } = props;
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
			<Switch
				trackColor={{ false: "#767577", true: "#81b0ff" }}
				thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
				ios_backgroundColor="#3e3e3e"
				onValueChange={onChange}
				// value={isEnabled}
				{...rest}
			/>
			{/* <TextInput
				placeholder={placeholder && placeholder}
				onChangeText={onChangeText ? onChangeText : onChange}
				style={{
					borderWidth: 1,
					borderColor: "#000",
					width: "80%",
					borderRadius: 12,
					backgroundColor: "#fff",
					fontSize: 15,
				}}
				
			/> */}
		</View>
	);
};

export default CustomSwitch;
