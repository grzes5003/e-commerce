import {React, useEffect} from 'react';
import {itemActions} from "../_actions";
import {connect} from "react-redux";


const ProductDetailsPage = props => {
    useEffect(() => {
        const {prodId} = props;
        props.dispatch(itemActions.getProdDetails(prodId));
    }, []);

    const {items} = props;
    return (
        <div>
            {items.loading && <div>Loading...</div>}
            {items.product && <div>{items.product.id}: {items.product.name}</div>}
        </div>
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
