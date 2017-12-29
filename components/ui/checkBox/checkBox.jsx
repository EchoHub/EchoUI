import React, { Component } from "react"
import Input from "./../input/input.jsx"
import "./checkBox.scss"
/**
 * @desc 表示一个多选框
 */
export default class CheckBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nodeOwnProperty: this.filterPropsHandle(props),
            isCheck: false
        };
    }
    filterPropsHandle(props) {
        const node = document.createElement("input")
        let params = {
            className: "e-checkbox"
        }
        for (const key in props) {
            const filterKey = /on[A-Z][a-z]*$/.test(key) ? key.toLocaleLowerCase() : key;
            node[filterKey] !== undefined && (params[key] = props[key] instanceof Function ? event => props[key](event) :
                filterKey === "className" ? `e-checkbox ${props[key]}` :
                    filterKey === "children" ? undefined : props[key]);
        }
        return params
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps) {
            for(const v of nextProps.dataValue) {
                v === nextProps.value && this.setState({
                    isCheck: true
                });
            }
        }
    }
    /**
     * @desc checkbox change事件
     * @param event event
     */
    changeCheckBoxHandle(event) {
        const nodeRef = this.refs[this.props["name"]].refs[this.props["name"]]
        const checked = nodeRef.checked
        this.setState({
            isCheck: !checked,
        })
        this.props.setCheckBoxValueHandle(!checked, nodeRef.value)
    }
    render() {
        return <div className={`e-checkbox ${this.props.className.replace(/e-checkbox/g, "")} 
            ${this.state.isCheck ? "active" : ""}`}>
            <span
                className="e-checkbox-inner"
                onClick={this.changeCheckBoxHandle.bind(this)}></span>
            <Input
                ref={this.props["name"]}
                {...this.state.nodeOwnProperty}
                checked={this.state.isCheck}
                inputRef={this.props["name"]}
                dataType={this.props.dataType}
                // dataValue={this.props.dataValue}
            />
            <span className="e-checkbox-content">{this.props.children}</span>
        </div>
    }

    /**
     * @desc 获取checkbox值
     */
    // get value() {
    //     return this.props.dataValue
    // }

    set checked(v) {
        v && this.setState({
            isCheck: v
        })
    }
}
CheckBox.defaultProps = {
    domType: "input",
    type: "checkbox",
    className: "e-checkbox",
    dataType: "checkbox"
}