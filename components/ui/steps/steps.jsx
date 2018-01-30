import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { unique } from "./../control/control.jsx";
import "./steps.scss";

export default class Steps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            space: "",
            len: 0
        }
    }
    componentDidMount() {
        const _self = findDOMNode(this);
        const len = _self.querySelectorAll(".e-step").length - 1;
        this.setState({
            len: len + 1,
            space: 1 / len.toFixed(2)
        });
    }
    render() {
        let newArr = [];
        const props = this.props;
        let index = 1;
        if (props.children.length) {
            for (const item of props.children) {
                switch (item.type && item.type.name) {
                    case "Step":
                        newArr.push(<Step
                            key={index}
                            {...item.props}
                            space={props.space || this.state.space}
                            index={index}
                            active={props.active}
                            parent={this}
                            totalStep={this.state.len}
                            islast={index === this.state.len ? true : false}
                            finishStatus={props.finishStatus || false}
                            status={props.finishStatus ? 1 : (index < props.active ? 1 : props.active === index ? 0 : 2)}
                        ></Step>);
                        index++;
                        break;
                    default:
                        break;
                }
            }
        }
        return <div className={unique(`e-steps ${props.className} ${props.type}`.split(" ")).join(" ")}>
            {newArr}
        </div>
    }
}

/**
 * @param className
 * @param active 设置已经完成到第几步
 * @param space
 * @param finishStatus true 表示步骤完成 false步骤未完成
 */
Steps.defaultProps = {
    className: "e-steps",
    active: -1,
    finishStatus: false,
    type: "horizontal" // horizontal 水平 vertical 垂直
}

export class Step extends Component {
    constructor(props) {
        super(props);
        this.statusClassNameMap = {
            0: "e-step-processing",
            1: "e-step-finish",
            2: "e-step-unfinish",
        }
    }
    componentDidUpdate() {
        const props = this.props;
        const space = props.space;
        const _self = findDOMNode(this);
        if (!props.islast && findDOMNode(this.props.parent).className.indexOf(" vertical") < 0) {
            if (space < 1) {
                _self.style.flexBasis = space * 100 + "%";
            } else {
                _self.style.width = space + "px";
            }
        }
    }
    componentDidMount() { }
    render() {
        const props = this.props;
        return <div className={`e-step ${this.statusClassNameMap[props.status] || ""}`}>
            {
                props.icon ? <span className={`e-step-icon icon iconfont ${props.icon}`}></span> :
                    <span className="e-step-icon icon iconfont">{props.status !== 1 ? props.index : "✓"}</span>
            }
            <span className={`e-step-line  ${props.status === 1 ?
                (props.index + 2 <= props.active || props.finishStatus) ?
                    "finish" : "" : ""}`}></span>
            <div className="e-step-container">
                <span className="e-step-title" style={{ maxWidth: `${props.space < 1 ? undefined : props.space + "px"}` }}>{props.title}</span>
                {
                    props.description !== undefined ?
                        <span className="e-step-description" style={{ maxWidth: `${props.space < 1 ? undefined : props.space + "px"}` }}>{props.description}</span> : null
                }
            </div>
        </div>
    }
}

/**
 * @param className
 * @param title
 * @param icon 自定义icon 目前暂时只支持库里存在的icon className
 * @param islast 是否是最后一个步骤
 * @param description
 * @param status 当前步骤所处状态 0 进行中 1 已完成 2 未完成
 * @param active 当前第几步
 * @param totalStep 一共多少步
 * @param finishStatus 是否已经完成所有步骤
 */
Step.defaultProps = {
    className: "e-step",
    icon: "",
    status: 0,
    title: "",
    islast: false,
    description: "",
    active: -1,
    totalStep: -1,
    finishStatus: false
}