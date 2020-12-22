import React from 'react'
import {Button, Card} from "@blueprintjs/core";
import {Elevation} from "@blueprintjs/core/lib/esnext/common/elevation";
import {Link} from "react-router-dom";

const CategoryItem = props => {
    const {category} = props;
    const {id, name} = category;
    return (
        <Card interactive={true} elevation={Elevation.TWO}>
            <h5><Link to={`/category/${id}`}>{name}</Link></h5>
        </Card>
    )
}

export {CategoryItem};
