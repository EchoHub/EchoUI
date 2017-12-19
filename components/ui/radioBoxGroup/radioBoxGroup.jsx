import React, { Component } from "react"
import RadioBox from "./../radioBox/radioBox.jsx"
import "./radioBoxGroup.scss"
/**
 * @desc 表示一个多选框
 */
export default class RadioBoxGroup extends Component {
    constructor(props) {
        super(props)
    }

    value() {
        const nodes = this.refs["radioBoxGroup"].querySelectorAll("input[type=radio]:checked")
        if(!nodes.length) return ""
        let resultArr = []
        for(const item of nodes) {
            resultArr.push(item.value)
        }
        return resultArr
    }

    render() {
        return <div ref="radioBoxGroup" className="radioBoxGroup">
            {
                this.props.children && this.props.children.length ? this.props.children.map((d, i) => {
                    const className = d.props["className"] + " e-mh-4";
                    return <RadioBox key={i} {...d.props} className={className} parentVNode={this}
                    >{d.props.children}</RadioBox>
                }): null
            }
        </div>
    }
}
RadioBoxGroup.defaultProps = {
    domType: "input",
    type: "radio"
}