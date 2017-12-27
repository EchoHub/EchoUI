import React, { Component } from "react"
import { findDOMNode } from "react-dom";
import Select from "./../select/select.jsx"
import TextBox from "./../textBox/textBox.jsx"
import TextArea from "./../textArea/textArea.jsx"
import RadioBoxGroup from "./../radioBoxGroup/radioBoxGroup.jsx"
import CheckBoxGroup from "./../checkBoxGroup/checkBoxGroup.jsx"
import { param } from "./../../util/regexp/regexp.ts"
import "./form.scss"
/**
 * @desc 表单,结合FormItem使用
 */
export default class Form extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log(this.refs)
    }
    render() {
        let nodes = [];
        for (const item of (Array.isArray(this.props.children) ? this.props.children : [this.props.children])) {
            const props = formFilterProps(item.props)
            const vNodes = item.props.children || null
            switch ((item.type.name || item.type).toUpperCase()) {
                // formItem
                case "FORMITEM":
                    nodes.push(<FormItem ref={props.name} {...props}>{vNodes}</FormItem>);
                    break;
                default:
                    nodes.push(item);
                    break;
            }
        }
        return <form className="e-form">{nodes}</form>
    }

    value() {
        let result = {}
        for(const key in this.refs) {
            result = Object.assign({}, result, this.refs[key].value())
        }
        return result
    }
}

/**
 * @desc 表单输入项, 结合Form使用
 */
export class FormItem extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() { }
    render() {
        let nodes = [];
        for (const item of (Array.isArray(this.props.children) ? this.props.children : [this.props.children])) {
            const vNodes = item.props.children || null
            this.newProps = Object.assign({}, formFilterProps(this.props), formFilterProps(item.props))
            switch ((item.type.name || item.type).toUpperCase()) {
                case "SELECT":
                    nodes.push(<Select ref="select" {...this.newProps}>{vNodes}</Select>);
                    break;
                case "TEXTBOX":
                    nodes.push(<TextBox ref="textbox" {...this.newProps}></TextBox>);
                    break;
                case "RADIOBOXGROUP":
                    nodes.push(<RadioBoxGroup ref="radioBoxGroup" {...this.newProps}>{vNodes}</RadioBoxGroup>);
                    break;
                case "CHECKBOXGROUP":
                    nodes.push(<CheckBoxGroup ref="radioBoxGroup" {...this.newProps}>{vNodes}</CheckBoxGroup>);
                    break;
                case "TEXTAREA":
                    nodes.push(<TextArea ref="textArea" {...this.newProps}></TextArea>);
                    break;
                default:
                    nodes.push(item);
                    break;
            }
        }
        return <div>{nodes}</div>
    }

    value() {
        if(!this.refs) {
            throw "not form input"
        }
        let result = {}
        for(const key in this.refs) {
            result[this.newProps.name] = this.refs[key].value()
        }
        return result || null
    }
}

/**
 * @desc 过滤props属性，去除children等特殊含义的字段
 * @param  props 
 */
export function formFilterProps(props) {
    let newProps = {}
    for (const key in props) {
        switch (key) {
            case "children":
                break;
            default:
                newProps[key] = props[key]
                break;
        }
    }
    return newProps
}