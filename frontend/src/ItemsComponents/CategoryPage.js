import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {itemActions} from "../_actions";
import {createFilter} from "../_helpers/create-filter";
import {ProductItem} from "./ProductItem";
import {componentConstants, itemConstants} from "../_constants";
import {Navbar} from "../LayoutComponents";
import {FilterComponent} from "./FilterComponent";
import {ViewingProperties} from "./ViewingProperties";
import Pagination from '@material-ui/lab/Pagination';
import {Grid, Box, GridItem} from "@chakra-ui/react"

const CategoryPage = props => {
    const {catId, items} = props;

    const [getViewFilter, setViewFilter] = React.useState({limit: 20, offset: 0, order: itemConstants.NUM_DESC});

    useEffect(() => {
        const {limit, offset, order} = getViewFilter;
        let filter = createFilter({cat: catId, offset: offset, limit: limit, sort_order: order});
        props.dispatch(itemActions.getAllFiltered(filter))
    }, [getViewFilter]);

    const getNumOfPages = () => {
        if (items.products && items.products.numOfResults) {
            return Math.ceil(items.products.numOfResults / getViewFilter.limit);
        }
        return 1;
    }

    const handlePageChange = (e, page) => {
        e.preventDefault();
        const {limit} = getViewFilter;
        setViewFilter({...getViewFilter, offset: limit * (page - 1)});
    }

    return (
        <div className="container">
            <Box className='jumbotron text-center'>
                <div className='container'>
                    CONTETNS
                </div>
            </Box>
            <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}
            >
                <GridItem colSpan={1}>
                    <FilterComponent/>
                </GridItem>
                <GridItem colSpan={4}>
                    <div>Hello</div>
                    <div>
                        <ViewingProperties getViewFilter={getViewFilter} setViewFilter={setViewFilter}/>
                    </div>
                    {items.products && items.products.loading && <div>Loading...</div>}
                    {items.products && items.products.products &&
                    <div>
                        {items.products.products.map((product, index) =>
                            <div key={product.id}>
                                <ProductItem product={product} type={componentConstants.CATALOG_PRODUCT}/>
                            </div>
                        )}
                    </div>
                    }
                    <Pagination count={getNumOfPages()} onChange={handlePageChange}/>
                </GridItem>
            </Grid>
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
