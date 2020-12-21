import {React, useEffect} from 'react'
import {connect} from "react-redux";
import {itemActions} from "../_actions";
import {createFilter} from "../_helpers/create-filter";
import {ProductItem} from "./ProductItem";
import {componentConstants} from "../_constants";

const CategoryPage = props => {
    const {catId, items} = props;

    useEffect(() => {
        let filter = createFilter({cat: catId});
        props.dispatch(itemActions.getAllFiltered(filter))
    }, [])

    return (
        <div>
            <div>Hello</div>
            {items.products && items.products.loading && <div>Loading...</div>}
            {items.products && items.products.products &&
            <ul>
                {items.products.products.map((product, index) =>
                    <li key={product.id}>
                        <ProductItem product={product} type={componentConstants.BIG_COMPONENT}/>
                    </li>
                )}
            </ul>
            }
        </div>
    )

}

function mapStateToProps(state, ownProps) {
    const {catId} = ownProps.match.params;
    const {items} = state;
    return {
        catId,
        items
    };
}

const connectedCategoryPage = connect(mapStateToProps)(CategoryPage);
export {connectedCategoryPage as CategoryPage};
