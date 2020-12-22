import React from "react";
import {connect} from "react-redux";
import {Navbar} from "../LayoutComponents";
import {ProductItem} from "../ItemsComponents";
import {componentConstants} from "../_constants";
import {Button, Intent, NonIdealState} from "@blueprintjs/core";
import {history} from "../_helpers";


const CartDetailsPage = (props) => {
    const {cart} = props;

    const handleHomeRedirect = (e) => {
        e.preventDefault();
        history.push('/');
    }

    return (
        <div>
            <Navbar/>
            <div className='container'>
                <h1>CART</h1>
                <div>
                    <NonIdealState
                        icon="search"
                        title="Empty cart"
                        description="Your cart is empty"
                        action={
                            <Button onClick={handleHomeRedirect} intent={Intent.SUCCESS}>Go find new products</Button>
                        }
                    />
                </div>

                <div>
                    {cart.cart.map((product, index) =>
                        <div key={product.id}>
                            <ProductItem product={product} type={componentConstants.CART_PRODUCT}/>
                        </div>
                    )}
                </div>
            </div>
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
