import React from "react";
import CustomInput from "./CustomInput";
import CustomPicker from "./CustomPicker";
import CustomSwitch from "./CustomSwitch";
const FormControl = (props) => {
	const { type } = props;
	switch (type) {
		case "text":
			return <CustomInput {...props} />;
		case "switch":
			return <CustomSwitch {...props} />;
		case "picker":
			return <CustomPicker {...props} />;
		default:
			return <CustomInput {...props} />;
	}
};
export default FormControl;
