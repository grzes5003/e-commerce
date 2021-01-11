import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ChakraProvider, WrapItem} from "@chakra-ui/react"
import {extendTheme} from "@chakra-ui/react"

import {App} from './App';
import {store} from './_helpers';
import reportWebVitals from './reportWebVitals';

const theme = extendTheme({
    fonts: {
        heading: 'Menlo',
        body: 'Menlo',
        mono: "Menlo, monospace"
    },
    components: {
        Box: {
            variants: {
                "brutal": {
                    boxShadow:"6px 6px teal",
                    borderWidth:"1px",
                    borderColor:"teal",
                    borderRadius:"sm"
                },
                "brutal-hover": {
                    boxShadow:"6px 6px teal",
                    borderWidth:"1px",
                    borderColor:"teal",
                    borderRadius:"sm",
                    _hover: {
                        bgGradient: "linear(to-r, red.500, yellow.500)",
                        transform: "translate(-5px,-5px)",
                        boxShadow: "11px 11px teal"
                    }
                }
            }
        },
        Button: {
            variants: {
                "brutal": {
                    borderRadius: "0px",
                    borderWidth: "0px",
                    bgGradient: "linear(to-r, teal.500,green.500)",
                    color:"white",
                    _hover: {
                        bgGradient: "linear(to-r, red.500, yellow.500)",
                    }
                },
                "brutal-outline": {
                    borderRadius: "0px",
                    borderColor: "teal",
                    borderWidth: "1px",
                    _hover: {
                        bgGradient: "linear(to-r, red.500, yellow.500)",
                        color:"white",
                    }
                },
                "brutal-reversed": {
                    borderRadius: "0px",
                    borderColor: "teal",
                    borderWidth: "1px",
                    color: "white",
                    bgGradient: "linear(to-r, red.500, yellow.500)",
                    _hover: {
                        bgGradient: "linear(to-r, teal.500,green.500)",
                    }
                },
                "brutal-ghost": {
                    borderRadius: "0px",
                    borderWidth: "0px",
                    _hover: {
                        bgGradient: "linear(to-r, red.500, yellow.500)",
                        color:"white",
                    }
                },
            }
        },
        Input: {
            variants: {
                "brutal": {
                    field: {
                        borderRadius: "0px",
                        borderColor: "teal",
                        borderWidth: "1px",
                        focusBorderColor: "teal",
                    },
                    addon: {
                        borderRadius: "0px",
                        borderColor: "teal",
                        borderWidth: "1px",
                        focusBorderColor: "teal",
                    }
                }
            }
        },
        Divider: {
            color: "black"
        }
    }
})

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
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
