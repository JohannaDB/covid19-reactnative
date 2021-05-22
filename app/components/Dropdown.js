import React, { Component } from "react";
import { Dropdown } from "react-native-material-dropdown";

class DropdownComponent extends Component {
    render() {
        let data = [{
            value: "Alphabetic",
        }, {
            value: "Continent",
        }, {
            value: "Cases",
        }, {
            value: "Deaths"
        }];
        
        return (
            <Dropdown 
            label="test"
            data={data}
            />
        )
    }
}