import React from 'react'
import {connect} from "react-redux";
import {cartActions} from "../_actions";
import {Link} from "react-router-dom";
import {componentConstants} from "../_constants";
import {Button, Card, Intent} from "@blueprintjs/core";
import {Elevation} from "@blueprintjs/core/lib/esnext/common/elevation";
import {Box, Image, Flex, SimpleGrid, Spacer, Container} from "@chakra-ui/react"

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

    if (type === componentConstants.SMALL_COMPONENT) {
        return (
            <div className='productWrapper'>
                <Card interactive={true}>
                    <h5><Link to={`/product/${id}`}>{name}</Link></h5>
                    <p>$ {price}</p>
                </Card>
            </div>
        )
    }

    if (type === componentConstants.CART_PRODUCT) {
        return (
            <div className='productWrapper'>
                <Card interactive={true} elevation={Elevation.TWO}>
                    <h5><Link to={`/product/${id}`}>{name}</Link></h5>
                    <p>Price: {price}</p>
                    <Button onClick={handleRemoveItemFromCart}>Remove from cart</Button>
                </Card>
            </div>
        )
    }
    if (type === componentConstants.CATALOG_PRODUCT && false) {
        return (
            <div className='productWrapper'>
                <Card interactive={true} elevation={Elevation.TWO}>
                    <div className='row'>
                        <div className='col-md-auto'>
                            <img className="card-img-top"
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
            <Flex borderWidth="1px" borderRadius="lg" overflow="hidden" flexWrap="wrap" flexDirection="row">
                <Box p={3} maxW={200} minW={100} bg="tomato">
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"
                        alt="Card image cap"/>
                </Box>
                <Box maxW={290}>
                    <Box bg="green.400"
                         p={6}
                         fontWeight="semibold"
                         as="h3"
                         lineHeight="tight"
                         isTruncated
                    >
                        <Link to={`/product/${id}`}><h3 className='bp3-heading'> {name}</h3></Link>
                    </Box>
                    <Container p={2} color="gray.600" h={50} noOfLines={[1,2]}>
                        There are many benefits to a joint design and development system. Not only
                        does it bring benefits to the design team.
                    </Container>
                </Box>
                <Spacer/>
                <SimpleGrid columns={1} bg="red.400" p={6}>
                    <Box>
                        <h3 className='bp3-heading bp3-text-muted'>{price} $</h3>
                    </Box>
                    <Spacer/>
                    <Box>
                        <Button onClick={handleAddToChart} outlined='true' intent={Intent.SUCCESS}>Add to
                            cart</Button>
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
