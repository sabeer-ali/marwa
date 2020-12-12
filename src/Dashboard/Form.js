import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { STORE_VARIABLE } from "../constants";
import FormControl from "../SharedComponents/FromControls";
const Form = (props) => {
	const { onClose, showform, refresh, setRefresh } = props;
	const [form, setFormValue] = useState({});
	const handleFormChange = (value, name) => {
		const newForm = { ...form };
		newForm[name] = value;
		setFormValue(newForm);
	};
	const submitForm = async () => {
		if (form.projectName && form.projectName.length > 0) {
			const asyncdata = await AsyncStorage.getItem(STORE_VARIABLE);
			let data = {};
			let projects = [];
			if (asyncdata) {
				data = JSON.parse(asyncdata);
				projects = data.projects ? data.projects : [];
			}
			const id = `pr-${new Date().getTime()}`;
			projects = [{ id, ...form }, ...projects];
			data.projects = projects;
			await AsyncStorage.setItem(STORE_VARIABLE, JSON.stringify(data));
			onClose();
			setRefresh(!refresh);
		}
	};
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={showform}
			onRequestClose={() => {
				Alert.alert("Modal has been closed.");
			}}>
			<View style={styles.centeredView}>
				<View style={styles.headerStyle}>
					<TouchableHighlight onPress={onClose}>
						<Text style={styles.textStyle}>Cancel</Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={submitForm}>
						<Text style={styles.textStyle}>Submit</Text>
					</TouchableHighlight>
				</View>
				<View style={styles.modalView}>
					<FormControl
						type="text"
						name="projectName"
						label="Project Name"
						onChange={(val) => handleFormChange(val, "projectName")}
					/>
				</View>
			</View>
		</Modal>
	);
};
export default Form;
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		// justifyContent: "center",

		alignItems: "center",
		// marginTop: 10,
		// backgroundColor: "blue",
	},
	headerStyle: {
		height: 50,
		flexDirection: "row",
		paddingLeft: 20,
		paddingRight: 20,
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	modalView: {
		flex: 1,
		backgroundColor: "white",
		width: "100%",
		// justifyContent: "center",
		alignItems: "center",
		padding: 20,
		// margin: 0,
		// backgroundColor: "white",
		// borderRadius: 20,
		// padding: 35,
		// alignItems: "center",
		// shadowColor: "#000",
		// shadowOffset: {
		// 	width: 100,
		// 	height: 2,
		// },
		// shadowOpacity: 0.25,
		// shadowRadius: 3.84,
		// elevation: 5,
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	textStyle: {
		color: "#000",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
