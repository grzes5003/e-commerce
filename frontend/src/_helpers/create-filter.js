export function createFilter({cat,offset = 0, limit = 20}={}) {
    console.log('filter creator: ', cat, offset, limit);

    return {
        categories: cat,
        offset: offset,
        limit: limit
    }
}
