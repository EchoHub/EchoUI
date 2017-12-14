
import React, { Component } from "react"
import Control from "./../control/control.jsx"
/**
 * @desc 表示一个输入框基类
 */
export default class Input extends Control {
    constructor(props) {
        super(props)
        this.filterPropsHandle(props)
    }
    /**
     * @desc 过滤属性 对创建节点进行属性、事件等绑定
     */
    filterPropsHandle(props) {
        const node = document.createElement(props.domType)
        let params = {}
        for (const key in props) {
            const filterKey = /on[A-Z][a-z]*$/.test(key) ? key.toLocaleLowerCase() : key;
            node[filterKey] !== undefined && (params[key] = props[key] instanceof Function ? event => props[key](event) : 
            filterKey === "className" ? `e-textbox ${props[key]}` : props[key]);
        }
        this.state = {
            nodeOwnProperty: params
        };
    }
    render() {
        let node = null
        switch (this.props.domType.toUpperCase()) {
            case "TEXTAREA":
                node = <textarea {...this.state.nodeOwnProperty} ></textarea>
                break;
            case "input":
            default:
                node = <input {...this.state.nodeOwnProperty} />
                break;
        }
        return node;
    }
}
/**
 * @desc 设置input基类默认类型
 * @param domType 节点类型
 * @param type 输入框的类型
 * @param name 名称
 * @param id id号
 * @param className 类名
 * @param onClick 单击事件
 * @param onChange 改变事件
 * @param onSelect 选中事件
 * @param onFocus 焦点事件
 * @param onBlur 失焦事件
 */
Input.defaultProps = {
    domType: "input",
    type: "",
    name: "",
    onClick: () => { },
    onChange: () => { },
    onSelect: () => { },
    onFocus: () => { },
    onBlur: () => { },
}
