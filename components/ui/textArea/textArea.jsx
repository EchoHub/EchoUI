import React, { Component } from "react"
import Input from "./../input/input.jsx"
import "./textArea.scss"
/**
 * @desc 表示一个文本域
 */
export default class TextArea extends Component {
    constructor(props) {
        super(props)
    }

    /**
     * @desc 获取节点value
     */
    value() {
        const val = this.refs[this.props["name"]].refs[this.props["name"]].value
        return val
    }

    render() {
        return <Input
            ref={this.props["name"]}
            {...this.props}
            inputRef={this.props["name"]} />
    }
}
TextArea.defaultProps = {
    domType: "textarea",
    className: "e-textbox"
}