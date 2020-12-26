import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {userActions, itemActions} from "../_actions";
import {CategoryItem} from "../ItemsComponents";
import {Navbar} from "../LayoutComponents";


const HomePage = (props) => {
    useEffect(() => {
        props.dispatch(itemActions.getAllCategories());
    }, []);

    const handleLogoutAction = () => {
        userActions.logout();
        window.location.reload(false);
    };

    const {user, cart, items, loggedIn, history} = props;
    return (
        <div className='window'>
            <Navbar history={history}/>
            <div className='banner'/>
            <div className='container'>
                <div className='row h-row'>
                    {user && <h1>Hi {user.firstName}!</h1>}
                </div>
                <div className='row'>
                    {items.loading && <em>Loading users...</em>}
                    {items.error && <span className="text-danger">ERROR: {items.error}</span>}
                    {items.categories &&
                    items.categories.map((category, index) =>
                        <div key={category.id} className='col-md-4'>
                            <div className='categoryItem'>
                                <CategoryItem category={category}/>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const {items, cart, authentication, history} = state;
    const {user, loggedIn} = authentication;
    return {
        loggedIn,
        user,
        items,
        cart,
        history
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export {connectedHomePage as HomePage};
