import React, { Component } from "react"
import { findDOMNode } from "react-dom"
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
            isCheck: false,
            ref: ""
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
        if (nextProps) {
            if (nextProps.dataValue && nextProps.dataValue.length) {
                for (const v of nextProps.dataValue) {
                    if (v === nextProps.value) {
                        this.setState({
                            isCheck: true
                        });
                        return;
                    }
                    this.setState({
                        isCheck: false
                    });
                }
            }
            this.checked = nextProps.checked || false;
        }
    }
    componentDidMount() {
        const ref = this.props["name"] || `e-checkbox-${new Date().getTime()}`;
        this.setState({
            ref: ref
        });
    }
    /**
     * @desc checkbox change事件
     * @param event event
     */
    changeCheckBoxHandle(ref, event) {
        if (this.state.nodeOwnProperty["disabled"]) return;
        const nodeRef = this.refs[ref].refs[ref]
        const checked = nodeRef.checked
        this.setState({
            isCheck: !checked,
        });
        const props = this.props;
        props.setCheckBoxValueHandle && props.setCheckBoxValueHandle(!checked, nodeRef.value);
        props.onClick && props.onClick(event, this);
        props.onChange && props.onChange(event, this);
    }
    render() {
        const props = this.props;

        return <div className={`e-checkbox ${props.className.replace(/e-checkbox/g, "")} 
            ${this.state.nodeOwnProperty["disabled"] ? "disabled" : ""}
            ${this.state.isCheck ? "active" : ""}`}>
            <span
                className="e-checkbox-inner"
                onClick={this.changeCheckBoxHandle.bind(this, this.state.ref)}
            ></span>
            <Input
                ref={this.state.ref}
                {...this.state.nodeOwnProperty}
                checked={this.state.isCheck}
                inputRef={this.state.ref}
                dataType={props.dataType}
            // dataValue={this.props.dataValue}
            />
            <span className="e-checkbox-content">{props.children}</span>
        </div>
    }

    /**
     * @desc 获取checkbox值
     */
    get value() {
        return this.refs[this.state.ref].value
    }
    /**
     * @desc 获取checkbox值
     */
    get checked() {
        return this.refs[this.state.ref].checked
    }

    set checked(v) {
        this.setState({
            isCheck: v || false
        });
    }
}
CheckBox.defaultProps = {
    domType: "input",
    type: "checkbox",
    className: "e-checkbox",
    dataType: "checkbox"
}