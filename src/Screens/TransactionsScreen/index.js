// import React from 'react';
// import { View, StyleSheet, TouchableOpacity } from 'react-native';
// import { CustomButton } from '../../components';

// export default TransactionsScreen = () => {
//   const { wrapper } = Styles;
//   return (
//     <View style={wrapper}>
//       <View>
//         <CustomButton title="Add" onAction={() => alert('add')} width={'25%'}/>
//       </View>
//       <View>

//       </View>
//     </View>
//   );
// };

// const Styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

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

import {CustomButton, CustomInput, CustomDropdown} from '../../components';
import {storeData, getData} from '../../utility/Contants';
import Styles from "./styles";
import { TextInput } from 'react-native-gesture-handler';

export default class TransactionsScreen extends React.Component {
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
    newProjectsList: [],    
  };

  componentDidMount = async () => {
    let listprojects = await getData('projects');
    this.setState({listprojects});
  };

  addAction = () => {
    this.setState({isAdd: !this.state.isAdd});
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

      let result = data !== null ? [...data] : [];

      // if (data !== null) {
      result.push(form);
      // }
      await storeData('projects', result);
      this.showToaster('Successfully Added');
      this.setState({isAdd: false}, () => {
        this.props.navigation.navigate('Home');
      });
    }
  };

  handleNewProjects = () => {
    let newProjectsList = [...this.state.newProjectsList];
    
      let data = {
        projectName: '',
        amount: 0,
      };
  
      newProjectsList.push(data);
      console.log('newProjectsList', newProjectsList);
      this.setState({newProjectsList});
    
  };

  getSelectedProjectList = (projectList,index) => {
    let newProjectsList = [...this.state.newProjectsList];
    console.log("PR001",projectList,index);
    newProjectsList[index].projectName = projectList.name;
    newProjectsList[index].amount = projectList.amount;
    this.setState({newProjectsList})
  }

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
    const {
      isAdd,
      isDatePicker,
      form,
      listprojects,
      isToggleProjects,
      newProjectsList,
    } = this.state;

    return (
      <View style={wrapper}>
        <View style={btnWrapper}>
          <CustomButton title="Add" onAction={this.addAction} width="25%" />
          {/* <Icon size={45} color="green" name="add-circle" /> */}
        </View>

        {/* <View style={projectListWrapper}>
          {listprojects && listprojects.length
            ? listprojects.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={projectList}
                    onPress={() =>
                      this.props.navigation.navigate('ProjectsDetails', {
                        data: item,
                        index: index,
                      })
                    }>
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
        </View> */}

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
              toggleProjects={this.handleNewProjects}
              newProjectsList={newProjectsList}
              listprojects={listprojects}
              getSelectedProjectList={this.getSelectedProjectList}
            />
          </Modal>
        )}
      </View>
    );
  }
}

const NewProjectsSection = ({data,index,listprojects,getSelectedProjectList}) => {
  console.log("data",data)
  return (
    <View style={{ marginBottom : 10, paddingLeft : 50, backgroundColor : '#8fbc8f', paddingVertical : 15, margin: 15, borderRadius : 10 }}>
      <View style={{   }}>        
        <View style={{marginBottom : 10}}/>
        <CustomDropdown   
          left
          placeholder={'Project Name'}
          value={data.projectName}
          selectedStatus={(list)=>getSelectedProjectList(list,index)}
          editable={true}
          showName = "name"
          data={listprojects}
        />      
      </View>

      {data.amount!==''&&<View style={{   }}>        
        <View style={{marginBottom : 10}} />              
        <View style={{
          width: '80%',
          borderWidth: 1,
          borderColor: '#7e7e7e',
          borderRadius: 10,
          height: 40,
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}>
          <Text>Amount : {data.amount}</Text>
        </View>
        </View>}
    </View>
  );
};

const ProjectForm = ({
  onAction,
  handleDatePicker,
  selectedStatus,
  form,
  onchange,
  isDatePicker,
  onDateChange,
  handleSubmit,
  toggleProjects,
  newProjectsList,
  listprojects,
  getSelectedProjectList
}) => {
  const {modalWrapper, calanderContaner} = Styles;
  return (
    <View style={modalWrapper}>
      <ScrollView>
        <View>
          <TouchableOpacity
            onPress={() => onAction()}
            style={{
              alignSelf: 'flex-end',
              paddingHorizontal: 15,
              backgroundColor: '#b30000',
              borderRadius: 10,
              paddingVertical: 7,
              marginRight: 5,
            }}>
            <Text style={{color: '#fff'}}>Close</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 25}}>
          <CustomInput
            placeholder="Expense Name"
            onchange={(data) => onchange(data, 'name')}
          />
          <CustomInput
            placeholder="Ref Number"
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
                style={{backgroundColor: '#fff'}}
              />
            </View>
          )}
          <CustomDropdown
            placeholder="Income/Expence"
            value={form.status}
            selectedStatus={selectedStatus}
            editable={true}
            data={['Income', 'Expence']}
          />
          <CustomInput
            placeholder="Description"
            height={120}
            onchange={(data) => onchange(data, 'desc')}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 40,
              marginVertical: 15,
            }}>
            <Text>Projects</Text>
            <TouchableOpacity onPress={() => toggleProjects()}>
              <Icon size={35} color="#000" name="add-circle" />
            </TouchableOpacity>
          </View>

          {newProjectsList && newProjectsList.length
            ? newProjectsList.map((item, index) => {
              return(
                <NewProjectsSection data={item} key={index} index={index} listprojects={listprojects} getSelectedProjectList={getSelectedProjectList}/>
              )
              })
            : null}

            {/* {newProjectsList&&newProjectsList.length&&newProjectsList} */}

          <View style={{alignSelf: 'center', marginTop: 15}}>
            <CustomButton title="Submit" onAction={() => handleSubmit()} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

