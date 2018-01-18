import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import "./alert.scss";
/**
 * @desc 警告框
 */
export default class Alert extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className={`e-alert ${this.props.theme || ""} ${this.props.className || ""}`}>
            {
                this.props.title !== undefined ? <div className="e-alert-title">
                    {this.props.flag ? <span className={`e-alert-flag ${this.props.theme || ""} ${this.props.flagClassEnum[this.props.flag] || ""}`}></span> : null}
                    <div>
                        {this.props.title || null}
                        {this.props.close ? <span className="e-alert-close icon iconfont icon-guanbi" onClick={this.closeHandle.bind(this)}></span> : null}
                    </div>
                </div> : null
            }
            <div className="e-alert-content">{
                this.props.contentFlag ? <span className={`e-alert-flag e-mr-10 ${this.props.theme || ""} ${this.props.flagClassEnum[this.props.contentFlag] || ""}`}></span> : null}
                {this.props.children}
            </div>
        </div>
    }

    /**
     * @desc 关闭
     */
    closeHandle() {
        findDOMNode(this).remove()
    }
}
/**
 * @param theme 皮肤类型
 * @param className 类名
 * @param title 标题
 * @param flag 图标
 * @param flagClassEnum 图标指定枚举
 * @param close 是否有关闭按钮
 * @param children 内容
 * 
 */
Alert.defaultProps = {
    className: "e-alert",
    flagClassEnum: {
        "default": "icon iconfont icon-xunwen",
        "primary": "icon iconfont icon-xinxi",
        "success": "icon iconfont icon-success",
        "error": "icon iconfont icon-error",
        "warning": "icon iconfont icon-jinggao"
    }
}