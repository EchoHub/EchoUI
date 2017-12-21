import React, { Component } from "react"
import { findDOMNode } from "react-dom";
import Select from "./../select/select.jsx"
import TextBox from "./../textBox/textBox.jsx"
import TextArea from "./../textArea/textArea.jsx"
import RadioBoxGroup from "./../radioBoxGroup/radioBoxGroup.jsx"
import CheckBoxGroup from "./../checkBoxGroup/checkBoxGroup.jsx"
import "./form.scss"
/**
 * @desc 表单
 */
export default class Form extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return <form className="e-form">{this.props.children}</form>
    }

    value() {
        const inputs = this.getInputs(this.props.children, [])
        const rootNode = findDOMNode(this)
        let result = {}
        for (const item of rootNode.elements) {
            switch (item.getAttribute("data-type")) {
                case "select":
                case "radio":
                case "checkbox":
                    result[item.name] = item.getAttribute("data-value")
                    break;
                case "textarea":
                case "input":
                    result[item.name] = item.value
                    break;
                default:
                    break;
            }
        }
        return result;
    }

    /**
     * @desc 获取所有的输入域
     */
    getInputs(children, inputs) {
        for (const item of (children instanceof Array ? children : [children])) {
            if (item.props && item.props.children) {
                if (item.props.domType && item.props.domType === "input") {
                    inputs.push(item)
                    return;
                }
                inputs.concat(this.getInputs(item.props.children, inputs))
            } else {
                if (item.props && item.props.domType && (item.props.domType === "input" || item.props.domType === "textarea")) {
                    inputs.push(item)
                    return;
                }
            }
        }
        return inputs
    }
}

Form.defaultProps = {
    formInputType: ["Select", "TextBox", "TextArea", "CheckBoxGroup", "RadioBoxGroup"]
}