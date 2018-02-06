import React, { Component } from "react";
import { unique } from "./../control/control.jsx";
import "./card.scss";
/**
 * @desc 表示一个卡片
 */
export default class Card extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const props = this.props;
        return <div
            className={unique(`e-card ${props.theme} ${props.className}`.split(" ")).join(" ")}
            style={
                Object.assign({
                    width: typeof props.width === "number" ? props.width + "px" : props.width,
                    height: typeof props.height === "number" ? props.height + "px" : props.height
                }, props.style || {})
            }
        >
            {
                props.theme === "define" ? props.children : <section>
                    {
                        props.title ? <div
                            className="e-card-title"
                        >
                            <div className="e-card_title">{props.title}</div>
                            {
                                props.button ? <a className="e-card_button" href="javascript:;" onClick={() => {
                                    props.button.handler()
                                }}>{props.button.name}</a> : null
                            }
                            {
                                props.tip ? <p className="e-card_tip">{props.tip}</p> : null
                            }
                        </div> : null
                    }
                    <div
                        className="e-card_content"
                    >
                        {
                            props.content !== "" ? props.content : props.children
                        }
                    </div>
                </section>
            }
        </div>
    }
}
/**
 * @param className 卡片样式
 * @param content 卡片内容
 * @param width 卡片宽度
 * @param button 卡片按钮
 * @param theme 卡片主题 basic 基本主题 define 自定义主题
 */
Card.defaultProps = {
    className: "e-card",
    content: "",
    width: 280,
    height: "auto",
    button: null,
    theme: "basic"
}