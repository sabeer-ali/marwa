import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/AntDesign";
import { STORE_VARIABLE } from "./../constants";

import Form from "./Form";

const Expences = (props) => {
	const { route } = props;
	const [showform, setShowForm] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [expences, setExpences] = useState([]);
	const { itemId } = route.params;
	const [creditTotal, setCreditTotal] = useState(0);
	const [debitTotal, setDebitTotal] = useState(0);

	// getProjectList=
	useEffect(() => {
		const getExpences = async () => {
			const asyncdata = await AsyncStorage.getItem(STORE_VARIABLE);
			if (asyncdata) {
				const data = JSON.parse(asyncdata);
				if (data.projects) {
					// setExpences(data.projects);
					const projects = data.projects.find((item) => {
						return itemId === item.id;
					});
					let expencesList = [];
					if (projects.expences) {
						expencesList = projects.expences;
					}
					setExpences(expencesList);
				}
			}
		};
		getExpences();
	}, [refresh, setExpences, itemId]);

	useEffect(() => {
		const spent = expences.reduce((total, num) => {
			if (num.expenceType === "credit") {
				return total;
			}
			return total + num.amount;
		}, 0);
		const debit = expences.reduce((total, num) => {
			if (num.expenceType === "credit") {
				return total + num.amount;
			}
			return total;
		}, 0);
		setDebitTotal(debit);
		setCreditTotal(spent);
	}, [expences, setCreditTotal, setDebitTotal]);

	const renderItem = ({ item }) => {
		return (
			<View
				style={{
					height: 0,
					width: "100%",
					flexDirection: "row",
					backgroundColor: "#fff",
					borderRadius: 20,
					padding: 15,
					paddingRight: 10,
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: 10,
					shadowColor: "#000",
					shadowOffset: {
						width: 100,
						height: 2,
					},
					shadowOpacity: 0.25,
					shadowRadius: 3.84,
					elevation: 5,
				}}>
				<Text style={{ width: "70%", fontWeight: "bold", marginVertical: 10, color: "#000", fontSize: 13 }}>
					{item.description}
				</Text>
				<Text
					style={{
						fontWeight: "bold",
						marginVertical: 10,
						color: item.expenceType === "credit" ? "green" : "red",
						fontSize: 13,
					}}>{`${"\u20B9"} ${item.amount}/-`}</Text>
			</View>
		);
	};

	return (
		<View style={{ flex: 1, backgroundColor: "#6fe789" }}>
			<View style={{ height: 200, justifyContent: "center", alignItems: "center" }}>
				<TouchableOpacity onPress={() => setShowForm(true)}>
					<Text style={{ textAlign: "center" }}>ADD</Text>
					<Icon name="plussquareo" size={50} />
				</TouchableOpacity>
			</View>
			<Form
				itemId={itemId}
				showform={showform}
				refresh={refresh}
				setRefresh={setRefresh}
				onClose={() => setShowForm(false)}
			/>
			<View
				style={{
					marginLeft: 20,
					backgroundColor : '#0080008f',
					padding: 15,
					borderRadius : 15,
					margin : 10
				}}>
				<Text
					style={{
						color: "#ff0000a1",
						fontWeight: "bold",
						fontFamily: "MontserratAlternates-Regular",
						fontSize: 18,
					}}>{`You Spent : \u20B9 ${creditTotal}/-`}</Text>
				<Text
					style={{
						color: "#211796",
						fontFamily: "MontserratAlternates-Regular",
						fontWeight: "bold",
						fontSize: 18,
					}}>{`You Erned : \u20B9 ${debitTotal - creditTotal}/-`}</Text>
			</View>

			<FlatList
				style={{
					flex: 1,
					backgroundColor: "#ffffff",
				}}
				contentContainerStyle={{
					// flex: 1,
					// backgroundColor: "#ff6666",
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					padding: 10,
					// borderTopLeftRadius : 15					
				}}
				data={expences}
				renderItem={renderItem}
				keyExtractor={(item, index) => `item.id${index}`}
			/>
			{/* <View
				style={{
					flex: 9,
					backgroundColor: "#ff6666",
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					padding: 10,
				}}
			/> */}
		</View>
	);
};
export default Expences;
