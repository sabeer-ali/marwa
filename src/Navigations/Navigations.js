import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen, ProjectsScreen, TransactionsScreen,ProjectDetailsScreen } from '../Screens';
// todo:  import DrawerNav from './DrawerNavigation';

const Stack = createStackNavigator();

export default class NavigationWrapper extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Projects" component={ProjectsScreen} />
          <Stack.Screen name="ProjectsDetails" component={ProjectDetailsScreen} options={{ title: 'Projects Details' }}/>
          <Stack.Screen name="Transactions" component={TransactionsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
