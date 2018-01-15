import React, { Component } from "react"
import Control from "./../control/control.jsx"
import "./input.scss"
/**
 * @desc 表示一个输入框基类
 */
export default class Input extends Control {
    constructor(props) {
        super(props)
        this.state = {
            nodeOwnProperty: this.filterPropsHandle(props)
        }
        /**
        * @desc 节点状态枚举 0:默认 1: 成功 2: 错误
        */
        this.nodeStateClassMap = {
            0: "",
            1: "e-textbox-success",
            2: "e-textbox-error"
        }
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            let _className
            if (nextProps.nodeState !== undefined) {
                _className = nextProps["className"] ?
                    `${nextProps["className"]} ${this.nodeStateClassMap[nextProps.nodeState]}` :
                    " " + this.nodeStateClassMap[nextProps.nodeState]
            }
            this.setState({
                nodeOwnProperty: Object.assign({}, this.filterPropsHandle(nextProps), _className ? { className: _className } : {})
            });
        }
    }
    /**
     * @desc 过滤属性 对创建节点进行属性、事件等绑定
     */
    filterPropsHandle(props) {
        const node = document.createElement(props.domType)
        let params = {
            className: "e-textbox"
        }
        for (const key in props) {
            const filterKey = /on[A-Z][a-z]*$/.test(key) ? key.toLocaleLowerCase() : key;
            // node[filterKey] !== undefined && (params[key] = props[key] instanceof Function ?
            //     event => props[key](event) :
            //     filterKey === "className" ?
            //         `e-textbox ${props[key].replace(/e-textbox/g, "")}` : props[key]);

            // 过滤特殊字段
            if (node[filterKey] !== undefined) {
                switch (filterKey) {
                    case "pattern":
                    case "patternMessage":
                        break;
                    case "className":
                        params[key] = `e-textbox ${props[key].replace(/e-textbox/g, "")}`;
                        break;
                    default:
                        params[key] = props[key] instanceof Function ? event => props[key](event) : props[key];
                        break;
                }
            }

            // 如果有eRef 则进行绑定
            key === "inputRef" && (params["ref"] = props["inputRef"])
        }
        return params
    }
    render() {
        let node = null
        switch (this.props.domType.toUpperCase()) {
            case "TEXTAREA":
                node = <textarea
                    {...this.state.nodeOwnProperty}
                    required={this.props.hasOwnProperty("required") ? true : false}
                ></textarea>
                break;
            case "INPUT":
            default:
                node = <input
                    {...this.state.nodeOwnProperty}
                    required={this.props.hasOwnProperty("required") ? true : false}
                />
                break;
        }
        return node;
    }

    get value() {
        return this.refs[this.props["name"]].value
    }

    set value(v) {
        this.refs[this.props["name"]].value = v;
    }
    /**
     * @desc 输入验证
     */
    errorInfo
    checkValidity() {
        let valid = true, hasSetValid = false; // hasSetValid是否进行过校验
        const value = this.refs[this.props["name"]].value
        for (const key in this.props) {
            switch (key) {
                case "required": // 必填校验
                    valid = value !== "" ? hasSetValid ? valid : true : false;
                    ((!this.errorType && !valid) || (hasSetValid && value === "")) && (this.errorType = 1);
                    break;
                case "pattern": // 正则校验
                    const regParts = this.props.pattern.toString().match("^/(.*?)/([gimy]*$)")
                    valid = new RegExp(regParts[1], regParts[2]).test(value) ? true : false;
                    hasSetValid = true
                    value !== "" && !valid && (this.errorType = 2);
                    break;
                default:
                    break;
            }
        }
        return valid
    }

    /**
     * @desc 报告错误
     * @param vNode 节点
     * @param errorType 报错类型
     */
    get reportValidity() {
        return {
            vNode: this,
            report: () => {
                let errorInfo
                switch (this.errorType) {
                    case 1:
                        // 必填报错;
                        errorInfo = "该项为必填项";
                        break;
                    case 2:
                        // 正则报错
                        errorInfo = this.props.patternMessage;
                        break;
                    default:
                        errorInfo = "无效输入值";
                        break;
                }
                return {
                    errorInfo: errorInfo
                }
            },
            valid: this.checkValidity()
        }
    }
}
/**
 * @desc 设置input基类默认类型
 * @param inputRef 指代react中ref功能，用于为Input绑定ref值
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
