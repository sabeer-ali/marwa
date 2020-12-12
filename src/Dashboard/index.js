import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/AntDesign";
import { STORE_VARIABLE } from "./../constants";

import Form from "./Form";

const Dashboard = (props) => {
	const { navigation } = props;
	const [showform, setShowForm] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [projects, setProjects] = useState([]);
	// const [selectedId, setSelectedId] = useState(null);

	// getProjectList=
	useEffect(() => {
		const getProjectList = async () => {
			const asyncdata = await AsyncStorage.getItem(STORE_VARIABLE);
			if (asyncdata) {
				const data = JSON.parse(asyncdata);
				console.log("data,", asyncdata);
				if (data.projects) {
					setProjects(data.projects);
				}
			}
		};
		getProjectList();
	}, [refresh, setProjects]);

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity 
			// style={{ width: 50, backgroundColor : 'red' }}
					onPress={() =>
						navigation.push("Expences", {
							itemId: item.id,
						})
					}
				style={{
					height: 50,
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
				<Text style={{ fontWeight: "bold", marginVertical: 10, color: "#000", fontSize: 13, fontFamily : 'MontserratAlternates-Regular' }}>{item.projectName}</Text>
				<View
					>
					<Icon name="right" size={20} />
				</View>
			</TouchableOpacity>
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
			<Form showform={showform} refresh={refresh} setRefresh={setRefresh} onClose={() => setShowForm(false)} />

			<FlatList
				style={{
					flex: 1,
					backgroundColor: "#fff",
				}}
				contentContainerStyle={{
					// flex: 1,
					// backgroundColor: "#ff6666",
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					padding: 10,
				}}
				data={projects}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
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
export default Dashboard;
