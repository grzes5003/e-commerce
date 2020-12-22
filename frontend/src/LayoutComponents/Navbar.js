import React from 'react';
import {connect} from "react-redux";
import {Navbar, Button, Popover, Menu, MenuItem} from "@blueprintjs/core";
import {Alignment} from "@blueprintjs/core/lib/esnext/common/alignment";
import {history} from "../_helpers";
import {Position} from "@blueprintjs/core/lib/esnext/common/position";
import {userActions} from "../_actions";

const navbar = props => {
    const {loggedIn, user} = props;
    console.log('STATEEEEE:asdad ', props);

    const onLoginAction = (e) => {
        e.preventDefault();
        history.push('/login');
    }

    const onHomeAction = (e) => {
        e.preventDefault();
        history.push('/');
    }

    const handleLogoutAction = () => {
        userActions.logout();
        window.location.reload(false);
    };

    return (
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading onClick={onHomeAction}>Blueprint</Navbar.Heading>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                <Button className="bp3-minimal" icon="shopping-cart"/>
                <Navbar.Divider/>
                {(loggedIn && user) ?
                    <Popover content={
                        <Menu>
                            <Menu.Item text="Profile"/>
                            <Menu.Item text="Logout" onClick={handleLogoutAction}/>
                        </Menu>
                    } position={Position.RIGHT_TOP}>
                        <Button className="bp3-minimal" icon="user" text={user.text.username}/>
                    </Popover>
                    :
                    <Button className="bp3-minimal" icon="user" text='Login' onClick={onLoginAction}/>
                }
            </Navbar.Group>
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
