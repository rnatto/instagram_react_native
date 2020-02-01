import React from 'react';
import { Image } from 'react-native';
import Feed from './pages/Feed';

import logo from './assets/instagram.png';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';


const Routes = createAppContainer(
    createStackNavigator({
        Feed
    }, {
        defaultNavigationOptions: {
            headerTitleAlign: 'center',
            headerTitle: () => <Image source={logo} />,
            headerStyle: {
                backgroundColor: '#F5F5F5'
            }
        }
    })
);

export default Routes;