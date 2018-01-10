import React, { Component } from "react"
import { findDOMNode } from "react-dom";
import "./toolTip.scss"
export default class ToolTip extends Component {
    constructor(props) {
        super(props)
        this.state = {
            style: {
                top: 0,
                left: 0
            }
        }
    }
    componentDidMount() {
        reAlign(this, this.props.parentTarget);
    }
    render() {
        return <div className="e-tooltip" style={this.state.style}>
            {this.props.children}
        </div>
    }

}

/**
 * @desc 弹出模块重新定位
 * @param target 定位的目标
 */
export function reAlign(_self, target) {
    const targetElem = findDOMNode(target)
    const _selfElem = findDOMNode(_self)
    const top = target.clientY;
    const left = target.clientX;
    const height = targetElem.offsetHeight;
    const width = targetElem.offsetLeft;
    const _selfHeight = _selfElem.offsetHeight;
    const _selfWidth = _selfElem.offsetWidth;
    console.log(_selfElem)
    debugger
    _self.setState({
        style: {
            top: "-" + (_selfHeight + 10) + "px",
            left: (width - _selfWidth)/2 + "px",
            maxWidth: width + "px"
        }
    })
}