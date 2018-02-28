import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { unique, closest } from "./../control/control.jsx";
import CheckBox from "./../checkBox/checkBox.jsx";
import "./tree.scss";
export default class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: null
        }
    }
    /**
     * @desc 获取选中的节点
     */
    getCheckedNodes() {

    }
    setCheckedNode(_checkedNode) {

    }
    render() {
        const props = this.props;
        let node = [], index = 1;
        if (props.children && props.children.length) {
            for (const item of props.children) {
                switch (item.type && item.type.name) {
                    case "TreeNode":
                        const _i_props = item.props;
                        node.push(<TreeNode
                            ref={`treenode-${index}`}
                            {...item.props}
                            key={"treenode" + index}
                            setCheckedNode={this.setCheckedNode}
                            checked={this.state.checked !== null ? this.state.checked : props.checked}
                            title={_i_props.title}
                            level={0}
                            showCheckBox={props.showCheckBox}
                            parent={this}
                        >
                            {_i_props.children}
                        </TreeNode>)
                        break;
                    default:
                        break;
                }
                index++;
            }
        }
        return <div className={unique(`e-tree ${props.className}`.split(" ")).join(" ")}>
            {node}
        </div>
    }
}
Tree.defaultProps = {
    className: "e-tree",
    allChecked: false // 是否全选
}

export class TreeNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            nodeState: false, // 当前节点下的子集是否全部被选中
            childrenChekcedList: [],
            checked: props.checked
        }
    }
    toggleHandler(event) {
        const arrow = this.refs.arrow;
        if (arrow) {
            !arrow.style.transform ?
                arrow.style.transform = "rotate(90deg)" :
                arrow.removeAttribute("style")
            this.setState({
                show: !this.state.show
            });
        }
    }
    handleCheckChange(event, vNode) {
        const refs = this.props.parent.refs;
        let checked = true, newChildren = [];
        for (const key in refs) {
            if (findDOMNode(refs[key]).className.indexOf("e-treenode") > -1) {
                if (refs[key] === this && !vNode.checked) {
                    checked = false;
                    break;
                } else if (refs[key] !== this && !refs[key].state.checked) {
                    checked = false;
                    break;
                }
            }
        }
        let childrenChekcedList = []
        for (const key in refs) {
            if (findDOMNode(refs[key]).className.indexOf("e-treenode") > -1) {
                childrenChekcedList.push(
                    refs[key] === this ?
                        vNode.checked :
                        refs[key].state.checked
                );
            }
        }
        this.props.parent.setState({
            childrenChekcedList: childrenChekcedList,
            checked: checked
        }, () => {
            this.setState({
                childrenChekcedList: []
            });
        });
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps) {
            this.setState({
                checked: nextProps.checked
            });
        }
    }
    render() {
        const props = this.props;
        const children = props.children ? props.children.length ? props.children : [props.children] : [];
        let node = [], index = 1;
        if (children.length) {
            for (const item of children) {
                switch (item.type && item.type.name) {
                    case "TreeNode":
                        const _i_props = item.props;
                        node.push(<TreeNode
                            ref={`treenode-${index}`}
                            {...item.props}
                            key={"treenode" + index}
                            setCheckedNode={this.setCheckedNode}
                            checked={
                                this.state.childrenChekcedList.length ?
                                    this.state.childrenChekcedList[index - 1] : this.state.checked
                            }
                            defaultChecked={props.disabled !== undefined ? props.defaultChecked : undefined}
                            title={_i_props.title}
                            level={props.level + 1}
                            showCheckBox={props.showCheckBox}
                            disabled={props.disabled !== undefined ? props.disabled : item.props.disabled}
                            parent={this}
                        >
                            {_i_props.children}
                        </TreeNode>);
                        break;
                    default:
                        node.push(item);
                        break;
                }
                index++;
            }
        }
        return <div className={unique(`e-tree_node ${props.className}`.split(" ")).join(" ")}>
            <div
                className="e-tree_node_title"
                style={{
                    paddingLeft: `${props.level * 20 + (!children.length ? 5 : 0)}px`
                }}
            >
                {children.length ? <i ref="arrow"
                    className="e-tree_node_arrow e-mr-4 icon echoicon e-icon-more"
                    onClick={() => { this.toggleHandler(); }}
                ></i> : null}
                {props.showCheckBox ? <CheckBox
                    disabled={props.disabled}
                    checked={props.disabled ? props.defaultChecked : this.state.checked}
                    onChange={(event, vNode) => { this.handleCheckChange(event, vNode) }}
                ></CheckBox> : null}
                <span onClick={() => { this.toggleHandler(); }}>{props.title}</span>
            </div>
            <div className={`e-tree_node_children${this.state.show ? " open" : ""}`}>{node}</div>
        </div>
    }
}
TreeNode.defaultProps = {
    className: "e-treenode"
}