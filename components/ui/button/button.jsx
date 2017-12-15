import React, { Component } from "react"
import "./button.scss"
/**
 * @desc 按钮
 */
export default class Button extends Component {
    constructor(props) {
        super(props)
        this.filterPropsHandle(props)
    }
    filterPropsHandle(props) {
        const node = document.createElement("button")
        let params = {
            className:"e-textbox"
        }
        for (const key in props) {
            const filterKey = /on[A-Z][a-z]*$/.test(key) ? key.toLocaleLowerCase() : key;
            node[filterKey] !== undefined && (params[key] = props[key] instanceof Function ? event => props[key](event) : 
            filterKey === "className" ? `e-button ${props[key]}`: props[key]);
        }
        this.state = {
            nodeOwnProperty: params
        };
    }
    render() {
        return <button {...this.state.nodeOwnProperty}>{this.props.children}</button>
    }
}
Button.defaultProps = {
    className: "e-button e-button-default"
}