import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { unique, closest } from "./../control/control.jsx";
import "./transfer.scss";
/**
 * @desc 穿梭框
 */
export default class Transfer extends Component { 
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="e-transfer">
        </div>
    }
}
/**
 * @param className
 */
Transfer.defaultProps = {
    className: "e-transfer"
}