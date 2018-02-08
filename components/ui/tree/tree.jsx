import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { unique, closest } from "./../control/control.jsx";
import "./tree.scss";

export default class Tree extends Component {
    constructor(props) {
        super(props);
    }
    /**
     * 
     * @param data 数据List
     */
    renderGroup(data, level) {
        if (!data || !data.length) return null
        let nodes = []
        for (const item of data) {
            nodes.push(<TreeGroup key={item.id}>
                <TreeNode
                    value={item.id} label={item.label}
                    style={
                        {
                            padding: `0 ${8 * (level || 0)}px`
                        }
                    }
                    children={item.children || []}
                ></TreeNode>
                {
                    this.renderGroup(item.children, (level || 0) + 1)
                }
            </TreeGroup>);
        }
        return nodes
    }
    render() {
        const props = this.props;
        return <div className="e-tree">
            {this.renderGroup(props.data)}
        </div>
    }
}
Tree.defaultProps = {
    className: "e-tree",
    data: []
}
export class TreeGroup extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="e-tree_group">{this.props.children}
        </div>
    }
}
export class TreeNode extends Component {
    constructor(props) {
        super(props);
    }
    toggleHandler(children) {
        const _t = findDOMNode(this);
        const _tree = closest(_t, ".e-tree");
        for(const node of _tree.querySelectorAll(".e-tree_node")) {
            node !== _t && (node.className = node.className.replace(/active/, ""))
        }
        _t.className.indexOf("active") > 0 ? _t.className = _t.className.replace(/active/, "") : _t.classList.add("active");
        if(children.length) {
            const display = _t.nextElementSibling.style.display;
            _t.nextElementSibling.style.display = display !== "block" ? "block" : "none";
        }
    }
    render() {
        const props = this.props;
        const children = props.children
        return <div
            className="e-tree_node"
            style={props.style}
            onClick={() => { this.toggleHandler(children); }}
        >
            {children.length ? <i className="e-mr-4 icon echoicon e-icon-more"></i> : null}
            {props.label}
        </div>
    }
}