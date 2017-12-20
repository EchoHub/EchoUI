import React, { Component } from "react"
import RadioBox from "./../radioBox/radioBox.jsx"
import "./radioBoxGroup.scss"
/**
 * @desc 表示一个单选框组
 */
export default class RadioBoxGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentNodeNumber: -1
        }
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

    /**
     * @desc 设置当前选中的第几个
     */
    setCurrentNodeNumber(currentNodeNumber) {
        this.setState({
            currentNodeNumber: currentNodeNumber
        })
    }

    render() {
        return <div ref="radioBoxGroup" className="radioBoxGroup">
            {
                this.props.children && this.props.children.length ? this.props.children.map((d, i) => {
                    const className = d.props["className"] + " e-mh-4";
                    return <RadioBox key={i} {...d.props} className={className} parentVNode={this} nodeNumber={i}
                    isCheck={this.state.currentNodeNumber === i ? true: false}>{d.props.children}</RadioBox>
                }): null
            }
        </div>
    }
}
RadioBoxGroup.defaultProps = {
    domType: "input",
    type: "radio"
}