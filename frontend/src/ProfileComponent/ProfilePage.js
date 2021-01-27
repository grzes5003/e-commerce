import React from "react";
import {connect} from "react-redux";
import {Box, Button, Center} from "@chakra-ui/react";
import {history} from "../_helpers";

const ProfilePage = props => {

    const onOrdersClick = (e) => {
        e.preventDefault();
        history.push('/p/orders');
    }

    return (
        <Box pt={10}>
            <Center>
                <Button onClick={onOrdersClick}>Show orders</Button>
            </Center>
        </Box>
    )
}


function mapStateToProps(state) {
    const {items} = state;
    return {
        items
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export {connectedProfilePage as ProfilePage};
