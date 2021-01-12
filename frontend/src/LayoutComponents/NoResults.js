import React from "react";
import {Box} from "@chakra-ui/react";
import {FiSearch} from "react-icons/fi"

export const NoResults = props => {
    return (
        <Box w={{base: "100%", md: "200px"}}>
            <FiSearch size={{base: 50, md:100}}></FiSearch>
        </Box>
    )
};
