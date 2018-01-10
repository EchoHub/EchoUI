import React, { Component } from "react"
import CheckBox from "./../checkBox/checkBox.jsx"
import "./checkBoxGroup.scss"
/**
 * @desc 表示一个多选框
 */
export default class CheckBoxGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentValue: []
        }
    }

    get value() {
        return this.state.currentValue
    }

    set value(v) {
        this.setState({
            currentValue: v
        })
    }
    /**
     * @desc 设置checkbox dataValue
     */
    setCheckBoxValueHandle(isChecked, value) {
        let newValue = []
        if(!isChecked) {
            for(const item of this.state.currentValue) {
                item !== value && (newValue.push(item))
            }
        }
        this.setState({
            currentValue: isChecked ? this.state.currentValue.concat([value]): newValue
        })
    }

    render() {
        return <div ref="checkBoxGroup" className="checkBoxGroup">
            {
                this.props.children && this.props.children.length ? this.props.children.map((d, i) => {
                    const className = d.props["className"] + " e-mh-4";
                    let isChecked = false;
                    return <CheckBox
                        key={i}
                        name={this.props.name}
                        {...d.props}
                        className={className}
                        setCheckBoxValueHandle={this.setCheckBoxValueHandle.bind(this)}
                        dataValue={this.state.currentValue} // 当前多选组 默认选中项 array
                    >{d.props.children}</CheckBox>
                }) : null
            }
        </div>
    }

    /**
     * @desc 报告错误
     * @param vNode 节点
     * @param errorType 报错类型
     */
    get reportValidity() {
        return {
            vNode: this,
            report: () => {
            },
            valid: true
        }
    }
}
CheckBoxGroup.defaultProps = {
    domType: "input",
    type: "checkbox"
}