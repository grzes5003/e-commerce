import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    Box, Center, FormControl, Heading, Stack, FormLabel, InputGroup, InputLeftElement, Input, FormErrorMessage, Button
} from "@chakra-ui/react";
import {FiUser, FiMail, FiLock} from "react-icons/fi";
import {userActions} from "../_actions";

const RegisterPage = props => {

    useEffect(() => {
        props.dispatch(userActions.logout());
    }, []);

    const [userData, setUserData] = React.useState({
        username: '',
        password: '',
        password_rp: '',
        email: '',
        submitted: false
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserData({...userData, submitted: true});
        const {username, password, email} = userData;
        const {dispatch} = props;
        if (username && password) {
            dispatch(userActions.register(username, password, email));
        }
    }

    const {loggingIn} = props;
    const {username, email, password_rp, password, submitted} = userData;
    return (
        <Center w="100%" p={10}>
            <Box maxW="sm" borderWidth="1px" borderRadius="sm" boxShadow="6px 6px teal" overflow="hidden" >
                <Stack p={5} spacing={2}>
                    <Heading textShadow="2px 2px teal">Register</Heading>

                    <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <InputGroup size="md">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FiMail color="grey"/>}
                            />
                            <Input
                                pr="4.5rem"
                                type="email"
                                placeholder="Enter email"
                                onChange={handleChange}
                                name="email"
                                isInvalid={submitted && (!email || email.length > 45 )}
                                errorBorderColor="crimson"
                                value={email}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl id="username" isRequired>
                        <FormLabel>First name</FormLabel>

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
                                isInvalid={submitted && (!username || username.length > 45)}
                                errorBorderColor="crimson"
                                value={username}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl id="password" isRequired isInvalid={submitted && password !== password_rp}>
                        <FormLabel>Password</FormLabel>

                        <InputGroup size="md" p={1}>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FiLock color="grey"/>}
                            />
                            <Input
                                pr="4.5rem"
                                type="password"
                                placeholder="Enter password"
                                onChange={handleChange}
                                name="password"
                                isInvalid={submitted && !password}
                                errorBorderColor="crimson"
                                value={password}
                            />
                        </InputGroup>

                        <InputGroup size="md" p={1}>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FiLock color="grey"/>}
                            />
                            <Input
                                pr="4.5rem"
                                type="password"
                                placeholder="Repeat password"
                                onChange={handleChange}
                                name="password_rp"
                                isInvalid={submitted && !password_rp}
                                errorBorderColor="crimson"
                                value={password_rp}
                            />
                        </InputGroup>
                        <FormErrorMessage>Passwords must match</FormErrorMessage>

                    </FormControl>

                    <Button onClick={handleSubmit} size="lg" isLoading={loggingIn} variant="brutal">
                        Sign up
                    </Button>

                </Stack>
            </Box>
        </Center>
    );
};

function mapStateToProps(state) {
    const {loggingIn} = state.authentication;
    return {
        loggingIn
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export {connectedRegisterPage as RegisterPage};
