import React from "react";
import {connect} from "react-redux";
import {Navbar} from "../LayoutComponents";
import {ProductItem} from "../ItemsComponents";
import {componentConstants} from "../_constants";
import {Intent, NonIdealState} from "@blueprintjs/core";
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
    Flex
} from "@chakra-ui/react"

const CartDetailsPage = (props) => {
    const {cart} = props;

    const handleHomeRedirect = (e) => {
        e.preventDefault();
        history.push('/');
    }

    return (
        <div className='container'>
            <Heading p={10}>CART</Heading>
            <Divider/>
            <Center p={10}>
                {!cart.cart || cart.cart.length === 0 &&
                <Box>
                    <NonIdealState
                        icon="search"
                        title="Empty cart"
                        description="Your cart is empty"
                        action={
                            <Button onClick={handleHomeRedirect} colorScheme="teal">Go find new products</Button>
                        }
                    />
                </Box>
                }
                <VStack spacing={1}>
                {cart.cart.map((product, index) =>
                    <Flex key={product.id}>
                        <Box w={10}>
                            <Heading size="md">{index+1}.</Heading>
                        </Box>
                        <ProductItem product={product} type={componentConstants.CART_PRODUCT}/>
                    </Flex>
                )}
                </VStack>
            </Center>
            <Divider/>
            <Box alignContent="end" w="100%">
                SUMA
            </Box>
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
