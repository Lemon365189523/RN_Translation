/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import App from "./containers/app";
import React, { Component } from "react";
import { Provider } from 'react-redux';
import store from './store/store';

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default Root;