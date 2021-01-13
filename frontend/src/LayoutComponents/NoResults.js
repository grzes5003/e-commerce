import React from "react";
import {Box, Center, Text} from "@chakra-ui/react";
import {FiSearch} from "react-icons/fi"

export const NoResults = props => {
    const {message, size} = props;
    return (
        <Center w="100%">
            <Box w={{base: "100%", md: "200px"}}>
                <Center>
                    <FiSearch size={size ? size : 200}></FiSearch>
                </Center>
                <Center>
                    {message && <Text p={5}>{message}</Text>}
                </Center>
            </Box>
        </Center>
    )
};
