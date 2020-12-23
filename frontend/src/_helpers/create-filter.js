import {itemConstants} from "../_constants";

export function createFilter({cat,offset = 0, limit = 20,sort_order= itemConstants.AZ_ASC}={}) {
    console.log('filter creator: ', cat, offset, limit,sort_order);

    let _sort = 'name';
    let order = 'asc';

    switch (sort_order) {
        case itemConstants.AZ_ASC:
            _sort = 'name';
            order = 'asc';
            break;
        case itemConstants.AZ_DESC: {
            _sort = 'name';
            order = 'desc';
            break;
        }
        case itemConstants.NUM_ASC: {
            _sort = 'price';
            order = 'asc';
            break;
        }
        default: {
            _sort = 'price';
            order = 'desc';
        }
    }

    return {
        categories: cat,
        offset: offset,
        limit: limit,
        sort: _sort,
        order: order
    }
}
