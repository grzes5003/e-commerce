import React from 'react'
import {connect} from "react-redux";
import {cartActions} from "../_actions";
import {Link} from "react-router-dom";
import {componentConstants} from "../_constants";

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
            <div>
                <Link to={`/product/${id}`}>{id}</Link>: {name}
            </div>
        )
    }
    if (type === componentConstants.BIG_COMPONENT) {
        return (
            <div>
                <Link to={`/product/${id}`}>{id}</Link>: {name} | {price}
                <div onClick={handleAddToChart}>Add to chart</div>
            </div>
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
