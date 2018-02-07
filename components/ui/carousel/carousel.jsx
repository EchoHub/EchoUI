import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { unique } from "./../control/control.jsx";
import "./carousel.scss";

export default class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curStep: 1,
            translateX: [],
            opacity: [],
        }
    }
    /**
     * @desc 轮播控制
     */
    sliderHandler(index, total, theme) {
        const _width = findDOMNode(this).offsetWidth;
        switch (theme) {
            case "fade":
                let zIndexArr = [], opacityArr = [];
                for (let i = 0; i < total; i++) {
                    opacityArr.push(i === index ? 1 : 0);
                }
                this.setState({
                    opacity: opacityArr,
                    curStep: index + 1
                });
                break;
            // case "card":
            //     break;
            case "basic":
            default:
                let translateXArr = [];
                for (let i = 0; i < total; i++) {
                    let translateX = 0;
                    if (i < index) {
                        // 排到最后
                        translateX = _width * (total - 2 - i);
                    } else {
                        translateX = -_width * index;
                    }
                    translateXArr.push(translateX)
                }
                this.setState({
                    translateX: translateXArr,
                    curStep: index + 1
                });
                break;
        }
    }
    componentDidMount() {
        const theme = this.props.theme;
        const total = this.props.children.length;
        if (theme === "fade") {
            let translateXArr = [];
            for (let i = 0; i < total; i++) {
                let translateX = -findDOMNode(this).offsetWidth * i;
                translateXArr.push(translateX)
            }
            this.setState({
                translateX: translateXArr,
            });
        }
        if (this.props.auto) {
            setInterval(() => {
                this.changeHandler(2, total, theme);
            }, this.props.duration);
        }
    }
    /**
     * @desc 幻灯片
     * @param type 1 上一张 2 下一张
     * @param total 幻灯片总数
     */
    changeHandler(type, total, theme) {
        const curStep = this.state.curStep;
        let index;
        if (type === 1) {
            this.sliderHandler(curStep > 1 ? curStep - 2 : total - 1, total, theme)
            return;
        }
        this.sliderHandler(curStep < total ? curStep : 0, total, theme)
    }
    render() {
        const props = this.props;
        let newChildren = [], index = 1;
        for (const item of this.props.children) {
            switch (item.type && item.type.name) {
                case "CarouselItem":
                    newChildren.push(<CarouselItem
                        key={index}
                        {...item.props}
                        content={item.children}
                        accordion={item.accordion}
                        parent={this}
                        isCur={this.state.curStep === index}
                        translateX={this.state.translateX[index - 1]}
                        opacity={this.state.opacity[index - 1]}
                    // ref={`carouselItem-${index}`}
                    ></CarouselItem>);
                    index++;
                    break;
                default:
                    break;
            }
        }
        if (!newChildren.length) {
            return null
        }
        return <div
            className={unique(`e-carousel ${props.className} ${props.theme}`.split(" ")).join(" ")}
            style={Object.assign(props.style || {}, { width: typeof props.width === "number" ? props.width + "px" : props.width })}
        >
            <div
                className="e-carousel_container"
            // style={{
            //     transform: `translateX(-${this.state.translateX}px)`
            // }}
            >{newChildren}</div>
            <div className="e-carousel-arrow icon iconfont icon-arrow left" onClick={() => { this.changeHandler(1, newChildren.length, props.theme) }}></div>
            <div className="e-carousel-arrow icon iconfont icon-arrow right" onClick={() => { this.changeHandler(2, newChildren.length, props.theme) }}></div>
            <div className="e-carousel_stepbar">
                <ul className="e-carousel_indicators">
                    {
                        newChildren.map((d, i) =>
                            <li
                                key={i}
                                className={`e-carousel_indicator ${this.state.curStep === (i + 1) ? "active" : ""}`}
                                onClick={() => { this.sliderHandler(i, newChildren.length, props.theme) }}
                            >
                                <span className="e-carousel_button"></span>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    }
}
/**
 * @param width 宽度
 * @param auto 自动轮播
 * @param duration 间隔时间
 * @param theme 主题 basic(基本)、card(卡片化)、fade(渐显)
 */
Carousel.defaultProps = {
    className: "e-carousel",
    width: 350,
    auto: false,
    duration: 4000,
    theme: "basic"
}

export class CarouselItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const props = this.props;
        return <div
            className="e-carousel_item"
            style={{
                transform: `
                    ${+props.translateX ? `translateX(${props.translateX}px)` : `translateX(0)`}
                `,
                opacity: props.opacity,
                transitionDelay: !props.isCur ? "0.3s" : undefined
            }}
        >
            {props.children}
        </div>
    }
}