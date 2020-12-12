import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingHorizontal: 15,
    },
    btnWrapper: {
      flex: 1,
      paddingHorizontal: 10,
      alignItems: 'flex-end',
    },
    projectListWrapper: {
      flex: 11,
    },
    projectList: {
      paddingVertical: 15,
      borderWidth: 1,
      marginVertical: 10,
      borderColor: '#7e7e7e',
      borderRadius: 10,
      padding: 10,
    },
    projectListText1: {
      width: 100,
      color: '#5f9ea0',
      fontWeight: 'bold',
    },
    projectListText2: {
      color: 'green',
      fontWeight: 'bold',
    },
    projectListTextContainer: {
      flexDirection: 'row',
    },
    modalWrapper: {
      flex: 1,
      backgroundColor: '#fff',
      paddingVertical: 20,
    },
    calanderContaner: {
      backgroundColor: '#fff',
      position: 'relative',
    },
  });

  export default Styles;