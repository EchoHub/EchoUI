import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { unique, closest } from "./../control/control.jsx";
import "./rate.scss";
/**
 * @desc 评分
 */
export default class Rate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: props.score,
            staicScore: props.score,
            totalScore: props.total,
            units: props.units
        };
    }
    /** 
     * @desc 分数控制
    */
    scorehandler(event, behavor) {
        const _node = event.target;
        const _self = findDOMNode(this);
        const props = this.props;
        if (props.readOnly) {
            return;
        }
        switch (behavor) {
            case "over":
                for (const key in this.refs) {
                    const _item = this.refs[key];
                    if (_item === _node) {
                        const _index = +key.replace(/e-rateicon-/, "") + 1;
                        this.setState({
                            score: _index,
                            color: props.colors[_index < 3 ? 0 : _index === 3 ? 1 : 2] || props.colors[props.colors.length - 1]
                        });
                    }
                }
                break;
            case "leave":
                const staticScore = this.state.staicScore;
                const totalScore = this.state.totalScore;
                this.setState({
                    score: this.state.staicScore,
                    color: staticScore ?
                        (props.colors[staticScore < 3 ? 0 : staticScore === 3 ? 1 : 2] || props.colors[props.colors.length - 1]) :
                        null
                });
                break;
        }
    }
    componentDidMount() {
        this.setState({
            score: this.props.value
        });
    }
    render() {
        const props = this.props;
        const score = this.state.score;
        const totalScore = this.state.totalScore;

        const activeClassName = props.icons && props.icons.length ? props.icons[1] : "e-icon-favoritesfilling";
        const defaultClassName = props.icons && props.icons.length ? props.icons[0] : "e-icon-favorite";
        const texts = props.texts instanceof Array ? (props.texts || props.units) : props.units;
        return <div
            className={unique(`e-rate ${props.className}`.split(" ")).join(" ")}
            onMouseOver={event => { this.scorehandler(event, "over") }}
            onMouseLeave={event => { this.scorehandler(event, "leave") }}
        >
            {
                this.state.units.map((d, i) =>
                    <i
                        ref={`e-rateicon-${i}`}
                        key={i}
                        className={`e-mr-4 e-rateicon echoicon ${this.state.score > i ? `active ${activeClassName}` : defaultClassName}`}
                        style={
                            props.colors && props.colors.length && this.state.score > i ?
                                {
                                    color: this.state.color
                                } : null
                        }
                        onClick={() => {
                            // 点击选择分数
                            this.setState({
                                staicScore: i + 1
                            });
                        }}
                    ></i>
                )
            }
            {
                (props.readOnly || props.showText) ? <div className="e-rate-text">{
                    props.readOnly ?
                        props.value :
                        texts[Math.floor(this.state.score - 1)] || (this.state.score < 2 ? texts[0] : texts[texts.length - 1])
                }</div> : null
            }
        </div>
    }

    get value() {
        return this.state.staicScore
    }

    set value(v) {
        this.setState({
            score: v
        });
    }
}
/**
 * @param className 类名
 * @param score 分数
 * @param staicScore 选中的分数
 * @param totalScore 总分
 * @param colors 区分评分颜色 最多支持三种
 * @param showText 是否显示辅助文字
 * @param units 每个分数段对应的文字集合
 * @param readOnly 只读
 */
Rate.defaultProps = {
    className: "e-rate",
    score: 0,
    staicScore: 0,
    totalScore: 5,
    colors: [],
    showText: false,
    units: ["极差", "失望", "一般", "满意", "惊喜"],
    readOnly: false
}