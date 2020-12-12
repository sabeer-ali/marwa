import React, { useState } from "react";
import { Alert, View, Modal, StyleSheet, Text, TouchableHighlight } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { STORE_VARIABLE } from "../constants";
import FormControl from "../SharedComponents/FromControls";
// import { compose } from "recompose";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { handleTextInput, withNextInputAutoFocusForm, withNextInputAutoFocusInput } from "react-native-formik";
// import { TextField } from "react-native-material-textfield";

// const validationSchema = Yup.object().shape({
// 	email: Yup.string().required("please! email?"),
// 	password: Yup.string().required().min(2, "pretty sure this will be hacked"),
// });

// const MyInput = compose(handleTextInput, withNextInputAutoFocusInput)(FormControl);
// const Form = withNextInputAutoFocusForm(View);
const FormWrap = (props) => {
	const { onClose, showform, refresh, setRefresh, itemId } = props;
	const [form, setFormValue] = useState({});
	const handleFormChange = (value, name) => {
		const newForm = { ...form };
		newForm[name] = value;
		setFormValue(newForm);
	};
	const handleClose = () => {
		setFormValue({});
		onClose();
	};
	const submitForm = async () => {
		console.log("form ", form);
		if (form.amount && form.description) {
			const amount = Number(form.amount);
			const { description, expenceType = "debit" } = form;
			if (isNaN(amount)) {
				Alert.alert("Enter Valid Amount");
				return;
			}
			if (!description && description.length === 0) {
				Alert.alert("Enter Description");
				return;
			}

			const asyncdata = await AsyncStorage.getItem(STORE_VARIABLE);
			let data = {};
			if (asyncdata) {
				data = JSON.parse(asyncdata);
			}

			const projectIndex = data.projects.findIndex((item) => {
				return itemId === item.id;
			});
			const project = data.projects[projectIndex];
			console.log(project);
			if (project.expences) {
				project.expences = [
					{ ...form, expenceType, description, time: new Date().getTime(), amount },
					...project.expences,
				];
			} else {
				project.expences = [{ ...form, expenceType, description, time: new Date().getTime(), amount }];
			}

			data.projects.splice(projectIndex, 1, project);
			await AsyncStorage.setItem(STORE_VARIABLE, JSON.stringify(data));
			handleClose();
			setRefresh(!refresh);
		} else {
			Alert.alert("Fill all data");
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
				{/* <Formik
					onSubmit={(values) => console.log(values)}
					validationSchema={validationSchema}
					render={(formprops) => {
						return (
							<Form style={styles.modalView}>
								<View style={styles.headerStyle}>
									<TouchableHighlight onPress={onClose}>
										<Text style={styles.textStyle}>Cancel</Text>
									</TouchableHighlight>
									<TouchableHighlight onPress={formprops.handleSubmit}>
										<Text style={styles.textStyle}>Submit</Text>
									</TouchableHighlight>
								</View>
								<MyInput label="Amount" name="amount" type="text" />
								<MyInput label="Date" name="date" type="date" />
								<MyInput label="Descrptio" name="description" type="text" />
							</Form>
						);
					}}
				/> */}
				<View style={styles.headerStyle}>
					<TouchableHighlight onPress={handleClose}>
						<Text style={styles.textStyle}>Cancel</Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={submitForm}>
						<Text style={styles.textStyle}>Submit</Text>
					</TouchableHighlight>
				</View>
				<View style={styles.modalView}>
					<FormControl
						type="text"
						name="amount"
						label="Amount"
						value={form.amount}
						keyboardType="decimal-pad"
						onChange={(val) => handleFormChange(val, "amount")}
					/>
					<FormControl
						type="picker"
						name="expenceType"
						label="Expence Type"
						value={form.expenceType}
						options={[
							{ label: "Debit", value: "debit" },
							{ label: "Credit", value: "credit" },
						]}
						onChange={(val) => {
							console.log("picker", val);
							handleFormChange(val, "expenceType");
						}}
					/>
					<FormControl
						type="text"
						name="description"
						label="Description"
						value={form.description}
						onChange={(val) => handleFormChange(val, "description")}
					/>
				</View>
			</View>
		</Modal>
	);
};
export default FormWrap;
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
		backgroundColor: "blue",
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
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
