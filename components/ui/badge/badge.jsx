import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { unique } from "./../control/control.jsx";
import "./badge.scss";
/**
 * @desc 表示一个徽章
 */
export default class Badge extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const props = this.props;
        return <i className={unique(`e-badge ${props.className}`.split(" ")).join(" ")}>
            <sup
                className={`e-badge_count ${props.count > 9 ? "multiple": ""}`}
                style={
                    props.colorEnum[props.color]
                }
            >
                {
                    props.count > 999 ? "999+" : props.count
                }
            </sup>
            {props.children}
        </i>
    }
}
Badge.defaultProps = {
    className: "e-badge",
    count: 0,
    colorEnum: {
        "blue": {
            background: "#2196f3",
            color: "#fff",
        },
        "red": {
            background: "#f5222d",
            color: "#fff",
        },
        "green": {
            background: "#5FB878",
            color: "#fff",
        },
        "white": {
            background: "#fff",
            color: "#999999",
            boxShadow: "rgb(217, 217, 217) 0px 0px 0px 1px inset"
        }
    }
}