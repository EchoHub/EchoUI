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

    get value() {
        return [this.state.currentValue];
    }

    set value(v) {
        const nodes = this.refs["radioBoxGroup"].querySelectorAll("input[type=radio]");
        for(const item of v) {
            for(const key in nodes) {
                nodes[key].value === item && (this.setState({
                    currentNodeNumber: key,
                    currentValue: item
                }));
            }
        }
    }

    /**
     * @desc 设置radiobox 当前节点,和当前值
     */
    setRadioBoxValueHandle(currentNodeNumber, value) {
        this.setState({
            currentNodeNumber: currentNodeNumber,
            currentValue: value
        })
    }

    render() {
        return <div ref="radioBoxGroup" className="radioBoxGroup">
            {
                this.props.children && this.props.children.length ? this.props.children.map((d, i) => {
                    const className = d.props["className"] + " e-mh-4";
                    return <RadioBox
                        key={i}
                        name={this.props.name}
                        {...d.props}
                        className={className}
                        parentVNode={this}
                        nodeNumber={i}
                        isCheck={+this.state.currentNodeNumber === i ? true : false}
                        dataValue={this.state.currentValue}
                        setRadioBoxValueHandle={this.setRadioBoxValueHandle.bind(this)}
                    >{d.props.children}</RadioBox>
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
RadioBoxGroup.defaultProps = {
    domType: "input",
    type: "radio",
    dataType: "radioBoxGroup"
}