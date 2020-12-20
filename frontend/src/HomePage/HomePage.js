import {React, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../_actions';


const HomePage = (props) => {
    useEffect(() => {
        props.dispatch(userActions.getAll());
    }, []);
    const {user, users} = props;
    console.log("HomePage: ", props);
    return (
        <div className="col-md-6 col-md-offset-3">
            <h1>Hi {user.firstName}!</h1>
            <p>You're logged in with React & JWT!!</p>
            <h3>Users from secure api end point:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
            <ul>
                {users.items.text.map((user, index) =>
                    <li key={user.id}>
                        {user.firstName + ' ' + user.lastName}
                    </li>
                )}
            </ul>
            }
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    )
}

function mapStateToProps(state) {
    console.log("STATE:::: ", state);
    const {users, authentication} = state;
    const {user} = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export {connectedHomePage as HomePage};
