import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { CustomButton } from '../../components';
export default HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomButton
        title="Projects"
        onAction={() => navigation.navigate('Projects')}
      />
      <CustomButton
        title="Transactions"
        onAction={() => navigation.navigate('Transactions')}
      />
    </View>
  );
};
