import React from 'react'
import {connect} from "react-redux";
import {cartActions} from "../_actions";
import {Link} from "react-router-dom";
import {componentConstants} from "../_constants";
import {Card, Intent} from "@blueprintjs/core";
import {Elevation} from "@blueprintjs/core/lib/esnext/common/elevation";
import {Box, Image, Flex, SimpleGrid, Spacer, Container, Heading, Button, Text} from "@chakra-ui/react"
import {history} from "../_helpers";

const ProductItem = props => {

    const {product, type} = props;
    const {name, id, price} = product;

    const handleAddToChart = (e) => {
        e.preventDefault();
        props.dispatch(cartActions.addProdToCart(product))
    };

    const handleRemoveItemFromCart = (e) => {
        e.preventDefault();
        props.dispatch(cartActions.removeItemFromCartCookie(id))
    }

    const handleGoToItem = e => {
        e.preventDefault();
        history.push(`/product/${id}`);
    }

    if (type === componentConstants.SMALL_COMPONENT) {
        return (
            <Box>
                <Text onClick={handleGoToItem}>{name}</Text>
                <p>$ {price}</p>
            </Box>
        )
    }

    if (type === componentConstants.CART_PRODUCT) {
        return (
            <Flex borderWidth="1px" borderColor="teal.500" borderRadius="sm" overflow="hidden" flexWrap="wrap"
                  flexDirection="row"
            >
                <Box p={3} maxW={200} minW={100}>
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"
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
                        p={6}
                        size="md"
                        lineHeight="tight"
                        isTruncated
                        onClick={handleGoToItem}
                        className="navBarLogo"
                    >
                        {name}
                    </Heading>
                    <Heading size="md">
                        {price} $
                    </Heading>
                    <Button onClick={handleRemoveItemFromCart} variant="brutal-outline">Remove from cart</Button>
                </Box>
            </Flex>
        )
    }
    if (type === componentConstants.CATALOG_PRODUCT && false) {
        return (
            <div className='productWrapper'>
                <Card interactive={true} elevation={Elevation.TWO}>
                    <div className='row'>
                        <div className='col-md-auto'>
                            <img className="card-img-top"
                                 onClick={handleGoToItem}
                                 src="https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"
                                 alt="Card image cap"/>
                        </div>
                        <div className='col-md'>
                            <h4 className='bp3-heading'><Link to={`/product/${id}`}>{name}</Link></h4>
                        </div>
                        <div className='col-sm justify-content-end'>
                            <div className='row'>
                                <div className='priceWrapper col'>
                                    <h3 className='bp3-heading bp3-text-muted'>{price} $</h3>
                                </div>
                                <div className='buttonsWrapper col-sm-6'>
                                    <Button onClick={handleAddToChart} outlined='true' intent={Intent.SUCCESS}>Add to
                                        cart</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    if (type === componentConstants.CATALOG_PRODUCT) {
        return (
            <Flex borderWidth="0px" borderColor="teal.500" borderRadius="sm" overflow="hidden" flexWrap="wrap"
                  flexDirection="row"
                  _hover={{
                      bgGradient: "linear(to-r, teal.500,green.500)"
                  }}
            >
                <Box p={3} maxW={200} minW={100}>
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"
                        alt=""
                        boxShadow="6px 6px teal"
                        borderWidth="1px"
                        borderColor="teal.500"
                        onClick={handleGoToItem}
                        className="navBarLogo"
                    />
                </Box>
                <Box flex={1} maxW={290}>
                    <Heading
                        p={6}
                        size="md"
                        lineHeight="tight"
                        isTruncated
                        onClick={handleGoToItem}
                        className="navBarLogo"
                    >
                        {name}
                    </Heading>
                    <Container p={2} color="gray.600" h={50} noOfLines={[1, 2]}>
                        There are many benefits to a joint design and development system. Not only
                        does it bring benefits to the design team.
                    </Container>
                </Box>
                <Spacer/>
                <SimpleGrid columns={1} bgGradient="linear(to-r, teal.500,green.500)" color="white" p={6}
                            flexDirection="down">
                    <Heading size="md">
                        {price} $
                    </Heading>
                    <Spacer/>
                    <Box flex={1}>
                        <Box>
                            <Button onClick={handleAddToChart} variant="brutal-reversed">Add to cart</Button>
                        </Box>
                        {price > 99 ?
                            <Text fontSize="xs" color="grey.100">
                                Free shipping
                            </Text>
                            :
                            <div/>
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
