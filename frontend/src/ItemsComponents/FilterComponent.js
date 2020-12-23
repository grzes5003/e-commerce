import React from "react";
import {connect} from "react-redux";
import {FormGroup, InputGroup} from "@blueprintjs/core";


const FilterComponent = (props) => {
    return (
        <FormGroup
            helperText="Helper text with details..."
            label="Label A"
            labelFor="text-input"
            labelInfo="(required)"
        >
            <InputGroup id="text-input" placeholder="Placeholder text" />
        </FormGroup>
    )
}

function mapStateToProps(state) {
    const {items} = state;
    return {
        items
    };
}

const connectedFilterComponent = connect(mapStateToProps)(FilterComponent);
export {connectedFilterComponent as FilterComponent};
