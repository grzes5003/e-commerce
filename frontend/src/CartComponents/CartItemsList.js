import {connect} from "react-redux";

const CartItemsList = props => {

}

function mapStateToProps(state) {
    console.log("STATE:::: ", state);
    const {items, cart, authentication} = state;
    const {user, loggedIn} = authentication;
    return {
        loggedIn,
        user,
        items,
        cart
    };
}

const connectedCartItemsList = connect(mapStateToProps)(CartItemsList);
export {connectedCartItemsList as CartItemsList};
