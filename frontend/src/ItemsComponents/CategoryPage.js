import {React, useEffect} from 'react'
import {connect} from "react-redux";
import {itemActions} from "../_actions";
import {createFilter} from "../_helpers/create-filter";
import {ProductItem} from "./ProductItem";
import {componentConstants} from "../_constants";
import {Navbar} from "../LayoutComponents";

const CategoryPage = props => {
    const {catId, items} = props;

    useEffect(() => {
        let filter = createFilter({cat: catId});
        props.dispatch(itemActions.getAllFiltered(filter))
    }, [])

    return (
        <div>
            <Navbar/>
            <div>Hello</div>
            {items.products && items.products.loading && <div>Loading...</div>}
            {items.products && items.products.products &&
            <div className='display: flex'>
                {items.products.products.map((product, index) =>
                    <div key={product.id}>
                        <ProductItem product={product} type={componentConstants.BIG_COMPONENT}/>
                    </div>
                )}
            </div>
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
