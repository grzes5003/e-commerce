import {React, useEffect} from 'react';
import {itemActions} from "../_actions/item.actions";


const ProductDetailsPage = props => {
    useEffect(() => {
        const {prodId} = props;
        props.dispatch(itemActions.getProdDetails(prodId));
    }, []);
    return (
        <div>NAME:</div>
    )
}

export {ProductDetailsPage};
