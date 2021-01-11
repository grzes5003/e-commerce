import React from 'react'
import {Button, Card} from "@blueprintjs/core";
import {Elevation} from "@blueprintjs/core/lib/esnext/common/elevation";
import {Link} from "react-router-dom";
import {Box, Image, WrapItem, Flex} from "@chakra-ui/react"
import {history} from "../_helpers";

const CategoryItem = props => {
    const {category} = props;
    const {id, name} = category;

    const onCategoryClick = e => {
        e.preventDefault();
        history.push(`/category/${id}`);
    }

    // return (
    //     <Card interactive={true} elevation={Elevation.TWO}>
    //         <h5><Link to={`/category/${id}`}>{name}</Link></h5>
    //     </Card>
    // )

    return (
        <WrapItem className="navBarLogo" onClick={onCategoryClick} boxShadow="6px 6px teal" borderWidth="1px"
                  borderColor="teal" borderRadius="sm" overflow="hidden"
                  _hover={{
                      // bgGradient: "linear(to-r, red.500, yellow.500)",
                      transform: "translate(-5px,-5px)",
                      boxShadow: "11px 11px teal"
                  }}
        >
            <Flex>
                <Image objectFit="cover"
                       src="https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"
                       alt=""/>
                <Box p={4}>
                    <Box d="flex" alignItems="baseline">
                        <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                        >
                            CATEGORY
                        </Box>
                    </Box>

                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h3"
                        lineHeight="tight"
                        isTruncated
                        textShadow="1px 1px teal"
                    >
                        {name}
                    </Box>

                </Box>
            </Flex>
        </WrapItem>
    )
}

export {CategoryItem};
