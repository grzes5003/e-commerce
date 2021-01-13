import React from "react";
import {useEffect, useRef} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers';
import {cartActions} from '../_actions';
import {HomePage} from '../HomePage';
import {LoginPage} from '../LoginPage';
import {CategoryItem, CategoryPage, ProductDetailsPage} from "../ItemsComponents";

import '../_styles/index.scss';
import {CartDetailsPage} from "../CartComponents/CartDetailsPage";
import {NotFound} from "../NotFound"
import {Navbar} from "../LayoutComponents";
import {RegisterPage} from "../RegisterPage";

function App(props) {

    const {dispatch} = props;

    useEffect(() => {
        dispatch(cartActions.loadCartAfterReload());
    }, [])

    return (
        <div>
            <div>
                <div>
                    <Router history={history}>
                        <Navbar/>
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route path="/login" component={LoginPage}/>
                            <Route path="/register" component={RegisterPage}/>
                            <Route exact path="/product/:prodId" component={ProductDetailsPage}/>
                            <Route exact path="/category/:catId" component={CategoryPage}/>
                            <Route exact path="/cart" component={CartDetailsPage}/>
                            <Route path="*" component={NotFound}/>
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const {alert} = state;
    const {toastQueue} = alert;
    return {
        alert,
        toastQueue
    };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};
