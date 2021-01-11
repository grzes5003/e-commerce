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
    Button
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
            <Center>
                { !cart.cart || cart.cart.length === 0 &&
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
                <Box>
                    {cart.cart.map((product, index) =>
                        <div key={product.id}>
                            <ProductItem product={product} type={componentConstants.CART_PRODUCT}/>
                        </div>
                    )}
                </Box>
            </Center>
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
