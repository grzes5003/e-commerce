import React from 'react';
import {connect} from 'react-redux';
import {alertActions, userActions} from '../_actions';
import {useEffect} from 'react'
import {Intent, FormGroup, Toast, Toaster, Tooltip} from "@blueprintjs/core";
import {Position} from "@blueprintjs/core/lib/esnext/common/position";
import {
    Grid,
    Box,
    GridItem,
    Stack,
    Input,
    FormControl,
    FormLabel,
    InputRightElement,
    Button,
    InputGroup,
    Center,
    InputLeftElement,
    Heading
} from "@chakra-ui/react"
import {FiLock, FiKey, FiUser, FiUnlock} from "react-icons/fi";

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
            setUserData({username: username, password: '', submitted: false});
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
        <Center w="100%" p={10}>
            <Box maxW="sm" borderWidth="1px" borderRadius="sm" boxShadow="6px 6px teal" overflow="hidden">
                <Stack p={5} spacing={2}>
                    <Heading textShadow="2px 2px teal">Sign in</Heading>
                    <FormControl id="user" isRequired>
                        <InputGroup size="md">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FiUser color="grey"/>}
                            />
                            <Input
                                pr="4.5rem"
                                type="text"
                                placeholder="Enter username"
                                onChange={handleChange}
                                name="username"
                                isInvalid={submitted && !username}
                                errorBorderColor="crimson"
                                value={username}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl id="password" isRequired>
                        <InputGroup size="md">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FiKey color="grey"/>}
                            />
                            <Input
                                pr="4.5rem"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                onChange={handleChange}
                                name="password"
                                isInvalid={submitted && !password}
                                errorBorderColor="crimson"
                                value={password}
                            />
                            <InputRightElement width="4.5rem" onClick={handleLockClick}>
                                {
                                    showPassword ?
                                        <FiUnlock color="gold"/>
                                        :
                                        <FiLock color="gold"/>
                                }
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <Button onClick={handleSubmit} colorScheme="teal" size="lg" isLoading={loggingIn} variant="brutal">
                        Sign in
                    </Button>
                </Stack>
            </Box>
        </Center>
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
