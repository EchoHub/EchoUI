import React, { Component } from "react"
import ComboBox from "./../comboBox/comboBox.jsx"
import "./select.scss"
/**
 * @desc 下拉框
 */
export default class Select extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <ComboBox ref="selectRef" {...this.props}></ComboBox>
    }
    get value() {
        return this.refs.selectRef.value
    }
    get text() {
        return this.refs.selectRef.text
    }
    set value(v) {
        this.refs.selectRef.value = v
    }

    /**
     * @desc 报告错误
     * @param vNode 节点
     * @param errorType 报错类型
     */
    get reportValidity() {
        return this.refs.selectRef.reportValidity
    }
}
Select.defaultProps = {
    dataType: "select",
    domType: "input",
}