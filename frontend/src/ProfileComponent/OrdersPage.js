import React from "react";
import {connect} from "react-redux";
import {Box} from "@chakra-ui/react";


const OrdersPage = props => {
    return (
        <Box>
            Content
        </Box>
    )
}


function mapStateToProps(state) {
    const {items} = state;
    return {
        items
    };
}

const connectedOrdersPage = connect(mapStateToProps)(OrdersPage);
export {connectedOrdersPage as OrdersPage};
