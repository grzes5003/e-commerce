import React from 'react'
import {connect} from "react-redux";
import {cartActions} from "../_actions";
import {Link} from "react-router-dom";
import {componentConstants} from "../_constants";
import {Button, Card} from "@blueprintjs/core";
import {Elevation} from "@blueprintjs/core/lib/esnext/common/elevation";

const ProductItem = props => {

    console.log('product: ', props);
    const {product, type} = props;
    const {name, id, price} = product;

    const handleAddToChart = (e) => {
        e.preventDefault();
        props.dispatch(cartActions.addProdToCart(id))
    };

    if (type === componentConstants.SMALL_COMPONENT) {
        return (
            <Card interactive={true}>
                <h5><Link to={`/product/${id}`}>{name}</Link></h5>
                <p>$ {price}</p>
            </Card>
        )
    }

    if (type === componentConstants.CART_PRODUCT) {
        return (
            <Card interactive={true} elevation={Elevation.TWO}>
                <h5><Link to={`/product/${id}`}>{name}</Link></h5>
                <p>Price: {price}</p>
            </Card>
        )
    }
    if (type === componentConstants.CATALOG_PRODUCT) {
        return (
                <Card interactive={true} elevation={Elevation.TWO}>
                    <h5><Link to={`/product/${id}`}>{name}</Link></h5>
                    <p>Price: {price}</p>
                    <Button onClick={handleAddToChart}>Add to cart</Button>
                </Card>
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
