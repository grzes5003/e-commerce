import React from "react";
import {connect} from "react-redux";
import {Box, Input} from "@chakra-ui/react"


const FilterComponent = (props) => {
    return (
        <Box>
            <Input/>
        </Box>
    )
}

function mapStateToProps(state) {
    const {items} = state;
    return {
        items
    };
}

const connectedFilterComponent = connect(mapStateToProps)(FilterComponent);
export {connectedFilterComponent as FilterComponent};
