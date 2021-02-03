import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    Box,
    Center,
    Flex,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text
} from "@chakra-ui/react";
import {componentConstants} from "../_constants";
import {Loading} from "../LayoutComponents";
import {ProductItem} from "../ItemsComponents";
import {cartActions} from "../_actions";


const OrdersPage = props => {
    const {cart} = props

    useEffect(() => {
        props.dispatch(cartActions.getAllOrders());
    }, []);

    return (
        <div className='container'>

            <Heading p={10}>Orders</Heading>

            <Center>
                {cart && cart.loading &&
                <Loading/>
                }
            </Center>

            <Center w="100%">
                <Box w={{base: "100%", lg: "70%"}}>
                {cart && cart.orders &&
                cart.orders.map((order, index) =>
                    <Accordion allowToggle w="100%">
                        <AccordionItem>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    <Text>Order {(index + 1).toString()} from {order.purchase_dtime ? order.purchase_dtime : {}}</Text>
                                </Box>
                                <AccordionIcon/>
                            </AccordionButton>
                            {order.products &&
                            <AccordionPanel pb={4}>
                                {order.products.map((product, index) =>
                                    <Box key={product.id} p={1}>
                                        <ProductItem product={product} type={componentConstants.ORDER_PRODUCT}/>
                                    </Box>
                                )}
                            </AccordionPanel>
                            }
                        </AccordionItem>
                    </Accordion>
                )
                }
                </Box>
            </Center>
        </div>
    )
}

// <Flex key={product.id} w="inherit">
//     <Box w={10}>
//         <Heading size="md">{index + 1}.</Heading>
//     </Box>
//     <ProductItem product={product} type={componentConstants.CART_PRODUCT}/>
// </Flex>


function mapStateToProps(state) {
    const {cart} = state;
    return {
        cart
    };
}

const connectedOrdersPage = connect(mapStateToProps)(OrdersPage);
export {connectedOrdersPage as OrdersPage};
