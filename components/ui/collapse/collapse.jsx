import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { unique } from "./../control/control.jsx";
import "./collapse.scss";
/**
 * @desc 表示一个折叠面板
 */
export default class Collapse extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const props = this.props;
        let newChildren = [], index = 1;
        for (const item of props.children) {
            switch (item.type && item.type.name) {
                case "CollapseItem":
                    newChildren.push(<CollapseItem
                        key={index}
                        {...item.props}
                        content={item.children}
                        accordion={props.accordion}
                        parent={this}
                        ref={`collapseItem-${index}`}
                    ></CollapseItem>);
                    index ++;
                    break;
                default:
                    break;
            }
        }
        return <div
            className={unique(`e-collapse ${props.className}`.split(" ")).join(" ")}
            style={
                Object.assign(
                    {
                        width: props.width && typeof props.width === "number" ? props.width + "px" : undefined
                    },
                    props.style
                )
            }
        >
            {newChildren}
        </div >
    }
}
/**
 * @param accordion 手风琴效果
 * @param icon 设置标题图标
 */
Collapse.defaultProps = {
    className: "e-collapse",
    // accordion:
}

export class CollapseItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: false
        }
    }
    toggleHandler() {
        const _parent = this.props.parent;
        const _content = findDOMNode(this.refs.content);
        let height;
        if(this.props.accordion) {
            for(const key in _parent.refs) {
                const _it = _parent.refs[key];
                if(_it !== this) { 
                    const _it_content = findDOMNode(_it.refs.content);
                    // let _it_height;
                    // _it_height = _it_content.offsetHeight ? _it_content.offsetHeight - 20 : 0;
                    // _content.style.height = _it_height + "px";
                    // setTimeout(() => {
                    //     _content.style.height = 0;
                    //     _content.style.padding = "0 8px";
                    //     setTimeout(() => {
                            
                    //     }, 300);
                    // }, 10);
                    _it_content.style.display = "none";
                    _it_content.style.height = null;
                    _it_content.style.padding = "10px 8px";
                    _it.setState({
                        display: false
                    });
                 }
            }
        }
        if (!this.state.display) {
            this.setState({
                display: !this.state.display
            });
            _content.style.display = "block";
            height = _content.offsetHeight - 20;
            _content.style.height = 0;
            setTimeout(() => {
                _content.style.height = height + "px";
                setTimeout(() => {
                    _content.style.height = null;
                }, 300);
            }, 10);
        } else {
            height = _content.offsetHeight - 20;
            _content.style.height = height + "px";
            setTimeout(() => {
                _content.style.height = 0;
                _content.style.padding = "0 8px";
                setTimeout(() => {
                    _content.style.display = "none";
                    _content.style.height = null;
                    _content.style.padding = "10px 8px";
                    this.setState({
                        display: !this.state.display
                    });
                }, 300);
            }, 10);
        }
    }
    render() {
        const props = this.props;
        return <div className="e-collapse_item">
            <div
                ref="head"
                className={`e-collapse_item_head ${this.state.display ? "active" : ""}`}
                onClick={
                    () => {
                        this.toggleHandler()
                    }
                }
            >
                {
                    props.icon ? <i className={`icon iconfont ${props.icon} e-mr-10`}></i> : null
                }
                {props.title || "面板"}
                <i className="icon iconfont icon-arrow e-collapse_item_head_arrow"></i>
            </div>
            <div
                ref="content"
                className="e-collapse_item_content"
            >
                {props.content || props.children}
            </div>
        </div>
    }
}