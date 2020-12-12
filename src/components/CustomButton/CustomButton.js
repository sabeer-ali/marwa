import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ title, onAction, width }) => {
  return (
    <View
      style={{
        marginVertical: 15,
        width: width ? width : 200,
        backgroundColor: '#3578e5',
        borderRadius: 10,
      }}>
      <TouchableOpacity onPress={() => onAction()}>
        <Text
          style={{
            padding: 10,
            textAlign: 'center',
            color: '#fff',
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
