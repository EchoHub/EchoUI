import React, { Component } from "react";
import { findDOMNode } from "react-dom";

export default class Steps extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="e-steps">
            {this.props.children}
        </div>
    }
}

/**
 * @param className
 * @param active
 * @param space
 * @param finish-status
 */
Steps.defaultProps = {
    className: "e-steps"
}

export class Step extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="e-step">
            {this.props.title}
        </div>
    }
}

/**
 * @param className
 * @param title
 * @param description
 */
Step.defaultProps = {
    className: "e-step",
    title: "",
    description: "",
}