import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {userActions, itemActions} from "../_actions";
import {CategoryItem} from "../ItemsComponents";

import {Wrap, SimpleGrid, Center, Heading, Box, Container} from "@chakra-ui/react"
import {Loading} from "../LayoutComponents";

const HomePage = (props) => {
    useEffect(() => {
        props.dispatch(itemActions.getAllCategories());
    }, []);

    const handleLogoutAction = () => {
        userActions.logout();
        window.location.reload(false);
    };

    const {user, cart, items, loggedIn} = props;
    return (
        <div className='window'>
            <div className='banner'/>
            <div className='container'>
                <SimpleGrid columns={1} spacing={10} h={300}>
                    <Box h={25}/>
                    <Box>
                        <Center>
                            {user ?
                                <Heading textShadow="2px 2px teal">
                                    Hi {user.firstName}!
                                </Heading>
                                :
                                <Heading textShadow="2px 2px teal">
                                    SHOP
                                </Heading>
                            }
                        </Center>
                    </Box>
                    <Box>
                        <Center>
                            <Container>
                                There are many benefits to a joint design and development system. Not only
                                does it bring benefits to the design team, but it also brings benefits to
                                engineering teams. It makes sure that our experiences have a consistent look
                                and feel, not just in our design specs, but in production
                            </Container>
                        </Center>
                    </Box>
                    <Box h={50}/>
                </SimpleGrid>
                <Wrap justify="center" spacing="40px">
                    {items.loading && <Loading/>}
                    {items.error && <span className="text-danger">ERROR: {items.error}</span>}
                    {items.categories &&
                    items.categories.map((category, index) =>
                        <CategoryItem category={category} key={category.id}/>
                    )
                    }
                </Wrap>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const {items, cart, authentication, history} = state;
    const {user, loggedIn} = authentication;
    return {
        loggedIn,
        user,
        items,
        cart,
        history
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export {connectedHomePage as HomePage};
