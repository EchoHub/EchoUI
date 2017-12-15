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
            curListItemKey: -1  //当前ListItem的key
        }
    }
    /**
     * @desc 初始化下拉项默认样式
     */
    updateListItemStatusHandle(curListItemKey) {
        this.setState({
            listItemDefaultClassName: "e-listitem",
            curListItemKey: curListItemKey
        })
    }

    render() {
        // 过滤children特殊字段
        let newProps = {}
        for (const key in this.props) {
            key !== "children" && (newProps[key] = this.props[key])
        }
        return <div ref="comboBox" className={this.state.rootNodeClassName}>
            <Input {...newProps} type="text"/>
            <button className="e-combobox-button" onClick={event => this.toggleListHandle(event)}>
                <i className="icon iconfont icon-shurukuangxialajiantou"></i>
            </button>
            <span className="e-combobox-list">
                <i className="e-combobox-arrow"></i>
                <ul className="e-combobox-ul">
                    {
                        this.props.children && this.props.children.length ? this.props.children.map((d, i) => {
                            return <ListItem key={i} nodeIndex={i}
                            isSelected={i === this.state.curListItemKey ? true : false}
                            updateListItemStatusHandle={this.updateListItemStatusHandle.bind(this)} 
                             {...d.state}>{d.props.children}</ListItem>
                        }) : null
                    }
                </ul>
            </span>
        </div>
    }

    /**
     * @desc 下拉框开关
     */
    toggleListHandle(event) {
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
        this.setState({
            className: nextProps.isSelected ? "e-listitem selected" : "e-listitem"
        })
    }
    render() {
        return <li className={this.state.className} value={this.props.value} onClick={event => this.selectHandle(event)}>{this.props.children}</li>
    }

    /**
     * @desc 下拉点击事件
     */
    selectHandle(event) {
        this.props.updateListItemStatusHandle(this.props.nodeIndex)
    }
}