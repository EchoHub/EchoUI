import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import "./navMenu.scss";

export default class NavMenu extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="e-navmenu">{this.props.children}</div>
    }
}
export class MenuTitle extends Component {
    render() {
        return <div className="e-menutitle">{this.props.children}</div>
    }
}
/**
 * @desc 子菜单
 */
export class SubMenu extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="e-submenu">{this.props.children}</div>
    }
}
/**
 * @desc 菜单项群组
 */
export class MenuItemGroup extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="e-menuitemgroup">{this.props.children}</div>
    }
}
/**
 * @desc 菜单项
 */
export class MenuItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="e-menuitem">{this.props.children}</div>
    }
}