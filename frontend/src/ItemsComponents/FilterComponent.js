import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Box, Input, CheckboxGroup, VStack, Checkbox, Button, Text, FormControl, FormLabel} from "@chakra-ui/react"
import {itemActions} from "../_actions";


const FilterComponent = props => {
    const {items} = props;

    const [checkedItems, setCheckedItems] = React.useState([])

    useEffect(() => {
        props.dispatch(itemActions.getBrands())
    }, []);

    const handleCheck = e => {
        const {value, isChecked} = e.target;
        if(checkedItems.includes(value)) {
            setCheckedItems(checkedItems.filter((x) => value !== x));
        } else {
            setCheckedItems([...checkedItems, value]);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

    };

    return (
        <Box>
            <Input/>
            {items.brands && items.brands.length > 0 &&
            <FormControl>
                <FormLabel as="legend">Filter Brands</FormLabel>
                <CheckboxGroup colorScheme="green" alignItems="baseline" pd={3}>
                    {items.brands.map((brand, index) =>
                        <Checkbox
                            p={1}
                            isChecked={checkedItems.includes(brand.id)}
                            value={brand.id.toString()}
                            onChange={handleCheck}
                            key={brand.id}
                        >
                            {brand.name}
                        </Checkbox>
                    )
                    }
                </CheckboxGroup>
            </FormControl>
            }
            <Button onClick={handleSubmit} p={2} variant="brutal">Click</Button>
        </Box>
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
