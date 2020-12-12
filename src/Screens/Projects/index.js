import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import { CustomButton, CustomInput, CustomDropdown } from '../../components';
import { storeData, getData } from '../../utility/Contants';

export default class ProjectScreen extends React.Component {
  state = {
    isAdd: false,
    isDatePicker: false,
    form: {
      name: '',
      partyName: '',
      date: '',
      amount: '',
      desc: '',
      status: '',
    },
    listprojects: [],
  };

  componentDidMount = async () => {
    let listprojects = await getData('projects');
    this.setState({ listprojects });
  };

  addAction = () => {
    this.setState({ isAdd: !this.state.isAdd });
  };

  handleDatePicker = () => {
    this.setState({ isDatePicker: !this.state.isDatePicker });
  };

  onDateChange = (date) => {
    let form = { ...this.state.form };
    form.date = moment(date).format('DD-MM-yyyy');
    this.setState({ form, isDatePicker: false }, () =>
      console.log('Date', this.state.form),
    );
  };

  handleSelectStatus = (status) => {
    let form = { ...this.state.form };
    form.status = status;
    this.setState({ form }, () => {
      console.log('status', this.state.form);
    });
  };

  handleForm = (value, type) => {
    let form = { ...this.state.form };
    if (type === 'name') {
      form[type] = value;
    }
    if (type === 'partyName') {
      form[type] = value;
    }
    if (type === 'amount') {
      form[type] = value;
    }
    if (type === 'desc') {
      form[type] = value;
    }
    this.setState({ form });
  };

  showToaster = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.TOP);
  };

  handleSubmit = async () => {
    const form = { ...this.state.form };
    let err = {
      msg: '',
      isError: false,
    };

    if (form.name === '') {
      err.msg = 'Name Field not Empty';
      err.isError = true;
    } else if (form.partyName === '') {
      err.msg = 'Party Name Field not Empty';
      err.isError = true;
    } else if (form.date === '') {
      err.msg = 'Date Name Field not Empty';
      err.isError = true;
    } else if (form.amount === '') {
      err.msg = 'Amount Name Field not Empty';
      err.isError = true;
    } else if (form.desc === '') {
      err.msg = 'Description  Field not Empty';
      err.isError = true;
    } else if (form.status === '') {
      err.msg = 'Status Connot Be Empty';
      err.isError = true;
    }

    if (err.isError) {
      this.showToaster(err.msg);
    } else {
      let data = await getData('projects');
      console.log("data",data)

      let result = data !== null ? [...data] : [] ;

      // if (data !== null) {
        result.push(form);
      // }
      await storeData('projects', result);
      this.showToaster('Successfully Added');
      this.setState({ isAdd: false }, () => {
        this.props.navigation.navigate('Home');
      });
    }
  };

  render() {
    const {
      wrapper,
      btnWrapper,
      projectListWrapper,
      projectList,
      projectListText1,
      projectListText2,
      projectListTextContainer,
    } = Styles;
    const { isAdd, isDatePicker, form, listprojects } = this.state;

    return (
      <View style={wrapper}>
        <View style={btnWrapper}>
          <CustomButton title="Add" onAction={this.addAction} width="25%" />
          {/* <Icon size={45} color="green" name="add-circle" /> */}
        </View>

        <View style={projectListWrapper}>
          {listprojects && listprojects.length
            ? listprojects.map((item, index) => {
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={projectList} 
                    onPress={()=>this.props.navigation.navigate("ProjectsDetails",{
                      data : item, 
                      index : index
                    })}>
                    <View style={projectListTextContainer}>
                      <Text style={projectListText1}>Project Name </Text>
                      <Text style={projectListText2}>: {item.name}</Text>
                    </View>

                    <View style={projectListTextContainer}>
                      <Text style={projectListText1}>Project Date </Text>
                      <Text style={projectListText2}>: {item.date}</Text>
                    </View>

                    <View style={projectListTextContainer}>
                      <Text style={projectListText1}>Project Status </Text>
                      <Text style={projectListText2}>: {item.status}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            : null}
        </View>

        {isAdd && (
          <Modal transparent={false} visible={isAdd} animationType="fade">
            <ProjectForm
              onAction={this.addAction}
              handleDatePicker={() => this.handleDatePicker()}
              selectedStatus={this.handleSelectStatus}
              onchange={this.handleForm}
              form={form}
              isDatePicker={isDatePicker}
              onDateChange={this.onDateChange}
              handleSubmit={this.handleSubmit}
            />
          </Modal>
        )}
      </View>
    );
  }
}

const ProjectForm = ({
  onAction,
  handleDatePicker,
  selectedStatus,
  form,
  onchange,
  isDatePicker,
  onDateChange,
  handleSubmit,
}) => {
  const { modalWrapper, calanderContaner } = Styles;
  return (
    <View style={modalWrapper}>
      <ScrollView>
        <View>
          <TouchableOpacity
            onPress={() => onAction()}
            style={{ alignSelf: 'flex-end', paddingHorizontal: 15, backgroundColor : '#b30000', borderRadius : 10, paddingVertical :7, marginRight : 5}}>
            <Text style={{color :'#fff'}}>Close</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 25 }}>
          <CustomInput
            placeholder="Name"
            onchange={(data) => onchange(data, 'name')}
          />
          <CustomInput
            placeholder="Party Name"
            onchange={(data) => onchange(data, 'partyName')}
          />
          <CustomInput
            placeholder="Date"
            onFocus={handleDatePicker}
            onchange={(data) => onchange(data, 'date')}
            value={form.date}
          />
          {isDatePicker && (
            <View style={calanderContaner}>
              <CalendarPicker
                onDateChange={onDateChange}
                style={{ backgroundColor: '#fff' }}
              />
            </View>
          )}
          <CustomInput
            placeholder="Amount"
            onchange={(data) => onchange(data, 'amount')}
            keyboardType="decimal-pad"
          />
          <CustomInput
            placeholder="Description"
            height={120}
            onchange={(data) => onchange(data, 'desc')}
          />
          <CustomDropdown
            placeholder="Status"
            value={form.status}
            selectedStatus={selectedStatus}
            editable = {true}
          />
          <View style={{ alignSelf: 'center', marginTop: 15 }}>
            <CustomButton title="Submit" onAction={() => handleSubmit()} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

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
