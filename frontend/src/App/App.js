import React from "react";
import {useEffect, useRef} from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers';
import {alertActions, cartActions} from '../_actions';
import {PrivateRoute} from '../_components';
import {HomePage} from '../HomePage';
import {LoginPage} from '../LoginPage';
import {CategoryItem, CategoryPage, ProductDetailsPage} from "../ItemsComponents";

import '../_styles/index.scss';
import {Toast, Toaster} from "@blueprintjs/core";
import {Position} from "@blueprintjs/core/lib/esnext/common/position";
import {alertConstants, userConstants} from "../_constants";
import {CartDetailsPage} from "../CartComponents/CartDetailsPage";

function App(props) {

    const mounted = useRef();
    const [getToaster, setToaster] = React.useState();

    const {alert, toastQueue, dispatch} = props;

    const toaster = useRef(null);
    // const refHandlers = {
    //     toaster: (ref) => toaster = ref,
    // };

    useEffect(() => {
        dispatch(cartActions.loadCartAfterReload());
        history.listen((location, action) => {
            dispatch(alertActions.clearToasts());
        })
    }, [])

    useEffect(() => {
        console.log('print toast did change: ', toastQueue);
        // do componentDidUpdate logic
        if (toastQueue) {
            console.log('print follow up: ', toaster.current);
            toastQueue.forEach((toast) => {
                toaster.current.show(toast);
            });
            // dispatch(alertActions.clearToasts());
        }

    }, [toastQueue]);

    return (
        <div>
            <div>
                <div>
                    {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Toaster position={Position.TOP} ref={toaster}/>
                    <Router history={history}>
                        <div>
                            <Route exact path="/" component={HomePage}/>
                            <Route path="/login" component={LoginPage}/>
                        </div>
                        <Route exact path="/product/:prodId" component={ProductDetailsPage}/>
                        <Route exact path="/category/:catId" component={CategoryPage}/>
                        <Route exact path="/cart" component={CartDetailsPage}/>
                    </Router>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    console.log("APP state: ", state);
    const {alert} = state;
    const {toastQueue} = alert;
    return {
        alert,
        toastQueue
    };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};
