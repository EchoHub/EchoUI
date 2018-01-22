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
/**
 * @desc 菜单项
 */
export class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemStatus: false
        }
    }
    toggleMenuItemList(status) {
        this.setState({
            itemStatus: status
        });
    }
    render() {
        const children = this.props.children;
        let newArr = [];
        for (const key in children) {
            const item = children[key];
            newArr.push((() => {
                switch (item.type && item.type.name) {
                    case "MenuItemTitle":
                        return <MenuItemTitle
                            key={key}
                            {...item.props}
                            parent={this}
                            itemStatus={this.state.itemStatus}
                        ></MenuItemTitle>;
                    case "MenuItemList":
                        return <MenuItemList
                            key={key}
                            {...item.props}
                            status={this.state.itemStatus}
                        ></MenuItemList>;
                    default:
                        return item;
                }
            })())
        }
        return <div className="e-menuitem">{newArr}</div>
    }
}

/**
 * @desc 菜单标题
 */
export class MenuItemTitle extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className={`e-menuitem-title${this.props.itemStatus ? " active" : ""}`}
            onClick={() => { this.props.parent.toggleMenuItemList(!this.props.itemStatus) }}>
            {this.props.children}
            <span className="icon iconfont e-menuitem-title-flag">&#xe695;</span>
        </div>
    }
}
/**
 * @desc 分栏标题
 */
export class MenuItemFlag extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="e-menuitem-flag">{this.props.children}</div>
    }
}
/**
 * @desc 菜单列表
 */
export class MenuItemList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className={`e-menuitem-list${this.props.status ? " open" : ""}`}>{this.props.children}</div>
    }
}
/**
 * @desc 二级菜单
 */
export class SubMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemStatus: false
        };
    }
    toggleMenuItemList(status) {
        this.setState({
            itemStatus: status
        });
    }
    render() {
        const children = this.props.children;
        let newArr = [];
        for (const key in children) {
            const item = children[key];
            newArr.push((() => {
                switch (item.type && item.type.name) {
                    case "MenuItemTitle":
                        return <MenuItemTitle
                            key={key}
                            {...item.props}
                            parent={this}
                            itemStatus={this.state.itemStatus}
                        ></MenuItemTitle>;
                    case "MenuItemList":
                        return <MenuItemList
                            key={key}
                            {...item.props}
                            status={this.state.itemStatus}
                        ></MenuItemList>;
                    default:
                        return item;
                }
            })())
        }
        return <div className="e-submenu">{newArr}</div>
    }
}