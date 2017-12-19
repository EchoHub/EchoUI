import React, { Component } from "react"
import CheckBox from "./../checkBox/checkBox.jsx"
import "./checkBoxGroup.scss"
/**
 * @desc 表示一个多选框
 */
export default class CheckBoxGroup extends Component {
    constructor(props) {
        super(props)
    }

    value() {
        const nodes = this.refs["checkBoxGroup"].querySelectorAll("input[type=checkbox]:checked")
        if(!nodes.length) return ""
        let resultArr = []
        for(const item of nodes) {
            resultArr.push(item.value)
        }
        return resultArr
    }

    render() {
        return <div ref="checkBoxGroup" className="checkBoxGroup">
            {
                this.props.children && this.props.children.length ? this.props.children.map((d, i) => {
                    const className = d.props["className"] + " e-mh-4";
                    return <CheckBox key={i} {...d.props} className={className}
                    >{d.props.children}</CheckBox>
                }): null
            }
        </div>
    }
}
CheckBoxGroup.defaultProps = {
    domType: "input",
    type: "checkbox"
}