import React from 'react';
import {connect} from "react-redux";
import {Navbar, PopoverInteractionKind, NonIdealState, Text} from "@blueprintjs/core";
import {Alignment} from "@blueprintjs/core/lib/esnext/common/alignment";
import {history} from "../_helpers";
import {Position} from "@blueprintjs/core/lib/esnext/common/position";
import {userActions} from "../_actions";
import {ProductItem} from "../ItemsComponents";
import {componentConstants} from "../_constants";
import Badge from '@material-ui/core/Badge';
import {
    Flex,
    Spacer,
    Box,
    Heading,
    Divider,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Portal,
    Button,
    VStack,
    StackDivider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Stack,
    Center
} from "@chakra-ui/react"
import {FiShoppingCart, FiUser} from "react-icons/fi";


const navbar = props => {
    const {loggedIn, user, cart} = props;

    const onLoginAction = (e) => {
        e.preventDefault();
        history.push('/login');
    }

    const onRegisterAction = e => {
        e.preventDefault();
        history.push('/register');
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
    if (false) {
        return (
            <Navbar>
                <div className='container'>
                    <Navbar.Group align={Alignment.LEFT}>
                        <div className="navBarLogo">
                            <Navbar.Heading onClick={onHomeAction}>Blueprint</Navbar.Heading>
                        </div>
                    </Navbar.Group>
                    <Navbar.Group align={Alignment.RIGHT}>
                        <Popover
                            content={
                                <div className='container'>
                                    {cart.cart && cart.cart.length > 0 ?
                                        <div className='container'>
                                            {cart.cart.map((product, index) =>
                                                <div key={product.id}>
                                                    <ProductItem product={product}
                                                                 type={componentConstants.SMALL_COMPONENT}/>
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
                            <Badge badgeContent={cart.cart && cart.cart.length > 0 ? cart.cart.length : 0}
                                   overlap="circle" color="primary">
                                <Button className="bp3-minimal" icon="shopping-cart" onClick={onCartAction}/>
                            </Badge>
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
                                <Button className="bp3-minimal" icon="user" text={user.username}/>
                            </Popover>
                            :
                            <div>
                                <Button className="bp3-minimal" icon="log-in" text='Sign in' onClick={onLoginAction}/>
                                or
                                <Button className="bp3-minimal" icon="new-person" text='Sign up'
                                        onClick={onLoginAction}/>
                            </div>
                        }
                    </Navbar.Group>
                </div>
            </Navbar>
        )
    }
    return (
        <div>
            <Flex>
                <Center p="3">
                    <div className="navBarLogo" onClick={onHomeAction}>
                        <Heading textShadow="2px 2px teal" size="md">BLUEPRINT</Heading>
                    </div>
                </Center>

                <Spacer/>

                <Center p={3}>
                    <Popover trigger="hover">
                        <PopoverTrigger>
                            <Badge badgeContent={cart.cart && cart.cart.length > 0 ? cart.cart.length : 0}
                                   color="primary">
                                <FiShoppingCart size={20} onClick={onCartAction} className="navBarLogo"/>
                            </Badge>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                                <PopoverBody>
                                    {cart.cart && cart.cart.length > 0 ?
                                        <VStack
                                            divider={<StackDivider borderColor="gray.200"/>}
                                            spacing={4}
                                            align="stretch"
                                        >
                                            {cart.cart.map((product, index) =>
                                                <div key={product.id}>
                                                    <ProductItem product={product}
                                                                 type={componentConstants.SMALL_COMPONENT}/>
                                                </div>
                                            )}
                                        </VStack>
                                        :
                                        <div className='emptyCart'>
                                            <NonIdealState
                                                icon="search"
                                                title="Empty cart"
                                                description="Your cart is empty"
                                            />
                                        </div>
                                    }
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </Center>
                <Box pl={2}>
                    <Divider orientation="vertical"/>
                </Box>
                <Box p={2}>
                    {(loggedIn && user) ?
                        <Menu>
                            <MenuButton as={Button} leftIcon={<FiUser/>} variant="ghost">{user.firstName}</MenuButton>
                            <MenuList>
                                <MenuItem>Profile</MenuItem>
                                <MenuItem onClick={handleLogoutAction}>Sign out</MenuItem>
                            </MenuList>
                        </Menu>
                        :
                        <Stack direction="row" spacing={3}>
                            <Box>
                                <Button onClick={onLoginAction} variant="brutal-outline">Sign in</Button>
                            </Box>
                            <Box>
                                <Button onClick={onRegisterAction} variant="brutal">Sign up</Button>
                            </Box>
                        </Stack>
                    }
                </Box>

            </Flex>
            <Divider boxShadow="dark-lg"/>
        </div>
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
