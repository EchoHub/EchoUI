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
 * @desc 表单
 */
export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 1,
            inputs: [],
            children: this.props.children
        }
    }

    componentDidMount() {
    }

    render() {
        this.filterInputs(this.state.children)
        return <form className="e-form">{this.state.children}</form>
    }

    value() {
        return this.reportValidity().result;
    }

    /**
     * @desc 设置form表单子集
     * @param 子输入框
     * @param 所属form组件
     */
    setInputs(child, formOwner) {
        console.log(formOwner)
        let inputs = this.state.inputs
        inputs.push(child)
        this.setState({
            inputs: inputs
        })
        // console.log(this.state.inputs)
    }

    /**
     * @desc 关联输入项和form的关联
     */
    filterInputs(children) {
        debugger
        const items = children instanceof Array ? children : [children];
        for (const key in items) {
            if (items[key].props && items[key].props.children) {
                if (items[key].props.domType && items[key].props.domType === "input") {
                    items[key].__proto__["setInputs"] = this.setInputs.bind(this)
                    items[key].__proto__["formOwner"] = this
                    return;
                }
                this.filterInputs(items[key].props.children)
            } else {
                if (items[key].props && items[key].props.domType && (items[key].props.domType === "input" || items[key].props.domType === "textarea")) {
                    items[key].__proto__["setInputs"] = this.setInputs.bind(this)
                    items[key].__proto__["formOwner"] = this
                    return;
                }
            }
        }
    }
}

Form.defaultProps = {
    formInputType: ["Select", "TextBox", "TextArea", "CheckBoxGroup", "RadioBoxGroup"]
}