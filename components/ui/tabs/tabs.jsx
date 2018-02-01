import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { unique } from "./../control/control.jsx";
import "./tabs.scss";

export default class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [],
            active: -1,
            isScrollable: props.isScroll,
            initStyle: {
                width: "100%"
            }
        }
    }
    componentDidMount() {
        let newArr = [], tabList = [], index = 1;
        const props = this.props;
        if (props.children.length) {
            for (const item of props.children) {
                switch (item.type && item.type.name) {
                    case "Tab":
                        tabList.push({
                            label: item.props.label,
                            name: `tab-${item.props.name !== undefined ? item.props.name : index}`,
                            // active: index === props.active
                        })
                        index++;
                        break;
                    default:
                        break;
                }
            }

        }
        this.setState({
            active: props.active,
            tabList: tabList
        });
        const timer = setTimeout(() => {
            this.setBarPosition(props.active);
            clearTimeout(timer);
        }, 10);
    }
    changeTabHandler(i) {
        this.setState({
            active: i
        });
        this.setBarPosition(i)
    }
    setBarPosition(i) {
        // 获取选项卡的宽度 定位bar的位置
        let index = 1;
        let _offsetLeft = 0;
        let _width = 0;
        let tabWidthTotal = 0;
        const header = findDOMNode(this).querySelector(".e-tabs-tablist .e-tabs-header")
        const tablistWidth = header.offsetWidth;
        for (const item of findDOMNode(this).querySelectorAll(".e-tabs-item")) {
            tabWidthTotal += item.offsetWidth;
            if (index === i) {
                let tabListTranslateX = 0;
                if (item.offsetLeft + item.offsetWidth > tablistWidth) {
                    tabListTranslateX = item.offsetLeft + item.offsetWidth - 20 - tablistWidth
                    header.style.transform = `translateX(-${tabListTranslateX}px)`
                }
                _offsetLeft = item.offsetLeft - tabListTranslateX;
                _width = item.offsetWidth + "px";
            }
            index++;
        }
        this.setState({
            isScroll: tabWidthTotal > tablistWidth ? true : false,
            active: i,
            tabBarStyle: {
                transform: `translateX(${_offsetLeft}px)`,
                width: _width
            }
        });
    }
    /**
     * @desc 滚动条 向右
     */
    preHandler(i) {
        const curStep = i > 1 ? i - 1: 1
        this.setBarPosition(curStep)
    }
    /**
     * @desc 向左
     */
    nextHandler(i) {
        const total = this.state.tabList.length
        const curStep = i < total ? i + 1 : total
        this.setBarPosition(curStep)
    }
    render() {
        const props = this.props;
        let newArr = [], index = 1;
        if (props.children.length) {
            for (const item of props.children) {
                switch (item.type && item.type.name) {
                    case "Tab":
                        newArr.push(<Tab
                            {...item.props}
                            key={index}
                            active={index === this.state.active}
                            id={`panel-${item.props.name !== undefined ? item.props.name : index}`}
                        ></Tab>);
                        index++;
                        break;
                    default:
                        break;
                }
            }

        }
        return <div className={unique(`e-tabs ${props.className}`.split(" ")).join(" ")} style={{ width: props.width ? props.width + "px" : null }}>
            <div className="e-tabs-tablist">
                {
                    this.state.isScroll ? <div
                        className="e-tabs-pre icon iconfont icon-arrow"
                        onClick={() => { this.preHandler(this.state.active) }}
                    ></div> : null
                }
                {
                    this.state.isScroll ? <div
                        className="e-tabs-next icon iconfont icon-arrow"
                        onClick={() => { this.nextHandler(this.state.active) }}
                    ></div> : null
                }
                <div className={`e-tabs-header ${this.state.isScroll ? "e-mh-20" : ""}`}>
                    {
                        this.state.tabList.length ? this.state.tabList.map((d, i) =>
                            <div key={i} id={d.name} className={`e-tabs-item ${this.state.active === (i + 1) ? "active" : ""}`} onClick={() => { this.changeTabHandler(i + 1) }}>{d.label}</div>
                        ) : null
                    }
                </div>
            </div>
            <div className="e-tabs-bar" style={this.state.tabBarStyle}></div>
            <div className="e-tabs-content e-mt-10">
                {newArr}
            </div>
        </div>
    }
}
/**
 * @param className
 * @param active 当前打开选项卡
 * @param isScroll 是否有滚动
 * @param width  设置 选项卡宽度
 * @param theme 主题 line 线型、 card 卡片型、border 边框型
 */
Tabs.defaultProps = {
    className: "e-tabs",
    active: 1,
    isScroll: false,
    width: 0,
    theme: "line"
}

export class Tab extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const props = this.props;
        return <div className={`e-tab ${props.active ? "active" : ""}`}>{props.children}</div>
    }
}
/**
 * @param name 选项卡的唯一表示符 必填项
 */
Tab.defaultProps = {
    className: "e-tab",
    name: `tab-${new Date().getTime()}`
}