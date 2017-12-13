
import React, { Component } from "react"
import Control from "./../control/control.jsx"
/**
 * @desc 表示一个输入框
 */
export default class Input extends Control {
    constructor(props) {
        super(props)
    }
    mapProptoTypeHandle(node, param) {
        for(const key in param) {
            node.prototype[key] = param[key]
        }
        return node
    }
    render() {
        let node
        switch (this.props.nodeType.toLowerCase()) {
            case "input":
                node = this.mapProptoTypeHandle(<input />, this.props)
                break;
        
            default:
                break;
        }
        return node;
    }
}
/**
 * @desc 设置input基类默认类型
 * @param nodeType 节点类型
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
    nodeType: "input",
    type: "",
    name: "",
    onClick: () => { },
    onChange: () => { },
    onSelect: () => { },
    onFocus: () => { },
    onBlur: () => { },
}
