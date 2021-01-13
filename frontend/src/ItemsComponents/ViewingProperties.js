import React from "react";
import {connect} from "react-redux";
import {itemConstants} from "../_constants";
import {Flex, Spacer, Box, Menu, MenuButton, MenuList, Button, Divider, MenuItem} from "@chakra-ui/react"
import {FiChevronDown} from "react-icons/fi";
import {AiOutlineSortAscending, AiOutlineSortDescending} from "react-icons/ai";
import {HiSortDescending, HiSortAscending} from "react-icons/hi";

const ViewingProperties = (props) => {

    const {getViewFilter, setViewFilter} = props;
    // const [getOrder, setOrder] = React.useState(getViewFilter.order);

    const handleOrderSelect = value => e => {
        e.preventDefault();
        setViewFilter({...getViewFilter, order: value});
    }

    const handleLimitSelect = value => e => {
        e.preventDefault();
        setViewFilter({...getViewFilter, limit: value});
    }

    const returnOrderIcon = () => {
        if (getViewFilter.order === itemConstants.AZ_ASC) {
            return <AiOutlineSortAscending/>;
        } else if (getViewFilter.order === itemConstants.AZ_DESC) {
            return <AiOutlineSortDescending/>;
        } else if (getViewFilter.order === itemConstants.NUM_ASC) {
            return <HiSortAscending/>;
        }
        return <HiSortDescending/>;
    }

    const orderMenu = (
        <Menu>
            <MenuButton as={Button} size="sm" variant="brutal-ghost" rightIcon={returnOrderIcon()}>
                Order
            </MenuButton>
            <MenuList>
                <MenuItem onClick={handleOrderSelect(itemConstants.NUM_DESC)}>
                    <HiSortDescending/> Price Desc
                </MenuItem>
                <MenuItem onClick={handleOrderSelect(itemConstants.NUM_ASC)}>
                    <HiSortAscending/> Price Asc
                </MenuItem>
                <MenuItem onClick={handleOrderSelect(itemConstants.AZ_ASC)}>
                    <AiOutlineSortAscending/> Name A-Z
                </MenuItem>
                <MenuItem onClick={handleOrderSelect(itemConstants.AZ_DESC)}>
                    <AiOutlineSortDescending/> Name Z-A
                </MenuItem>
            </MenuList>
        </Menu>
    );

    const limitMenu = (
        <Menu>
            <MenuButton as={Button} size="sm" variant="brutal-ghost" rightIcon={<FiChevronDown/>}>
                {getViewFilter.limit}
            </MenuButton>
            <MenuList>
                <MenuItem onClick={handleLimitSelect(20)}>20</MenuItem>
                <MenuItem onClick={handleLimitSelect(50)}>50</MenuItem>
                <MenuItem onClick={handleLimitSelect(100)}>100</MenuItem>
            </MenuList>
        </Menu>
    );

    return (
        <Box p={3}>
            <Divider/>
            <Flex p={1}>
                <Box p={1}>
                    {limitMenu}
                </Box>
                <Spacer/>
                <Box p={1}>
                    {orderMenu}
                </Box>
            </Flex>
            <Divider/>
        </Box>
    )
}

function mapStateToProps(state, ownProps) {
    const {getViewFilter, setViewFilter} = ownProps;
    const {items} = state;
    return {
        items,
        getViewFilter,
        setViewFilter
    };
}

const connectedViewingProperties = connect(mapStateToProps)(ViewingProperties);
export {connectedViewingProperties as ViewingProperties};
