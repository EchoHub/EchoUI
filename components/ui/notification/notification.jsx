import React, { Component } from "react";
import { render, findDOMNode } from "react-dom";
import "./notification.scss";

export default class Notification extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const _self = findDOMNode(this);
        const notices = document.body.querySelectorAll(".e-notification");
        notices.length > 1 && (_self.style.top = (() => {
            const preNotice = notices[notices.length - 2];
            return preNotice.offsetTop + preNotice.offsetHeight + 10 + "px";
        })());
        const rightTimer = setTimeout(() => {
            _self.style.right = "30px";
            clearTimeout(rightTimer);
        }, 10);

        if(this.props.autoClose) {
            const removeTimer = setTimeout(() => {
                this.closeHandle();
                clearTimeout(removeTimer);
            }, this.props.duration);
        }
    }

    closeHandle() {
        const _self = findDOMNode(this);
        const notices = document.body.querySelectorAll(".e-notification");
        let index = 0
        // 定位当前元素位置
        for(const key in notices) {
            if(notices[key] === _self) index = key
        }
        _self.style.right = "-999px";
        const moveHeight = _self.offsetHeight + 10
        const removeTimer = setTimeout(() => {
            _self.remove();
            clearTimeout(removeTimer);
            // 当前元素后面兄弟元素上移
            if(notices.length) {
                for(const k in notices) {
                    if(k > index && notices[k].style) notices[k].style.top = notices[k].offsetTop - moveHeight + "px";
                }
            }
        }, 500);
    }

    render() {
        return <div className={`e-notification`}>
            {
                this.props.isFlag ? <div className="e-notification-flag">
                    <span className={`icon iconfont 
                            ${this.props.iconEnum[this.props.theme]} 
                            ${this.props.themeEnum[this.props.theme]}`}>
                    </span>
                </div> : null
            }
            <div className="">
                <div className="e-notification-title">
                    {this.props.title}
                    <span className={`e-notification-close icon iconfont icon-guanbi`}
                        onClick={e => { this.closeHandle() }}></span>
                </div>
                <div className="e-notification-content">{this.props.content}</div>
            </div>
        </div>
    }
}
Notification.defaultProps = {
    title: "消息通知",
    theme: "default",
    autoClose: true,
    isFlag: false,
    content: "",
    duration: "4500",
    iconEnum: {
        "default": "",
        "info": "icon-xinxi",
        "success": "icon-success",
        "warning": "icon-jinggao",
        "error": "icon-error"
    },
    themeEnum: {
        "default": "",
        "info": "primary",
        "success": "success",
        "warning": "warning",
        "error": "error"
    }
}
export class Notice {
    show(options) {
        this.createNotification(options)
    }
    /**
     * @desc 创建一个消息通知框
     * @param {*} options 
     */
    info(options) {
        this.createNotification(options, "info", true)
    }
    /**
     * @desc 创建一个成功消息通知框
     * @param {*} options 
     */
    success(options) {
        this.createNotification(options, "success", true)
    }
    /**
     * @desc 创建一个错误消息通知框
     * @param {*} options 
     */
    error(options) {
        this.createNotification(options, "error", true)
    }
    /**
     * @desc 创建一个警告消息通知框
     * @param {*} options 
     */
    warning(options) {
        this.createNotification(options, "warning", true)
    }

    createNotification(options, theme, isFlag) {
        const notificationContainer = document.createElement("div");
        notificationContainer.className = "e-notification-container";
        document.body.appendChild(notificationContainer);
        render(<Notification {...options} theme={theme} isFlag={isFlag}></Notification>, notificationContainer);
    }
}