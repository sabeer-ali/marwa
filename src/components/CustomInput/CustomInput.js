import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const CustomInput = ({
  placeholder,
  onchange,
  onFocus,
  height,
  value,
  keyboardType,
  editable
}) => {
  const { inputStyle, wrapper } = Styles;
  return (
    <View style={wrapper}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onchange}
        style={
          height
            ? [inputStyle, { height: 120, textAlignVertical: 'top' }]
            : inputStyle
        }
        onFocus={onFocus && onFocus}
        multiline={height ? true : false}
        value={value && value}
        keyboardType={keyboardType && keyboardType}
        editable = {editable&&editable}
      />
    </View>
  );
};

export default CustomInput;

const Styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#7e7e7e',
    borderRadius: 10,
    width: '80%',
    paddingHorizontal: 15,
    marginVertical: 5,
    height: 40,
  },
});
