import React, { Component } from "react"
import Input from "./../input/input.jsx"
import "./textBox.scss"
/**
 * @desc 表示一个文本输入框
 */
export default class TextBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultValue: ""  // 默认值
        }
    }

    get value() {
        const val = this.refs[this.props["name"]].value
        return val
    }
    set value(v) {
        this.refs[this.props["name"]].value = v
    }
    render() {
        return <Input
            ref={this.props["name"]}
            {...this.props}
            inputRef={this.props["name"]} />
    }

    /**
     * @desc 报告错误
     * @param vNode 节点
     * @param errorType 报错类型
     */
    get reportValidity() {
        return this.refs[this.props["name"]].reportValidity
    }
}
TextBox.defaultProps = {
    domType: "input",
    type: "text",
    className: "e-textbox"
}