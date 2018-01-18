import React, { Component } from "react";
import { findDOMNode, render } from "react-dom";
import Alert from "./../alert/alert.jsx";
import "./message.scss";

/**
 * @desc 警告框
 */
export default class Message {
    /**
     * @desc 默认提示
     * @param info 提示内容
     */
    default(info) {
        this.createAlert(info, "default")
    }
    /**
     * @desc 消息提示
     * @param info 提示内容
     */
    info(info) {
        this.createAlert(info, "primary");
    }
    /**
     * @desc 成功提示
     * @param info 提示内容
     */
    success(info) {
        this.createAlert(info, "success");
    }
    /**
     * @desc 警告提示
     * @param info 提示内容
     */
    warning(info) {
        this.createAlert(info, "warning");
    }
    /**
     * @desc 错误提示
     * @param info 提示内容
     */
    error(info) {
        this.createAlert(info, "error");
    }

    /**
     * @desc 创建一个Alert
     * @param info 内容
     * @param theme 皮肤
     */
    createAlert(info, theme) {
        const messageContianer = document.createElement("div");
        messageContianer.className = "e-message-container";
        document.body.appendChild(messageContianer);
        render(<Alert theme={theme} contentFlag={theme}>{info}</Alert>, messageContianer);
        const width = messageContianer.offsetWidth;
        const height = messageContianer.offsetHeight;
        messageContianer.style.marginLeft = -width/2 + "px";
        messageContianer.style.marginTop = -height/2 + "px";
        messageContianer.style.opacity = 0;
        const transitionTimer = setTimeout(() => {
            messageContianer.style.transition = "all ease .3s";
            const poritionTimer = setTimeout(() => {
                messageContianer.style.opacity = 1;
                messageContianer.style.top = "60px";
                clearTimeout(poritionTimer)
            }, 10);
            clearTimeout(transitionTimer);
        }, 10)
        const timer = setTimeout(() => {
            messageContianer.style.top = 0;
            messageContianer.style.opacity = 0;
            const removeTimer = setTimeout(() => {
                messageContianer.remove();
                clearTimeout(removeTimer)
            }, 500);
            clearTimeout(timer);
        }, 3000);
    }
}

Message.defaultProps = {
    className: "e-message"
}