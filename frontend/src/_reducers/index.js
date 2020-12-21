import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { items } from './items.reducer';

const rootReducer = combineReducers({
    authentication,
    users,
    alert,
    items
});

export default rootReducer;
