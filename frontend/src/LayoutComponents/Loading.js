import React from "react";
import {Box, Center, Spinner} from "@chakra-ui/react"

export const Loading = props => {
    return (
            <Box h="100%">
                <Center p={10}>
                    <Spinner
                        thickness="4px"
                        size="xl"
                        color="teal.500"
                        p={10}
                    />
                </Center>
            </Box>
    )
};
