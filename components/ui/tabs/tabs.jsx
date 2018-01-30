import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { unique } from "./../control/control.jsx";
import "./tabs.scss";

export default class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: []
        }
    }
    componentDidMount() {
        let newArr = [], tabList = [];
        const props = this.props;
        let index = 1;
        if (props.children.length) {
            for (const item of props.children) {
                switch (item.type && item.type.name) {
                    case "Tab":
                            tabList.push({
                                label: item.props.label,
                                name: `tab-${item.props.name !== undefined ? item.props.name : index}`
                            })
                            newArr.push(<Tab
                                key={index}
                                id={`panel-${item.props.name !== undefined ? item.props.name : index}`}
                                {...item.props}
                            ></Tab>);
                        index++;
                        break;
                    default:
                        break;
                }
            }

        }
        this.setState({
            tabList: tabList,
            children: newArr
        });
    }
    render() {
        const props = this.props;
        return <div className={unique(`e-tabs ${props.className}`.split(" ")).join(" ")}>
            <div className="e-tabs-tablist">
                {
                    this.state.tabList.length ? this.state.tabList.map((d, i) =>
                        <div key={i} id={d.name} className="e-tabs-item">{d.label}</div>
                    ) : null
                }
            </div>
            <div className="e-tabs-contenet">
                {props.children}
            </div>
        </div>
    }
}
Tabs.defaultProps = {
    className: "e-tabs"
}

export class Tab extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const props = this.props;
        return <div className="e-tab">{props.children}</div>
    }
}

Tab.defaultProps = {
    className: "e-tab"
}