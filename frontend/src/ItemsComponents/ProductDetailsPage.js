import React, {useEffect} from 'react';
import {cartActions, itemActions} from "../_actions";
import {connect} from "react-redux";
import {
    Spinner,
    Center,
    Box,
    Image,
    Flex,
    Heading,
    Container,
    Spacer,
    Button,
    Text,
    SimpleGrid,
    VStack,
    AspectRatio,
    StackDivider
} from "@chakra-ui/react";
import {Loading} from "../LayoutComponents";
import {itemConstants} from "../_constants";
import {MdLocalShipping} from "react-icons/md";
import {FiCheckCircle, FiClock} from "react-icons/fi";


const ProductDetailsPage = props => {
    useEffect(() => {
        const {prodId} = props;
        props.dispatch(itemActions.getProdDetails(prodId));
    }, []);

    const handleAddToChart = (e) => {
        e.preventDefault();
        const {items} = props;
        if (items && items.product) {
            props.dispatch(cartActions.addProdToCart(items.product));
        }
    };

    const {items} = props;
    return (
        <Box>
            {items.loading && <Loading/>}
            {items.product &&
            <div className="container">
                <Flex borderWidth="0px" borderColor="teal.500" borderRadius="sm" overflow="hidden" flexWrap="wrap"
                      flexDirection={{base: "column", lg: "row"}}
                      p={10}
                >
                    <Image
                        src={items.product.picture}
                        fallbackSrc={itemConstants.FALLBACK_IMG_URL}
                        alt=""
                        boxShadow="12px 12px teal"
                        borderWidth="1px"
                        borderColor="teal.500"
                        boxSize={{base: "100%", md: "450px"}}
                        ratio={1}
                    />

                    <VStack
                        spacing={5} p={6} pl={{lg: 50}}
                        w={{base: "inherit", lg: "auto"}}
                        divider={
                            <StackDivider
                                borderColor="teal.500"
                                w="100%"
                            />
                        }
                        alignItems="left-line"
                    >
                        <Heading size="lg">
                            {parseFloat(items.product.price).toFixed(2)}$
                        </Heading>
                        <Box>
                            <Flex flexDirection="row">
                                <FiCheckCircle size="20"/>
                                <Text pl={2}>Available</Text>
                            </Flex>
                        </Box>
                        <Box>
                            <Flex flexDirection="row">
                                <FiClock size="20"/>
                                <Text pl={2}>Delivered tomorrow</Text>
                            </Flex>
                        </Box>
                        <Box>
                            <Flex flexDirection="row">
                                <MdLocalShipping size="20"/>
                                <Text pl={2}>Free delivery from 99$</Text>
                            </Flex>
                        </Box>

                        <Box>
                            <Box>
                                <Button size="lg" onClick={handleAddToChart} variant="brutal-reversed">Add to
                                    cart</Button>
                            </Box>
                            {items.product.price > 99 &&
                            <Text color="gray.600"
                                  fontWeight="semibold"
                                  letterSpacing="wide"
                                  fontSize="xs"
                                  textTransform="uppercase"
                            >
                                Free shipping
                            </Text>
                            }
                        </Box>
                    </VStack>


                    <Box flex={1}
                         alignItems="baseline"
                         p={6}
                         w="100%"
                    >
                        <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="md"
                            textTransform="uppercase"
                            ml="2"
                        >
                            {items.product.brand}
                        </Box>
                        <Heading
                            p={2}
                            size="2xl"
                            lineHeight="tight"
                            isTruncated
                        >
                            {items.product.name}
                            <Box bgGradient="linear(to-r, red.500, yellow.500)" boxShadow="3px 3px teal" w="50%" h={1}
                                 pos="relative" transform="translate(5px,-10px)" zIndex="-5"/>
                        </Heading>
                        <Container p={2} color="gray.600">
                            {items.product.description}
                        </Container>
                    </Box>


                </Flex>
            </div>
            }
        </Box>
    )
}

function mapStateToProps(state, ownProps) {
    const {items} = state;
    const {prodId} = ownProps.match.params;
    return {
        prodId,
        items
    };
}

const connectedProductDetailsPage = connect(mapStateToProps)(ProductDetailsPage);
export {connectedProductDetailsPage as ProductDetailsPage};
