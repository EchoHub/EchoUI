import React from "react"
import Input from "./../input/input.jsx"
import "./textBox.scss"
/**
 * @desc 表示一个文本输入框
 */
export default class TextBox extends Input {
    constructor(props) {
        super(props)
    }
}
TextBox.defaultProps = {
    nodeType: "input",
    type: "text",
    className: "x-textbox"
}