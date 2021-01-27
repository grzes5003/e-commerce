import React from "react";
import {connect} from "react-redux";
import {Route} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated && <Component {...props} />
    )} />
)


// function mapStateToProps(state) {
//     const {authentication} = state;
//     return {
//         authentication
//     };
// }
//
// const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
// export {connectedProfilePage as ProfilePage};
