import React from "react";
import {connect} from "react-redux";
import {Navbar, NoResults} from "../LayoutComponents";
import {ProductItem} from "../ItemsComponents";
import {componentConstants} from "../_constants";
import {history} from "../_helpers";

import {
    Center,
    Heading,
    Box,
    Button,
    VStack,
    ListItem,
    Divider,
    Text,
    Flex,
    Spacer
} from "@chakra-ui/react"
import {alertActions, cartActions} from "../_actions";

const CartDetailsPage = (props) => {
    const {cart, loggedIn, dispatch} = props;

    const handleHomeRedirect = (e) => {
        e.preventDefault();
        history.push('/');
    };

    const handleOrderNow = e => {
        e.preventDefault();
        if (!loggedIn) {
            history.push('/register');
            dispatch(alertActions.error("You must be logged in"));
        } else {
            dispatch(cartActions.orderFromCart());
        }
    };

    // TODO sum can show NaN sometimes
    return (
        <div className='container'>
            <Heading p={10}>CART</Heading>
            <Divider/>
            {!cart.cart || cart.cart.length === 0 &&
            <Center p={10}>
                <Box>
                    <NoResults message="No items in cart"/>
                    <Button onClick={handleHomeRedirect} variant="brutal">Go find new products</Button>
                </Box>
            </Center>
            }
            <Center p={10} w={{base: "100%", md: "500px", lg: "inherit"}}>
                <VStack spacing={1} w="inherit">
                    {cart.cart.map((product, index) =>
                        <Flex key={product.id} w="inherit">
                            <Box w={10}>
                                <Heading size="md">{index + 1}.</Heading>
                            </Box>
                            <ProductItem product={product} type={componentConstants.CART_PRODUCT}/>
                        </Flex>
                    )}
                </VStack>
            </Center>
            <Divider color="teal.500"/>
            {cart.cart && cart.cart.length !== 0 &&
            <Flex>
                <Heading alignContent="end" w="100%">
                    <Text color="teal.500">SUM:</Text>
                    <Text bgGradient="linear(to-r, red.500, yellow.500)"
                          bgClip="text"
                          fontWeight="extrabold"
                    >{cart.cart.reduce((total, obj) => parseFloat(obj.price) + total, 0).toFixed(2)}$</Text>


                </Heading>
                <Spacer/>
                <Box p={5}>
                    <Button variant="brutal" onClick={handleOrderNow}>ORDER NOW</Button>
                </Box>
            </Flex>
            }
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

const connectedCartDetailsPage = connect(mapStateToProps)(CartDetailsPage);
export {connectedCartDetailsPage as CartDetailsPage};
