import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ChakraProvider} from "@chakra-ui/react"

import {App} from './App';
import {store} from './_helpers';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
