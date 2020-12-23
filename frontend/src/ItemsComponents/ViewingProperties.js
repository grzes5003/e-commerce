import React from "react";
import {connect} from "react-redux";
import {
    Alignment,
    Button,
    Divider,
    FormGroup,
    Menu,
    MenuItem,
    Navbar,
    Popover,
    Position
} from "@blueprintjs/core";
import {FilterComponent} from "./FilterComponent";
import {itemConstants} from "../_constants";


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

    const orderMenu = (
        <Menu>
            <MenuItem onClick={handleOrderSelect(itemConstants.NUM_DESC)} icon={itemConstants.NUM_DESC}
                      text='Price Desc'/>
            <MenuItem onClick={handleOrderSelect(itemConstants.NUM_ASC)} icon={itemConstants.NUM_ASC} text='Price Asc'/>
            <MenuItem onClick={handleOrderSelect(itemConstants.AZ_ASC)} icon={itemConstants.AZ_ASC} text='Name A-Z'/>
            <MenuItem onClick={handleOrderSelect(itemConstants.AZ_DESC)} icon={itemConstants.AZ_DESC} text='Name Z-A'/>
        </Menu>
    );

    const limitMenu = (
        <Menu>
            <MenuItem onClick={handleLimitSelect(20)} text='20'/>
            <MenuItem onClick={handleLimitSelect(50)} text='50'/>
            <MenuItem onClick={handleLimitSelect(100)} text='100'/>
        </Menu>
    );

    return (
        <Navbar>
            <Navbar.Group
                align={Alignment.LEFT}
            >
                <FormGroup
                    label="Limit:"
                    labelFor="text-input"
                    inline='true'
                >
                    <Popover content={limitMenu} position={Position.BOTTOM}>
                        <Button minimal='true' icon='circle' text={getViewFilter.limit}/>
                    </Popover>
                </FormGroup>
            </Navbar.Group>
            <Navbar.Group
                align={Alignment.RIGHT}
            >
                <FormGroup
                    label="Order by:"
                    labelFor="text-input"
                    inline='true'
                >
                    <Popover content={orderMenu} position={Position.BOTTOM}>
                        <Button minimal='true' icon={getViewFilter.order}/>
                    </Popover>
                </FormGroup>
            </Navbar.Group>
            <Divider/>
        </Navbar>
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
