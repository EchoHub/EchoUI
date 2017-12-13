import React from "react"
import Input from "./../input/input.jsx"
import "./textArea.scss"
/**
 * @desc 表示一个文本输入框
 */
export default class TextArea extends Input {
    constructor(props) {
        super(props)
    }
}
TextArea.defaultProps = {
    nodeType: "textarea",
    className: "x-textbox"
}