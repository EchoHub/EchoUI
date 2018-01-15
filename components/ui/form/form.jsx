import React, { Component } from "react"
import { findDOMNode } from "react-dom";
import Select from "./../select/select.jsx"
import TextBox from "./../textBox/textBox.jsx"
import TextArea from "./../textArea/textArea.jsx"
import RadioBoxGroup from "./../radioBoxGroup/radioBoxGroup.jsx"
import CheckBoxGroup from "./../checkBoxGroup/checkBoxGroup.jsx"
import ToolTip from "./../toolTip/toolTip.jsx"
import { param } from "./../../util/regexp/regexp.ts"
import "./form.scss"
/**
 * @desc 表单,结合FormItem使用，Form直属子节点为FormItem 暂不支持在FormItem外包装其他节点
 */
export default class Form extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        nextProps.value && (this.value = nextProps.value)
    }
    render() {
        let nodes = [];
        for (const item of (Array.isArray(this.props.children) ? this.props.children : [this.props.children])) {
            const props = formFilterProps(item.props)
            const vNodes = item.props.children || null
            switch ((item.type.name || item.type).toUpperCase()) {
                // formItem
                case "FORMITEM":
                    nodes.push(<FormItem
                        key={props.name}
                        ref={props.name}
                        {...props}
                    >
                        {vNodes}
                    </FormItem>);
                    break;
                default:
                    nodes.push(item);
                    break;
            }
        }
        return <form className="e-form">{nodes}</form>
    }
    /**
     * @desc 取值
     * @param 传入参数
     */
    get value() {
        let result = {}
        for (const key in this.refs) {
            result = Object.assign({}, result, this.refs[key].value)
        }
        return result
    }
    /**
     * @desc 赋值
     * @param 传入参数
     */
    set value(val) {
        if (!Object.keys(val).length) return;
        for (const key in this.refs) {
            this.refs[key].value = val[this.refs[key].props.name]
        }
    }

    /**
     * @desc 验证报告
     */
    get reportValidity() {
        let reports = [];
        let valid = true;
        for (const key in this.refs) {
            if (valid && !this.refs[key].reportValidity.valid) {
                valid = false;
            }
            reports.push(this.refs[key].reportValidity);
        }
        return {
            reports: reports,
            valid: valid,
            report: () => {
                console.log(reports)
            }
        };
    }
}

/**
 * @desc 表单输入项, 结合Form使用 一般和输入框捆绑使用，FormItem中不存在其他节点，即只有输入框
 */
export class FormItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showToolTip: false,
            nodeState: 0, // 0:默认 1:成功 2:错误
            toolTipContent: ""
        }
    }
    componentDidMount() { }
    render() {
        let nodes = [];
        for (const item of (Array.isArray(this.props.children) ? this.props.children : [this.props.children])) {
            const vNodes = item.props.children || null
            this.newProps = Object.assign({}, formFilterProps(this.props), formFilterProps(item.props))
            switch ((item.type.name || item.type).toUpperCase()) {
                case "SELECT":
                    nodes.push(<Select
                        key={this.props.name}
                        ref="select"
                        {...this.newProps}
                        nodeState={this.state.nodeState}
                    >{vNodes}</Select>);
                    break;
                case "TEXTBOX":
                    nodes.push(<TextBox
                        key={this.props.name}
                        ref="textbox"
                        {...this.newProps}
                        nodeState={this.state.nodeState}
                    ></TextBox>);
                    break;
                case "RADIOBOXGROUP":
                    nodes.push(<RadioBoxGroup
                        key={this.props.name}
                        ref="radioBoxGroup"
                        {...this.newProps}
                        nodeState={this.state.nodeState}
                    >{vNodes}</RadioBoxGroup>);
                    break;
                case "CHECKBOXGROUP":
                    nodes.push(<CheckBoxGroup
                        key={this.props.name}
                        ref="radioBoxGroup"
                        {...this.newProps}
                        nodeState={this.state.nodeState}
                    >{vNodes}</CheckBoxGroup>);
                    break;
                case "TEXTAREA":
                    nodes.push(<TextArea
                        key={this.props.name}
                        ref="textArea"
                        {...this.newProps}
                        nodeState={this.state.nodeState}
                    ></TextArea>);
                    break;
                default:
                    nodes.push(item);
                    break;
            }
        }
        return <div className="e-formitem">{nodes}{
            this.state.showToolTip ? <ToolTip
                parentTarget={this}
                _nodeState={this.state.toolState}
                _children={this.state.toolTipContent}
            ></ToolTip> : ""
        }</div>
    }

    get value() {
        if (!this.refs) {
            throw "not form input"
        }
        let result = {}
        for (const key in this.refs) {
            result[this.newProps.name] = this.refs[key].value
        }
        return result || null
    }

    /**
     * @desc 赋值
     * @param 传入参数
     */
    set value(v) {
        if (!this.refs || v === undefined) {
            throw "illegal syntax"
        }
        for (const key in this.refs) {
            this.refs[key].value = v;
        }
    }
    checkValidity(reportValidity) {
        if (!reportValidity.valid) {
            this.setState({
                toolState: 1,
                nodeState: 2,
                showToolTip: true,
                toolTipContent: reportValidity.report().errorInfo
            });
            return;
        }
        this.setState({
            nodeState: 1
        });
    }
    /**
     * @desc 验证报告
     */
    get reportValidity() {
        let reports = [], valid = true;
        this.setState({
            toolState: 0,
            showToolTip: false,
            nodeState: 0,
            toolTipContent: ""
        });
        for (const key in this.refs) {
            const reportValidity = this.refs[key].reportValidity;
            if (valid && !reportValidity.valid) {
                valid = false
            }
            this.checkValidity(reportValidity);
            reports.push(reportValidity);
        }
        return {
            vNode: this,
            valid: valid,
            reports: reports
        };
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