import React from 'react';
import {connect} from 'react-redux';
import {alertActions, userActions} from '../_actions';
import {useEffect} from 'react'
import {Navbar} from "../LayoutComponents";
import {Button, FormGroup, InputGroup, Intent, Toast, Toaster, Tooltip} from "@blueprintjs/core";
import {Position} from "@blueprintjs/core/lib/esnext/common/position";

const LoginPage = (props) => {

    useEffect(() => {
        props.dispatch(userActions.logout());
    }, []);

    const [userData, setUserData] = React.useState({username: '', password: '', submitted: false});
    const [showPassword, setShowPassword] = React.useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserData({...userData, submitted: true});
        const {username, password} = userData;
        const {dispatch} = props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    const handleLockClick = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const lockButton = (
        <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
            <Button
                icon={showPassword ? "unlock" : "lock"}
                intent={Intent.WARNING}
                minimal={true}
                onClick={handleLockClick}
            />
        </Tooltip>
    );

    const {loggingIn} = props;
    const {username, password, submitted} = userData;

    return (
        <div>
            <Navbar/>
            <div className='container'>
                <div className='loginForm'>
                    <div className='container'>
                        <h2 className='bp3-heading'>Login</h2>
                        <FormGroup
                            labelFor="text-input"
                            labelInfo="(required)"
                            helperText={submitted && !username && 'Username is required'}
                            intent={submitted && !username ? 'danger':'none'}
                        >
                            <InputGroup
                                leftIcon="user"
                                id="text-input"
                                placeholder="Placeholder text"
                                name="username"
                                value={username}
                                onChange={handleChange}
                                className={submitted && !username && 'bp3-intent-danger'}
                                round='true'
                            />
                        </FormGroup>
                        <FormGroup
                            labelFor="text-input"
                            labelInfo="(required)"
                            helperText={submitted && !password && 'Password is required'}
                            intent={submitted && !password ? 'danger':'none'}
                        >
                            <InputGroup
                                placeholder="Enter your password..."
                                rightElement={lockButton}
                                leftIcon='key'
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleChange}
                                className={submitted && !password && 'bp3-intent-danger'}
                                round='true'
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button text="Submit" onClick={handleSubmit} loading={loggingIn} fill='true'/>
                        </FormGroup>
                    </div>
                </div>
            </div>
        </div>
    );

};

function mapStateToProps(state) {
    console.log("LOGIN state: ", state);
    const {loggingIn} = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export {connectedLoginPage as LoginPage};
