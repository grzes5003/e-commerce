import React from 'react'
import {connect} from "react-redux";
import {cartActions} from "../_actions";
import {Link} from "react-router-dom";
import {componentConstants} from "../_constants";
import {Button, Card, Intent} from "@blueprintjs/core";
import {Elevation} from "@blueprintjs/core/lib/esnext/common/elevation";

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
    if (type === componentConstants.CATALOG_PRODUCT) {
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
                                    <Button onClick={handleAddToChart} outlined='true' intent={Intent.SUCCESS}>Add to cart</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
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
