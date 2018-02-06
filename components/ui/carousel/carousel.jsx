import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import "./carousel.scss";

export default class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curStep: 1,
            translateX: 0
        }
    }
    /**
     * @desc 轮播控制
     */
    sliderHandler(i) {
        const _width = findDOMNode(this).offsetWidth;
        this.setState({
            translateX: _width * i,
            curStep: i + 1
        });
    }
    render() {
        const props = this.props;
        let newChildren = [], index = 1;
        for (const item of props.children) {
            switch (item.type && item.type.name) {
                case "CarouselItem":
                    newChildren.push(<CarouselItem
                        key={index}
                        {...item.props}
                        content={item.children}
                        accordion={item.accordion}
                        parent={this}
                        ref={`carouselItem-${index}`}
                    ></CarouselItem>);
                    index++;
                    break;
                default:
                    break;
            }
        }
        return <div
            className="e-carousel"
            style={Object.assign(props.style || {}, { width: typeof props.width === "number" ? props.width + "px" : props.width })}
        >
            <div
                className="e-carousel_container"
                style={{
                    transform: `translateX(-${this.state.translateX}px)`
                }}
            >{newChildren}</div>
            <div className="e-carousel_stepbar">
                <ul className="e-carousel_indicators">
                    {
                        newChildren.map((d, i) =>
                            <li
                                key={i}
                                className={`e-carousel_indicator ${this.state.curStep === (i + 1) ? "active" : ""}`}
                                onClick={() => { this.sliderHandler(i) }}
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
Carousel.defaultProps = {
    className: "e-carousel",
    width: 350
}

export class CarouselItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="e-carousel_item">
            {this.props.children}
        </div>
    }
}