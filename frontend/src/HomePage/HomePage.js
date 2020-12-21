import {React, useEffect} from 'react';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {itemActions} from "../_actions/item.actions";
import {userActions} from "../_actions";


const HomePage = (props) => {
    useEffect(() => {
        props.dispatch(itemActions.getAllCategories());
    }, []);

    const handleLogoutAction = () => {
        userActions.logout();
        window.location.reload(false);
    };

    const {user, items, loggedIn} = props;
    console.log("HomePage: ", props);
    return (
        <div className="col-md-6 col-md-offset-3">
            {user && <h1>Hi {user.text.firstName}!</h1>}
            <p>You're logged in with React & JWT!!</p>
            <h3>Users from secure api end point:</h3>
            {items.loading && <em>Loading users...</em>}
            {items.error && <span className="text-danger">ERROR: {items.error}</span>}
            {items.categories && items.categories.ok &&
            <ul>
                {items.categories.categories.map((category, index) =>
                    <li key={category.id}>
                        <Link to={`/product/${category.id}`}>{category.id}</Link>
                    </li>
                )}
            </ul>
            }

            <p>
                {loggedIn ?
                    <Link to="/" onClick={handleLogoutAction}>Logout</Link>
                    :
                    <Link to="/login">Login</Link>
                }
            </p>
        </div>
    )
}

function mapStateToProps(state) {
    console.log("STATE:::: ", state);
    const {items, authentication} = state;
    const {user, loggedIn} = authentication;
    return {
        loggedIn,
        user,
        items
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export {connectedHomePage as HomePage};
