import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomDropdown = ({
  placeholder,
  value,
  selectedStatus,
  editable,
  data,
  left,
  showName,
}) => {
  const [isDropdown, dropdownAction] = useState(false);
  const {dropdownList} = Styles;
  return (
    <View
      style={
        left
          ? {alignItems: 'flex-start', paddingVertical: 5}
          : {alignItems: 'center', paddingVertical: 5}
      }>
      <TouchableOpacity
        onPress={() => editable && dropdownAction(!isDropdown)}
        style={{
          width: '80%',
          borderWidth: 1,
          borderColor: '#7e7e7e',
          borderRadius: 10,
          height: 40,
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}>
        <Text>{value !== '' ? value : placeholder}</Text>
      </TouchableOpacity>
      {isDropdown && (
        <View style={{width: '80%'}}>
          {showName ? (
            data &&
            data.length &&
            data.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {                    
                    selectedStatus(item);
                    dropdownAction(!isDropdown);
                  }}>
                  <Text style={dropdownList}>{item[showName]}</Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  selectedStatus(
                    data && data.length && data[0] ? data[0] : 'Open',
                  );
                  dropdownAction(!isDropdown);
                }}>
                <Text style={dropdownList}>
                  {data && data.length && data[0] ? data[0] : 'Open'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  selectedStatus(
                    data && data.length && data[1] ? data[1] : 'Close',
                  );
                  dropdownAction(!isDropdown);
                }}>
                <Text style={dropdownList}>
                  {data && data.length && data[1] ? data[1] : 'Close'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;

const Styles = StyleSheet.create({
  dropdownList: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    width: '100%',
    paddingHorizontal: 10,
  },
});
