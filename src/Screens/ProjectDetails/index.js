import React from 'react';
import {View, StyleSheet, ScrollView, ToastAndroid, Alert} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

import {CustomButton, CustomInput, CustomDropdown} from '../../components';
import {storeData, getData} from '../../utility/Contants';

export default class ProjectDetailsScreen extends React.Component {
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
    projectData: null,
    isEditMode: false,
    isDisabled: true,
  };

  componentDidMount = async () => {
    const data = this.props.route.params.data;
    let form = {...this.state.form};
    console.log('Dataaaaaa', data.amount);
    if (data && data.name) {
      form.name = data.name;
      form.partyName = data.partyName;
      form.amount = data.amount;
      form.date = data.date;
      form.desc = data.desc;
      form.status = data.status;
      this.setState({form});
    }
  };

  editAction = () => {
    this.setState({isEditMode: true, isDisabled: false});
  };

  handleRemoveItem = async () => {
    let index = this.props.route.params.index;
    let listprojects = await getData('projects');
    await listprojects.splice(index, 1);
    console.log('Indexxxx', listprojects);
    await storeData('projects', listprojects);
    this.props.navigation.navigate('Home');
  };

  deleteAction = () => {
    Alert.alert('Warning', 'Are you sure, You want to Delete ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'CONFIRM', onPress: () => this.handleRemoveItem()},
    ]);
  };

  handleDatePicker = () => {
    this.setState({isDatePicker: !this.state.isDatePicker});
  };

  onDateChange = (date) => {
    let form = {...this.state.form};
    form.date = moment(date).format('DD-MM-yyyy');
    this.setState({form, isDatePicker: false}, () =>
      console.log('Date', this.state.form),
    );
  };

  handleSelectStatus = (status) => {
    let form = {...this.state.form};
    form.status = status;
    this.setState({form}, () => {
      console.log('status', this.state.form);
    });
  };

  handleForm = (value, type) => {
    let form = {...this.state.form};
    console.log('value, type', value, type);
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
    this.setState({form});
  };

  showToaster = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.TOP);
  };

  handleSubmit = async () => {
    const form = {...this.state.form};
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
      console.log('data', data);
      let index = this.props.route.params.index;
      data[index].name = form.name;
      data[index].partyName = form.partyName;
      data[index].amount = form.amount;
      data[index].date = form.date;
      data[index].desc = form.desc;
      data[index].status = form.status;
      await storeData('projects', data);
      this.showToaster('Successfully Added');
      this.setState({isAdd: false}, () => {
        this.props.navigation.navigate('Home');
      });
    }
  };

  render() {
    const {wrapper, btnWrapper} = Styles;
    const {
      isAdd,
      isDatePicker,
      projectData,
      isDisabled,
      isEditMode,
      form,
    } = this.state;

    return (
      <View style={wrapper}>
        <View style={btnWrapper}>
          <CustomButton
            title="Delete"
            onAction={this.deleteAction}
            width="25%"
          />
          {!isEditMode && (
            <CustomButton title="Edit" onAction={this.editAction} width="25%" />
          )}
        </View>

        {/* {isAdd && (
          <Modal transparent={false} visible={isAdd} animationType="fade"> */}
        {form !== null && form.name !== '' ? (
          <ProjectForm
            onAction={this.addAction}
            handleDatePicker={() => this.handleDatePicker()}
            selectedStatus={this.handleSelectStatus}
            onchange={this.handleForm}
            form={form}
            isDatePicker={isDatePicker}
            onDateChange={this.onDateChange}
            handleSubmit={this.handleSubmit}
            isDisabled={isDisabled}
          />
        ) : null}
        {/* </Modal>
        )} */}
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
  isDisabled,
}) => {
  const {modalWrapper, calanderContaner} = Styles;
  return (
    <View style={modalWrapper}>
      <ScrollView>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 25}}>
          <CustomInput
            placeholder="Name"
            onchange={(data) => onchange(data, 'name')}
            value={form.name}
            editable={!isDisabled}
          />
          <CustomInput
            placeholder="Party Name"
            onchange={(data) => onchange(data, 'partyName')}
            value={form.partyName}
            editable={!isDisabled}
          />
          <CustomInput
            placeholder="Date"
            onFocus={handleDatePicker}
            onchange={(data) => onchange(data, 'date')}
            value={form.date}
            editable={!isDisabled}
          />
          {isDatePicker && (
            <View style={calanderContaner}>
              <CalendarPicker
                onDateChange={onDateChange}
                style={{backgroundColor: '#fff'}}
              />
            </View>
          )}
          <CustomInput
            placeholder="Amount"
            onchange={(data) => onchange(data, 'amount')}
            keyboardType="decimal-pad"
            value={form.amount}
            editable={!isDisabled}
          />
          <CustomInput
            placeholder="Description"
            height={120}
            onchange={(data) => onchange(data, 'desc')}
            value={form.desc}
            editable={!isDisabled}
          />
          <CustomDropdown
            placeholder="Status"
            value={form.status}
            selectedStatus={selectedStatus}
            editable={!isDisabled}
          />
          {isDisabled ? null : (
            <View style={{alignSelf: 'center', marginTop: 15}}>
              <CustomButton title="Update" onAction={() => handleSubmit()} />
            </View>
          )}
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
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
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
    borderRadius: 10,
  },
  calanderContaner: {
    backgroundColor: '#fff',
    position: 'relative',
  },
});
