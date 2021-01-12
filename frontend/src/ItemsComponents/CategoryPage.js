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
import {Grid, Box, GridItem, Heading, Center, Text} from "@chakra-ui/react"

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
        <div>
            <Box bgGradient="linear(to-r, teal.500,green.500)" h={250}>
                <Box className='container' h="100%" pt={100}>
                    <Heading size="2xl"
                             // bgGradient="linear(to-r, red.500, yellow.500)"
                             textShadow="5px 5px teal"
                    >
                        CONTENT
                    </Heading>
                </Box>
            </Box>
            <Box h={50}/>
            <div className="container">
                <Grid
                    templateRows="repeat(1, 1fr)"
                    templateColumns={{base: "repeat(1, 1fr)", md: "repeat(5, 1fr)"}}
                    gap={4}
                    autoFlow={1}
                >
                    <GridItem colSpan={1}>
                        <FilterComponent/>
                    </GridItem>
                    <GridItem colSpan={4}>
                        {items.products && items.products.numOfResults && <Text>Found {items.products.numOfResults} results</Text>}
                        <div>
                            <ViewingProperties getViewFilter={getViewFilter} setViewFilter={setViewFilter}/>
                        </div>
                        {items.products && items.products.loading && <div>Loading...</div>}
                        {items.products && items.products.products &&
                        <Box p={2}>
                            {items.products.products.map((product, index) =>
                                <Box key={product.id} p={1}>
                                    <ProductItem product={product} type={componentConstants.CATALOG_PRODUCT}/>
                                </Box>
                            )}
                        </Box>
                        }
                        <Pagination count={getNumOfPages()} onChange={handlePageChange}/>
                    </GridItem>
                </Grid>
            </div>
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
