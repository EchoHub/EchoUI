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
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            /**
             * _nodeState 表示 节点状态
             *  0 初始化
             *  1 节点需要进行更新
             *  2 节点即将挂载
             */
            nextProps._nodeState === 1 && updateAlign(this, nextProps._children, nextProps.parentTarget)
        }
    }
    componentDidMount() {
        reAlign(this, this.props.parentTarget);
    }
    render() {
        return <div className="e-tooltip"
            style={this.state.style}
        >
            {this.props._children}
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
    const top = targetElem.offsetTop;
    const left = targetElem.offsetLeft;
    const scrollTop = (document.documentElement || document.body).scrollTop;
    const height = targetElem.offsetHeight;
    const width = targetElem.offsetWidth;
    const _selfHeight = _selfElem.offsetHeight;
    const _selfWidth = _selfElem.offsetWidth;
    _self.setState({
        style: {
            top: (top - scrollTop - _selfHeight - 8) + "px",
            left: (left + width / 2 - _selfWidth / 2) + "px"
        }
    });
}

/**
 * @desc 更新弹出模块的定位
 * @param 内容
 * @param 定位的目标
 */
export function updateAlign(_self, _children, target) {
    const span = document.createElement("span");
    span.innerHTML = _children;
    span.style=`visibility:hidden;font-size: .6rem;display: inline-block;padding: .1rem .5rem;border-radius: 2px;
    max-width: 20rem;`;
    document.body.appendChild(span);
    const _childrenWidth = span.offsetWidth;
    const _childrenHeight = span.offsetHeight;
    document.body.removeChild(span);
    const targetElem = findDOMNode(target);
    const top = targetElem.offsetTop;
    const left = targetElem.offsetLeft;
    const width = targetElem.offsetWidth;
    
    const scrollTop = (document.documentElement || document.body).scrollTop;
    _self.setState({
        style: {
            top: (top - scrollTop - _childrenHeight - 8) + "px",
            left: (left + width / 2 - _childrenWidth / 2) + "px"
        }
    });
}