import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { closest } from "./../control/control.jsx";
import "./navMenu.scss";

export default class NavMenu extends Component {
    constructor(props) {
        super(props)
    }
    componentWillReceiveProps(nextProps, nextState) {
        // 主题切换
        // if (nextProps.theme !== this.props.theme) {
        //     findDOMNode(this).className = `e-navmenu${nextProps.className ? " " + nextProps.className : ""} ${nextProps.theme || ""}`;
        // }
        // 展开收起控制
        if (nextProps.inlineCollapsed !== this.props.inlineCollapsed) {
            this.setMenuCollapsed(nextProps.inlineCollapsed);
        }
    }
    componentDidMount() {
        this.setMenuCollapsed(this.props.inlineCollapsed)
    }
    // 设置 菜单展开收起
    setMenuCollapsed(v) {
        const _self = findDOMNode(this);
        if (v) {
            _self.classList.add("e-navmenu-collapsed")
        } else {
            _self.className = _self.className.replace(/e-navmenu-collapsed/, "");
        }
    }
    render() {
        const children = this.props.children;
        let newArr = [];
        for (const key in children) {
            const item = children[key];
            newArr.push(
                <MenuItem
                    key={key}
                    {...item.props}
                    parent={this}
                    inlineCollapsed={this.props.inlineCollapsed}
                ></MenuItem>
            );
        }
        return <div
            className={`e-navmenu${this.props.className ? " " + this.props.className : ""} ${this.props.theme || ""}`}
        >{newArr}</div>
    }
}
NavMenu.defaultProps = {
    theme: "default",
    inlineCollapsed: false,
    model: "vertical" // 预留 弹出模式（popup）、垂直模式(vertical)、水平模式(horizontal)
}
/**
 * @desc 菜单项
 */
export class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemStatus: props.show || false
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
        for (const key in (typeof children === "object" ? children : [children])) {
            // 如果为String类型 则为文本内容
            const item = typeof children[key] === "string" ? children: children[key];
            newArr.push((() => {
                switch (item.type && item.type.name) {
                    case "MenuItemTitle":
                        return <MenuItemTitle
                            key={key}
                            {...item.props}
                            icon = {this.props.icon}
                            inlineCollapsed = {this.props.inlineCollapsed}
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
                        return <MenuItemTitle
                            key={key}
                            {...item.props}
                            icon = {this.props.icon}
                            inlineCollapsed = {this.props.inlineCollapsed}
                            disabled
                        >{item}</MenuItemTitle>;
                }
            })())
        }
        return <div className="e-menuitem">
            {newArr}</div>
    }
}

/**
 * @desc 菜单标题
 */
export class MenuItemTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasSelected: false
        }
    }
    goHandler() {
        // true 表示为菜单栏 false说明为导航
        if(this.props.disabled) {
            const _self = findDOMNode(this);
            const containerNode = closest(_self, ".e-navmenu");
            for(const item of containerNode.querySelectorAll(".selected")) {
                item.className = item.className.replace(/selected/, "")
            }
            _self.classList.add("selected");
            this.setState({
                hasSelected: true
            });
        }else {
            this.props.parent.toggleMenuItemList(!this.props.itemStatus)
        }

    }
    render() {
        return <div className={`e-menuitem-title${this.props.itemStatus ? " active" : ""}${this.state.hasSelected ? " selected": ""}`}
            onClick={() => { this.goHandler() }}>
            {this.props.icon ? <span className={`e-mr-4 icon iconfont ${this.props.icon}`}></span> :
                this.props.inlineCollapsed ?
                    <span className={`e-mr-4 icon iconfont icon-star`}></span> : null}
            <span className="e-menuitem-content">{this.props.children}</span>
            {!this.props.disabled ? <span className="icon iconfont e-menuitem-title-flag">&#xe695;</span> : null}
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
        this.state = {
            _selfClass: "",
            timer: ""
        }
    }
    componentDidMount() {
        this.setState({
            _selfClass: this.props.status ? "e-navmenu-list-collapsable" : ""
        });
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.status !== this.props.status) {
            const _self = findDOMNode(this);
            this.toggleCollapsed(nextProps.status, _self)
        }
    }
    componentDidMount() {
        const _self = findDOMNode(this);
        const props = this.props;
        this.toggleCollapsed(props.status, _self)
    }
    toggleCollapsed(status, _self) {
        if (status) {
            _self.classList.add("e-navmenu-list-collapsable");
            const realHeight = _self.offsetHeight;
            _self.style.height = 0;
            setTimeout(() => {
                _self.style.height = realHeight + "px";
                setTimeout(() => {
                    _self.style.height = null;
                }, 250);
            }, 30);
        } else {
            _self.style.height = _self.offsetHeight + "px";
            setTimeout(() => {
                _self.style.height = 0;
                setTimeout(() => {
                    _self.className = "e-menuitem-list";
                    _self.style.height = null;
                }, 250);
            }, 30);
        }
    }
    render() {
        return <div className={`e-menuitem-list${" " + this.state._selfClass || ""}`}>{this.props.children}</div>
    }
}
/**
 * @desc 二级菜单
 */
export class SubMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemStatus: props.show || false
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
                            parent={this}
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