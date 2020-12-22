import {React, useEffect} from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {PrivateRoute} from '../_components';
import {HomePage} from '../HomePage';
import {LoginPage} from '../LoginPage';
import {CategoryItem, CategoryPage, ProductDetailsPage} from "../ItemsComponents";

import '../_styles/index.scss';

function App(props) {

    console.log("APP PROPS: ", props);

    useEffect(() => {
        const {dispatch} = props;
        console.log("history: ==== ", history);

        history.listen((location, action) => {
            dispatch(alertActions.clear());
        })
    }, [])

    const {alert} = props;

    return (
        <div>
            <div>
                <div>
                    {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <div>
                            <Route exact path="/" component={HomePage}/>
                            <Route path="/login" component={LoginPage}/>
                        </div>
                        <Route exact path="/product/:prodId" component={ProductDetailsPage}/>
                        <Route exact path="/category/:catId" component={CategoryPage}/>
                    </Router>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    console.log("APP state: ", state);
    const {alert} = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};
