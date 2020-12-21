import React from 'react'

const CategoryItem = props => {
    const {id,name} = props;
    return (
        <div>{id}: {name}</div>
    )
}

export {CategoryItem};
