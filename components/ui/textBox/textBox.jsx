import React, { Component } from "react"
import Input from "./../input/input.jsx"
import "./textBox.scss"
/**
 * @desc 表示一个文本输入框
 */
export default class TextBox extends Component {
    constructor(props) {
        super(props)
    }

    value() {
        const val = this.refs[this.props["name"]].refs[this.props["name"]].value
        return val
    }

    render() {
        return <Input ref={this.props["name"]} {...this.props} inputRef={this.props["name"]}/>
    }
}
TextBox.defaultProps = {
    domType: "input",
    type: "text",
    className: "e-textbox"
}