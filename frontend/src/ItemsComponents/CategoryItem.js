import React from 'react'
import {Button, Card} from "@blueprintjs/core";
import {Elevation} from "@blueprintjs/core/lib/esnext/common/elevation";
import {Link} from "react-router-dom";
import { Box, Image, WrapItem} from "@chakra-ui/react"
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
        <WrapItem className="navBarLogo" onClick={onCategoryClick} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image objectFit="cover" src="https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png" alt="" />
            <Box p="6">
                <Box d="flex" alignItems="baseline">
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                    >
                        Content uno
                    </Box>
                </Box>

                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                >
                    {name}
                </Box>

                <Box>
                    price
                    <Box as="span" color="gray.600" fontSize="sm">
                        / wk
                    </Box>
                </Box>

                <Box d="flex" mt="2" alignItems="center">
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                         reviews
                    </Box>
                </Box>

            </Box>
        </WrapItem>
    )
}

export {CategoryItem};
