import React, { Component } from "react"
import Input from "./../input/input.jsx"
import "./radioBox.scss"
/**
 * @desc 表示一个单选框
 */
export default class RadioBox extends Component {
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
            className: "e-radiobox"
        }
        for (const key in props) {
            const filterKey = /on[A-Z][a-z]*$/.test(key) ? key.toLocaleLowerCase() : key;
            node[filterKey] !== undefined && (params[key] = props[key] instanceof Function ? event => props[key](event) :
                filterKey === "className" ? `e-radiobox ${props[key]}` :
                    filterKey === "children" ? undefined : props[key]);
        }
        return params
    }
    componentWillReceiveProps(nextProps) {
        nextProps && (this.setState({
            nodeOwnProperty: this.filterPropsHandle(nextProps),
            isCheck: nextProps.isCheck
        }))
    }
    /**
     * @desc radiobox change事件
     * @param event event
     */
    changeRadioBoxHandle(event) {
        const nodeRef = this.refs[this.props["name"]].refs[this.props["name"]]
        this.props.setRadioBoxValueHandle(this.props.nodeNumber, nodeRef.value)
    }
    render() {
        const props = this.props
        const isCheck = this.state.isCheck
        return <div className={`e-radiobox 
            ${props.className.replace(/e-radiobox/g, "")}
            ${isCheck ? "active" : ""}`}>
            <span className="e-radiobox-inner"
                onClick={this.changeRadioBoxHandle.bind(this)}></span>
            <Input
                ref={this.props["name"]}
                {...this.state.nodeOwnProperty}
                inputRef={props["name"]}
                dataType={props.dataType}
                dataValue={props.dataValue}
            />
            <span className="e-radiobox-content">{this.props.children}
            </span>
        </div>
    }

    /**
     * @desc 获取radiobox值
     */
    get value() {
        return this.props.dataValue
    }
}
RadioBox.defaultProps = {
    domType: "input",
    type: "radio",
    className: "e-radiobox",
    dataType: "radio"
}