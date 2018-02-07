import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { unique } from "./../control/control.jsx";
import "./tree.scss";

export default class Tree extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="e-tree">
        </div>
    }
}
Tree.defaultProps = {
    className: "e-tree"
}
export class TreeNode extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="e-treenode">
        </div>
    }
}