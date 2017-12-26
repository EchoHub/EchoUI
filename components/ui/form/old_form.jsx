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
            current: 1
        }
    }

    componentDidMount() {
        this.setState({
            rootNode: findDOMNode(this)
        })
    }

    render() {
        return <form className="e-form">{this.props.children}</form>
    }

    value() {
        return this.reportValidity().result;
    }

    /**
     * @desc 验证表单
     * @param 节点
     * @param 值
     * @return boolean 是否通过验证
     */
    checkValidity(elem, val) {
        if (elem.hasAttribute("required") && (val === "" || val === null)) {
            return {
                result: val,
                report: "验证不通过, 此项为必填项",
                valid: false
            }
        } else if (elem.hasAttribute("pattern")) {
            const pattern = param(elem.getAttribute("pattern"))
            if (pattern && !new RegExp(pattern).test(val)) {
                return {
                    result: val,
                    report: `验证不通过, ${elem.getAttribute("patternMessage") || "输入值非法" }`,
                    valid: false
                }
            }
        }
        return {
            result: val,
            report: "验证通过",
            valid: true
        }
    }

    /**
     * @desc 通知验证报告
     * @return {report: 验证报告, valid 是否通过验证}
     */
    reportValidity() {
        let reports = [], result = {}
        for (const item of this.state.rootNode.elements) {
            switch (item.getAttribute("data-type")) {
                case "select":
                case "radio":
                case "checkbox":
                case "textarea":
                case "input":
                    const val = item.getAttribute("data-value") !== undefined ?item.getAttribute("data-value") : item.value
                    reports.push(this.checkValidity(item, val))
                    result[item.name] = val
                    break
                default:
                    break;
            }
        }
        let passOrUnpass = true
        for (const report of reports) {
            if (!report.valid) {
                passOrUnpass = false;
                break;
            }
        }
        return {
            result: result,
            reports: reports,
            valid: passOrUnpass
        }
    }

    /**
     * @desc 获取所有的输入域
     */
    // getInputs(children, inputs) {
    //     for (const item of (children instanceof Array ? children : [children])) {
    //         if (item.props && item.props.children) {
    //             if (item.props.domType && item.props.domType === "input") {
    //                 inputs.push(item)
    //                 return;
    //             }
    //             inputs.concat(this.getInputs(item.props.children, inputs))
    //         } else {
    //             if (item.props && item.props.domType && (item.props.domType === "input" || item.props.domType === "textarea")) {
    //                 inputs.push(item)
    //                 return;
    //             }
    //         }
    //     }
    //     return inputs
    // }
}

Form.defaultProps = {
    formInputType: ["Select", "TextBox", "TextArea", "CheckBoxGroup", "RadioBoxGroup"]
}