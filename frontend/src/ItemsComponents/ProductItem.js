import React from 'react'
import {connect} from "react-redux";
import {cartActions} from "../_actions";
import {componentConstants, itemConstants} from "../_constants";
import {Box, Image, Flex, SimpleGrid, Spacer, Container, Heading, Button, Text} from "@chakra-ui/react"
import {history} from "../_helpers";

const ProductItem = props => {

    const {product, type} = props;
    const {name, id, price, picture, brand, description} = product;

    const handleAddToChart = (e) => {
        e.preventDefault();
        props.dispatch(cartActions.addProdToCart(product))
    };

    const handleRemoveItemFromCart = (e) => {
        e.preventDefault();
        props.dispatch(cartActions.removeItemFromCartCookie(id))
    }

    const handleGoToItem = e => {
        // TODO
        //  fix: when user already on product page, navigating to different one not changing anything
        //  React Router interprets param as argument not diffrent page
        e.preventDefault();
        history.push(`/product/${id}`);
    }

    if (type === componentConstants.SMALL_COMPONENT) {
        return (
            <Flex borderWidth="0px" borderColor="teal.500" borderRadius="sm" overflow="hidden" flexWrap="wrap"
                  flexDirection="row"
                  onClick={handleGoToItem}
            >

                <Box p={1} maxW={50} minW={20}>
                    <Image
                        src={picture}
                        fallbackSrc={itemConstants.FALLBACK_IMG_URL}
                        alt=""
                        boxShadow="6px 6px teal"
                        borderWidth="1px"
                        borderColor="teal.500"
                        className="navBarLogo"
                        boxSize="50px"
                    />
                </Box>

                <SimpleGrid columns={1}>
                    <Heading
                        p={1}
                        size="sm"
                        lineHeight="tight"
                        isTruncated
                        className="navBarLogo"
                        w={{base: "190px"}}
                        overflow="hidden"
                    >
                        {name}
                        <Box bgGradient="linear(to-r, red.500, yellow.500)" boxShadow="3px 3px teal" w="180px" h={1}
                             pos="relative" transform="translate(5px,-10px)" zIndex="-5"/>
                    </Heading>
                    <Heading size="xs">$ {price}</Heading>
                </SimpleGrid>

            </Flex>
        )
    }

    if (type === componentConstants.CART_PRODUCT) {
        return (
            <Flex borderWidth="1px" borderColor="teal.500" borderRadius="sm" overflow="hidden" flexWrap="wrap"
                  flexDirection="row" w="inherit"
            >
                <Box p={3} maxW={200} minW={100}>
                    <Image
                        src={picture}
                        fallbackSrc={itemConstants.FALLBACK_IMG_URL}
                        alt=""
                        boxShadow="6px 6px teal"
                        borderWidth="1px"
                        borderColor="teal.500"
                        onClick={handleGoToItem}
                        className="navBarLogo"
                        boxSize="100px"
                    />
                </Box>
                <Box flex={1} maxW={290}>
                    <Heading
                        p={2}
                        size="md"
                        lineHeight="tight"
                        isTruncated
                        onClick={handleGoToItem}
                        className="navBarLogo"
                        w={{sm: "inherit"}}
                    >
                        {name}
                        <Box bgGradient="linear(to-r, red.500, yellow.500)" boxShadow="3px 3px teal" w="100%" h={1}
                             pos="relative" transform="translate(5px,-10px)" zIndex="-5"/>
                    </Heading>
                    <Heading size="md" p={1}>
                        {price} $
                    </Heading>
                    <Button onClick={handleRemoveItemFromCart} variant="brutal-outline">Remove from cart</Button>
                </Box>
            </Flex>
        )
    }

    if (type === componentConstants.CATALOG_PRODUCT) {
        return (
            <Flex borderWidth="0px" borderColor="teal.500" borderRadius="sm" overflow="hidden" flexWrap="wrap"
                  flexDirection={{base: "row", lg: "row"}}
                  _hover={{
                      bgGradient: "linear(to-r, teal.500,green.500)"
                  }}
            >
                <Box
                    p={3}
                    maxW={200}
                    minW={100}
                    order={{base: 1, lg: 1}}
                >
                    <Image
                        src={picture}
                        alt=""
                        boxShadow="6px 6px teal"
                        borderWidth="1px"
                        borderColor="teal.500"
                        onClick={handleGoToItem}
                        className="navBarLogo"
                        fallbackSrc={itemConstants.FALLBACK_IMG_URL}
                        boxSize="150px"
                    />
                </Box>
                <Box flex={1}
                    //maxW={800}
                     alignItems="baseline"
                     p={6}
                     order={{base: 3, lg: 2}}
                >
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                    >
                        {brand}
                    </Box>
                    <Heading
                        p={2}
                        size="md"
                        lineHeight="tight"
                        isTruncated
                        onClick={handleGoToItem}
                        className="navBarLogo"
                        w={{sm: "inherit"}}
                    >
                        {name}
                        <Box bgGradient="linear(to-r, red.500, yellow.500)" boxShadow="3px 3px teal" w="100%" h={1}
                             pos="relative" transform="translate(5px,-10px)" zIndex="-5"/>
                    </Heading>
                    <Container p={2} color="gray.600" h={50} noOfLines={2}>
                        {description}
                    </Container>
                </Box>
                <Spacer
                    order={{base: 4, lg: 3}}
                    d={{base: "none", lg: "inline"}}
                />
                <SimpleGrid columns={1} bgGradient="linear(to-r, teal.500,green.500)" color="white" p={6}
                            flexDirection="down"
                            minW="200px"
                            order={{base: 2, lg: 4}}
                >
                    <Heading size="md">
                        {price} $
                    </Heading>
                    <Spacer/>
                    <Box flex={1}>
                        <Box>
                            <Button onClick={handleAddToChart} variant="brutal-reversed">Add to cart</Button>
                        </Box>
                        {price > 99 &&
                        <Text color="gray.200"
                              fontWeight="semibold"
                              letterSpacing="wide"
                              fontSize="xs"
                              textTransform="uppercase"
                        >
                            Free shipping
                        </Text>
                        }
                    </Box>
                </SimpleGrid>

            </Flex>
        )
    }

}

function mapStateToProps(state, ownProps) {

    const {product, type} = ownProps;
    return {
        product,
        type
    };
}

const connectedProductItem = connect(mapStateToProps)(ProductItem);
export {connectedProductItem as ProductItem};
