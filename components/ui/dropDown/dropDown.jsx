import React, { Component } from "react";
import { render, findDOMNode } from "react-dom";
import "./dropDown.scss";
import Button from "./../button/button.jsx";
import { closest } from "./../control/control.jsx";
/**
 * @desc 下拉菜单
 */
export default class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            selectedKey: "",
            selectedName: ""
        };
        // 事件触发频率控制
        this.eventActive = true
    }
    /**
     * @desc 设置选中项
     */
    setSelectedItemHandler(key, name) {
        this.setState({
            selectedKey: key,
            selectedName: name
        });
    }
    /**
     * @desc 展开/收起菜单
     */
    toggleMenu(value) {
        // this.setState({
        //     show: value
        // });
        const _self_ul = findDOMNode(this).querySelector(".e-dropdown-list");
        _self_ul.classList.add("collapsing");
        if (value) {
            setTimeout(() => {
                _self_ul.classList.add("active");
                _self_ul.className = _self_ul.className.replace(/\s+collapsing/, "");
            }, 10);
        } else {
            _self_ul.className = _self_ul.className.replace(/\s+active/, "");
            setTimeout(() => {
                _self_ul.className = _self_ul.className.replace(/\s+collapsing/, "");
            }, 300);
        }
    }
    render() {
        const props = this.props;
        const menu = this.props.menu;
        let newArr = []
        let i = 1;
        if (menu.length) {
            for (const _ of menu) {
                if (_.item) {
                    // 一级下拉 优先
                    const item = _.item;
                    newArr.push(<DropDownItem
                        key={i}
                        value={item.key}
                        name={item.name}
                        disabled={item.disabled || false}
                        setSelectedItemHandler={this.setSelectedItemHandler.bind(this)}
                    ></DropDownItem>)
                } else if (_.subMenu) {
                    const subMenu = _.subMenu
                    // 二级下拉
                    newArr.push(<SubMenu
                        key={i}
                        name={subMenu.name}
                        menu={subMenu.menu}
                        setSelectedItemHandler={this.setSelectedItemHandler.bind(this)}
                    ></SubMenu>)
                }
                i++;
            }
        }
        return <div
            className={`e-dropdown ${this.props.className.replace(/e-dropdown\s*$/, "") || ""}`}
            onMouseEnter={() => { this.props.type === "hover" && this.toggleMenu(true) }}
            onMouseLeave={() => { this.toggleMenu(false) }}
            onClick={() => { this.props.type === "click" && this.toggleMenu(true) }}
        >
            <a
                className="e-dropdown-link"
                href="javascript:;"
            >
                {props.children}
                <i className="icon iconfont icon-arrow e-dropdown-arrow"></i>
            </a>
            {/* <ul className={`e-dropdown-list ${this.state.show ? " active" : ""}`}> */}
            <ul className="e-dropdown-list">
                {/* {
                    this.state.show ? newArr : null
                } */}
                {newArr}
            </ul>
        </div>
    }
}
/**
 * @param menu 下拉菜单项
 *          -- item
 *             -- key
 *             -- name
 *             -- disabled
 *          --subMenu
 *             -- name
 *             -- menu
 *             -- disabled
 * @param type 触发下拉类型 hover／click
 */
DropDown.defaultProps = {
    className: "e-dropdown",
    menu: [],
    type: "hover"
}

export class DropDownItem extends Component {
    constructor(props) {
        super(props)
    }
    selectHandler() {
        this.props.setSelectedItemHandler(this.props.value, this.props.name)
    }
    render() {
        return <li
            className={`e-dropdown-item${this.props.disabled ? " disabled" : ""}`}
            onClick={() => { !this.props.disabled && this.selectHandler() }}
        ><span className="e-dropdown-item-title">{this.props.name}</span></li>
    }
}

export class SubMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
        }
    }
    /**
     * 
     * @param {*} type 0 移出 1 进入
     * @param {*} value 
     */
    toggleMenu(type, value) {
        !this.props.disabled && this.setState({
            show: value
        });
    }
    componentDidUpdate() {
        const _self = findDOMNode(this);
        const dropDownNode = closest(_self, ".e-dropdown-item");
        const ulNode = _self.querySelector(".e-dropdown-submenu-ul");
        if (ulNode) {
            // _self.querySelector(".e-dropdown-submenu-ul").style.left = `${dropDownNode.offsetWidth}px`;
            _self.querySelector(".e-dropdown-submenu-ul-container").style.left = `${dropDownNode.offsetWidth}px`;
            // _self.querySelector(".e-dropdown-submenu-ul").style.marginLeft = "10px";
        }
    }
    setSelectedItemHandler(key, name) {
        this.props.setSelectedItemHandler(key, name);
    }
    render() {
        const props = this.props;
        return <li
            className={`e-dropdown-item e-dropdown-submenu${this.props.disabled ? " disabled" : ""}`}
            onMouseEnter={() => { this.toggleMenu(1, true) }}
            onMouseLeave={() => { this.toggleMenu(0, false) }}
        >
            <span className="e-dropdown-submenu-title">
                {props.name}
                <i className="e-dropdown-submenu-title-icon icon iconfont icon-arrow-right"></i>
            </span>
            <div className="e-dropdown-submenu-ul-container">
                <ul className="e-dropdown-submenu-ul e-ml-10" style={{ display: `${this.state.show ? "inherit" : "none"}` }}>
                    {
                        props.menu.length ? props.menu.map((d, i) => {
                            if (d.subMenu) {
                                const subMenu = d.subMenu
                                // 二级下拉
                                return <SubMenu
                                    key={i}
                                    name={subMenu.name}
                                    menu={subMenu.menu}
                                    disabled={subMenu.disabled}
                                    setSelectedItemHandler={this.setSelectedItemHandler.bind(this)}
                                ></SubMenu>;
                            } else {
                                const item = d;
                                return <DropDownItem
                                    key={i}
                                    value={item.key}
                                    name={item.name}
                                    disabled={item.disabled || false}
                                    setSelectedItemHandler={this.setSelectedItemHandler.bind(this)}
                                ></DropDownItem>;
                            }
                            // return <DropDownItem
                            //     key={i}
                            //     value={d.key}
                            //     name={d.name}
                            //     disabled={d.disabled || false}
                            //     setSelectedItemHandler={this.props.setSelectedItemHandler}
                            // ></DropDownItem>
                        }
                        ) : null
                    }
                </ul>
            </div>
            {/* <ul className="e-dropdown-submenu-ul" style={{ display: `${this.state.show ? "inherit" : "none"}` }}>
                {
                    props.menu.length ? props.menu.map((d, i) => {
                        return <DropDownItem
                            key={i}
                            value={d.key}
                            name={d.name}
                            disabled={d.disabled || false}
                            setSelectedItemHandler={this.props.setSelectedItemHandler}
                        ></DropDownItem>
                    }
                    ) : null
                }
            </ul> */}
        </li>
    }
}
SubMenu.defaultProps = {
    menu: [],
    parent: null
}