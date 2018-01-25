import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { propsFilter } from "./../control/control.jsx";
import "./breadCrumb.scss";
/**
 * @desc 面包屑
 * @param path
 * @param icon
 * @param separator
 */
export default class BreadCrumb extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const children = this.props.children;
        let newArr = [];
        for (const key in children) {
            const item = children[key];
            newArr.push(
                <BreadCrumbItem
                    key={key}
                    {...item.props}
                    separator={this.props.separator}
                    parent={this}
                ></BreadCrumbItem>
            );
        }
        return <div
            className={`e-breadcrumb ${this.props.className.replace(/e-breadcrumb\s*$/, "") || ""}`}
        >{newArr}</div>
    }
}
BreadCrumb.defaultProps = {
    className: "e-breadcrumb",
    separator: "/"
}
export class BreadCrumbItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="e-breadcrumb-item">
            <i className={`e-breadcrumb-icon icon iconfont ${this.props.icon || ""}`}></i>
            <span className="e-breadcrumb-item-content">
                <a href={this.props.path || "javascript:;"}>{this.props.children}</a>
            </span>
            <span className="e-breadcrumb-item-separator">{this.props.separator}</span>
        </div>
    }
}