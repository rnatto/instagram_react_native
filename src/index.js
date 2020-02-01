import React from 'react';
import {StatusBar} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

enableScreens();

import Routes from './routes';

export default function App() {
    return (
        <SafeAreaProvider>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5"></StatusBar>
            <Routes />
        </SafeAreaProvider>

    );
}
