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
    /**
     * @desc radiobox change事件
     * @param event event
     */
    changeRadioBoxHandle(event) {
        // 一个radioBoxGroup VDOM
        const radioBoxes = this.props.parentVNode.refs["radioBoxGroup"].querySelectorAll("div.e-radiobox");
        for (const item of radioBoxes) {
            item.className = item.className.replace(/active/g, "");
            item.querySelector("input[type=radio]").checked = false;
        }
        const nodeRef = this.refs[this.props["name"]].refs[this.props["name"]]
        this.setState({
            isCheck: true,
            checkValue: nodeRef.value
        })
    }
    render() {
        console.log(this.state)
        return <div className={`e-radiobox ${this.props.className.replace(/e-radiobox/g, "")} ${this.state.isCheck ? "active" : ""}`}>
            <span className="e-radiobox-inner" onClick={this.changeRadioBoxHandle.bind(this)}></span>
            <Input ref={this.props["name"]} {...this.state.nodeOwnProperty} checked={this.state.isCheck} inputRef={this.props["name"]} />
            <span className="e-radiobox-content">{this.props.children}</span>
        </div>
    }

    /**
     * @desc 获取radiobox值
     */
    value() {
        return this.state.checkValue
    }
}
RadioBox.defaultProps = {
    domType: "input",
    type: "radio",
    className: "e-radiobox"
}