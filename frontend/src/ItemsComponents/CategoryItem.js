import React from 'react'
import {Box, Image, WrapItem, Flex} from "@chakra-ui/react"
import {history} from "../_helpers";
import {itemConstants} from "../_constants";

const CategoryItem = props => {
    const {category} = props;
    const {id, name} = category;

    const onCategoryClick = e => {
        e.preventDefault();
        history.push(`/category/${id}`);
    }

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
                       src=""
                       alt=""
                       fallbackSrc={itemConstants.FALLBACK_IMG_URL}
                       boxSize="200px"
                />
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
