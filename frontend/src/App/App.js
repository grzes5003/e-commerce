import {React, useEffect} from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {PrivateRoute} from '../_components';
import {HomePage} from '../HomePage';
import {LoginPage} from '../LoginPage';

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
        <div className="jumbotron">
            <div className="container">
                <div className="col-sm-8 col-sm-offset-2">
                    {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <div>
                            <PrivateRoute exact path="/" component={HomePage}/>
                            <Route path="/login" component={LoginPage}/>
                        </div>
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
