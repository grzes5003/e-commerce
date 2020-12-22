import React from 'react';
import {connect} from "react-redux";
import {Navbar, Button, Popover, Menu, MenuItem, PopoverInteractionKind, NonIdealState} from "@blueprintjs/core";
import {Alignment} from "@blueprintjs/core/lib/esnext/common/alignment";
import {history} from "../_helpers";
import {Position} from "@blueprintjs/core/lib/esnext/common/position";
import {userActions} from "../_actions";
import {ProductItem} from "../ItemsComponents";
import {componentConstants} from "../_constants";

const navbar = props => {
    const {loggedIn, user, cart} = props;

    const onLoginAction = (e) => {
        e.preventDefault();
        history.push('/login');
    }

    const onHomeAction = (e) => {
        e.preventDefault();
        history.push('/');
    }

    const onCartAction = (e) => {
        e.preventDefault();
        history.push('/cart');
    }

    const handleLogoutAction = () => {
        userActions.logout();
        window.location.reload(false);
    };

    return (
        <Navbar>
            <div className='container'>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading onClick={onHomeAction}>Blueprint</Navbar.Heading>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Popover
                        content={
                            <div className='container'>
                                {cart.cart && cart.cart.length > 0 ?
                                    <div className='container'>
                                        {cart.cart.map((product, index) =>
                                            <div key={product.id}>
                                                <ProductItem product={product} type={componentConstants.SMALL_COMPONENT}/>
                                            </div>
                                        )}
                                    </div>
                                    :
                                    <div className='emptyCart'>
                                        <NonIdealState
                                            icon="search"
                                            title="Empty cart"
                                            description="Your cart is empty"
                                        />
                                    </div>
                                }
                            </div>
                        }
                        interactionKind={PopoverInteractionKind.HOVER}
                    >
                        <Button className="bp3-minimal" icon="shopping-cart" onClick={onCartAction}/>
                    </Popover>
                    <Navbar.Divider/>
                    {(loggedIn && user) ?
                        <Popover content={
                            <Menu>
                                <Menu.Item text="Profile"/>
                                <Menu.Item text="Logout" onClick={handleLogoutAction}/>
                            </Menu>
                        } position={Position.BOTTOM_LEFT}
                        >
                            <Button className="bp3-minimal" icon="user" text={user.text.username}/>
                        </Popover>
                        :
                        <Button className="bp3-minimal" icon="log-in" text='Login' onClick={onLoginAction}/>
                    }
                </Navbar.Group>
            </div>
        </Navbar>
    )
}

function mapStateToProps(state) {
    const {cart, authentication} = state;
    const {user, loggedIn} = authentication;
    return {
        loggedIn,
        user,
        cart
    };
}

const connectedNavbar = connect(mapStateToProps)(navbar);
export {connectedNavbar as Navbar};
