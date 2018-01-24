import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import "./switch.scss";
import { propsFilter } from "./../control/control.jsx";

export default class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: ""
        }
    }
    componentDidMount() {
        this.setState({
            checked: this.props.defaultChecked ? true : false
        });
    }
    render() {
        const newProps = Object.assign({}, this.props,
            {
                className: `e-switch ${this.props.className || ""} ${this.props.sizeEnum[this.props.size] || ""} ${this.state.checked ? "e-switch-checked" : ""} ${this.props.disabled ? "e-switch-disabled" : ""}`
            }
        );
        return <span
            {...propsFilter(newProps) }
            onClick={event => { this.openCloseHandler(event) }}
        >
            {
                this.props.content? <span className={`e-switch-content ${this.state.checked ? "e-switch-content-left" : "e-switch-content-right"}`}>{this.props.content[this.state.checked]}</span> : null
            }
        </span >
    }
    openCloseHandler(event) {
        if (!this.props.disabled) {
            this.setState({
                checked: !this.state.checked
            });
        }
        const timer = setTimeout(() => {
            this.props.onChange && this.props.onChange(event, this);
            clearTimeout(timer);
        }, 10);
    }
    /**
     * @desc 获取开关状态
     */
    get value() {
        return this.state.checked;
    }
}
Switch.defaultProps = {
    className: "",
    size: "normal",
    disabled: false,
    sizeEnum: {
        small: "e-switch-small",
        large: "e-switch-large"
    }
}