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
        const val = this.refs[this.props["name"]].refs[this.props["name"]].value
        return val
    }

    render() {
        return <div className="checkBoxGroup">
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