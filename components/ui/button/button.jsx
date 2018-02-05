import React, { Component } from "react";
import { unique } from "./../control/control.jsx";
import "./button.scss";
import { findDOMNode } from "react-dom";
/**
 * @desc 按钮
 */
export default class Button extends Component {
    constructor(props) {
        super(props)
        this.filterPropsHandle(props, true)
    }
    filterPropsHandle(props, isConstructor) {
        const node = document.createElement("button")
        let params = {
            className: "e-textbox"
        }
        for (const key in props) {
            const filterKey = /on[A-Z][a-z]*$/.test(key) ? key.toLocaleLowerCase() : key;
            node[filterKey] !== undefined && (params[key] = props[key] instanceof Function ? event => props[key](event) :
                filterKey === "className" ? unique(`e-button ${props[key]}`.split(" ")).join(" ") : props[key]);
        }
        isConstructor? this.state = {
            nodeOwnProperty: params
        }: this.setState({
            nodeOwnProperty: params
        });
    }
    componentWillReceiveProps(nextProps, nextState) {
        nextProps && this.filterPropsHandle(nextProps, false)
    }
    render() {
        return <button {...this.state.nodeOwnProperty}>{this.props.children}</button>
    }
}
Button.defaultProps = {
    className: "e-button"
}

export class ButtonGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: props.activeIndex,
        }
    }
    changeActiveIndex(event) {
        let index = 1;
        for(const item of findDOMNode(this).querySelectorAll(".e-button")) {
            item === event.target && this.setState({
                activeIndex: index
            });
            index ++;
        }
    }
    render() {
        const props = this.props;
        let newChildren = [], index = 1;
        for (const item of props.children) {
            switch (item.type && item.type.name) {
                case "Button":
                    newChildren.push(<Button
                        key={index}
                        {...item.props}
                        className={unique(`${this.state.activeIndex === index ? `active`: ""} ${item.props.className ? item.props.className : ""}`.split(" ")).join(" ")}
                    ></Button>);
                    index ++;
                    break;
                default:
                    break;
            }
        }
        return <div
            className={unique(`e-buttongroup ${props.className}`.split(" ")).join(" ")}
            onClick={(event) => { this.changeActiveIndex(event) }}
        >
            {newChildren}
        </div>
    }
}
/**
 * @param theme 主题
 * @param activeIndex 当前激活按钮
 */
ButtonGroup.defaultProps = {
    className: "e-buttongroup",
    theme: "primary",
    activeIndex: -1
}