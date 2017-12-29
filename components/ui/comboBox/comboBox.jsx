import React, { Component } from "react"
import Input from "./../input/input.jsx"
import "./comboBox.scss"

/**
 * @desc 组合框
 */
export default class ComboBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listItemDefaultClassName: "e-listitem",
            rootNodeClassName: "e-combobox",
            curListItemKey: -1,  //当前ListItem的key
            currentValue: "",
            currentNodeContent: ""
        }
    }
    /**
     * @desc 更新ComBox状态
     * @param curListItemKey 当前选中的下拉项 key
     * @param currentValue 当前选中的下拉项 值
     * @param currentNodeContent 当前选中的下拉项 节点内容
     * @param rootNodeClassName ListItem容器的className
     */
    updateComboxBoxStatusHandle(curListItemKey, currentValue, currentNodeContent, rootNodeClassName) {
        this.setState({
            listItemDefaultClassName: "e-listitem",
            curListItemKey: curListItemKey,
            currentValue: currentValue,
            currentNodeContent: currentNodeContent,
            rootNodeClassName: rootNodeClassName
        })
    }
    componentWillReceiveProps(nextProps) { }
    render() {
        // 过滤children特殊字段
        let newProps = {
            value: this.state.currentNodeContent
        }
        for (const key in this.props) {
            key !== "children" && (newProps[key] = key === "className" ? this.props[key] + " e-combobox-input" : this.props[key])
        }
        return <div ref="comboBox"
            className={this.state.rootNodeClassName}>
            <Input
                {...newProps}
                type="text"
                dataType={this.props.dataType}
                dataValue={this.state.currentNodeContent} />
            <span className="e-combobox-button"
                onClick={event => this.toggleListHandle(event)}>
                <i className="icon iconfont icon-shurukuangxialajiantou"></i>
            </span>
            <span className="e-combobox-list">
                <i className="e-combobox-arrow"></i>
                <ul className="e-combobox-ul">
                    {
                        this.props.children && this.props.children.length ? this.props.children.map((d, i) => {
                            return <ListItem key={i} nodeIndex={i}
                                isSelected={+this.state.currentValue == d.props.value ? true : false}
                                updateComboxBoxStatusHandle={this.updateComboxBoxStatusHandle.bind(this)}
                                value={d.props.value}
                                {...d.state}>{d.props.children}</ListItem>
                        }) : null
                    }
                </ul>
            </span>
        </div>
    }

    /**
     * @desc 获取节点ListItem的value
     */
    get value() {
        return this.state.currentValue
    }
    set value(v) {
        this.setState({
            currentValue: v
        })
    }
    /**
     * @desc 获取节点nodeContent 节点内容 即ComboBox中input内容
     */
    get text() {
        return this.state.currentNodeContent
    }
    /**
     * @desc 下拉框开关
     */
    toggleListHandle(event) {
        event.preventDefault()
        const className = this.refs.comboBox.className
        this.setState({
            rootNodeClassName: className.indexOf("active") > -1 ? "e-combobox" : "e-combobox active"
        })
    }
}
ComboBox.defaultProps = {
    domType: "input",
    type: "input",
    className: "e-textbox"
}

export class ListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            className: "e-listitem",
            isSelected: false
        }
    }
    componentWillReceiveProps(nextProps) {
        nextProps && this.setState({
            className: nextProps.isSelected ? "e-listitem selected" : "e-listitem"
        })
    }
    render() {
        return <li className={this.state.className} value={this.props.value} onClick={event => this.selectHandle(event, this.props.value)}>{this.props.children}</li>
    }

    /**
     * @desc 下拉点击事件
     * @param event
     * @param value ListItem 的 value值
     */
    selectHandle(event, value) {
        this.props.updateComboxBoxStatusHandle(this.props.nodeIndex, value, event.target.textContent, "e-combobox")
    }
}