import React, { Component } from "react"
import Input from "./../input/input.jsx"
import "./comboBox.scss"

/**
 * @desc 组合框
 */
export default class ComboBox extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        // 过滤children特殊字段
        let newProps = {}
        for(const key in this.props) {
            key !== "children" && (newProps['key'] = this.props[key])
        }
        return <div className="e-combobox">
            <Input {...this.newProps}/>
            <button onClick={this.toggleListHandle}><i className="iconfont icon-shurukuangxialajiantou"></i></button>
            <ul className="e-combobox-ul">
                {
                    this.props.children && this.props.children.length ? [this.props.children]: null
                }
            </ul>
        </div>
    }

    toggleListHandle() {

    }
}
ComboBox.defaultProps = {
    domType: "input",
    type: "text",
    className: "e-textbox"
}

export class ListItem {

}