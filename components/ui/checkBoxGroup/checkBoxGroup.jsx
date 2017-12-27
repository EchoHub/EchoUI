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

    value() {
        const nodes = this.refs["checkBoxGroup"].querySelectorAll("input[type=checkbox]:checked")
        if (!nodes.length) return ""
        let resultArr = []
        for (const item of nodes) {
            resultArr.push(item.value)
        }
        return resultArr
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
                    return <CheckBox
                        key={i}
                        name={this.props.name}
                        {...d.props}
                        className={className}
                        setCheckBoxValueHandle={this.setCheckBoxValueHandle.bind(this)}
                        dataValue={this.state.currentValue}
                    >{d.props.children}</CheckBox>
                }) : null
            }
        </div>
    }
}
CheckBoxGroup.defaultProps = {
    domType: "input",
    type: "checkbox"
}