import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { unique, closest } from "./../control/control.jsx";
import CheckBox from "./../checkBox/checkBox.jsx";
import "./tree.scss";

export default class Tree extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const props = this.props;
        return <div className={unique(`e-tree ${props.className}`.split(" ")).join(" ")}>
            <TreeGroup
                showCheckBox={props.showCheckBox}
                handleCheckChange={props.handleCheckChange}
                data={props.data}
            ></TreeGroup>
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
        this.state = {
            children: props.data,
            allSelect: false,
            selectedId: -1
        }
    }
    /**
     * @desc 更新树群组选项状态
     * @param {*} id 当前TreeNode的id
     * @param {*} _treeNodeChecked  选中状态
     * @param _parent 父级
     */
    updateTreeGroup(id, _treeNodeChecked) {
        let newChildren = [];
        const props = this.props;
        if (!props.data.length) return;
        for (const item of this.state.children) {
            if ((typeof item.id === "number" ? +id : id) === item.id) {
                item["checked"] = _treeNodeChecked;
                // 判断是否有子集
                if (item.children && item.children.length) {
                    for (const _item of item.children) {
                        _item.checked = _item.disabled ? _item.checked : _treeNodeChecked;
                    }
                }
            } else {
                item["checked"] = (item.checked || false);
            }
            newChildren.push(item)
        }
        let allSelect = true;
        for (const item of newChildren) {
            if(!item.checked) {
                allSelect = false;
                break;
            }
        }
        this.setState({
            children: newChildren
        });
        props.parent && props.parent.setState({
            selectedId: props.parentId,
            allSelect: allSelect
        });
    }
    renderTreeNode(data, level) {
        if (!data || !data.length) return null;
        let children = [], index = 1;
        const props = this.props;
        const selectedId = this.state.selectedId;
        for (const item of data) {
            children.push(<TreeNode
                key={index}
                handleCheckChange={props.handleCheckChange}
                {...item}
                checked={item.id === selectedId ? this.state.allSelect : item.checked}
                value={item.id}
                label={item.label}
                showCheckBox={props.showCheckBox}
                parent={this}
                style={
                    {
                        padding: `0 ${8 * (level || 0)}px`
                    }
                }
                updateTreeGroup={(value, checked) => { this.updateTreeGroup(value, checked) }}
                children={item.children || []}
            >
            </TreeNode>);
            if (item.children) {
                children.push(<TreeGroup
                    key={`${index}-${index}`}
                    showCheckBox={props.showCheckBox}
                    handleCheckChange={props.handleCheckChange}
                    data={item.children}
                    parentId={item.id} // 当前树群的根节点（treenode）id
                    parent={this}
                    level={level + 1}
                ></TreeGroup>);
            }
            index++;
        }
        return children;
    }
    render() {
        const props = this.props;
        return <div
            className="e-tree_group"
        >
            {this.renderTreeNode(props.data, props.level || 0)}
        </div>
    }
}
export class TreeNode extends Component {
    constructor(props) {
        super(props);
    }
    /**
     * @desc 选择框change事件
     */
    handleCheckChange(event, vNode) {
        const checked = vNode.checked;
        const props = this.props;
        props.updateTreeGroup(vNode.value, checked);
        props.handleCheckChange && props.handleCheckChange(event, vNode);
    }
    toggleHandler(children) {
        if (this.props.disabled) return
        const _t = findDOMNode(this);
        const _group = closest(_t, ".e-tree_group");
        const _tree = closest(_t, ".e-tree");
        for (const node of _tree.querySelectorAll(".e-tree_node")) {
            node !== _t && (node.className = node.className.replace(/e-selected/, ""));
        }
        _t.className.indexOf("e-selected") > -1 ?
            _t.className = _t.className.replace(/e-selected/, "") :
            _t.classList.add("e-selected");
        for (const node of _group.children) {
            node.className.indexOf(".e-tree_node") > -1 && node !== _t && (node.className = node.className.replace(/active/, ""));
        }
        _t.className.indexOf("active") > -1 ?
            _t.className = _t.className.replace(/active/, "") :
            _t.classList.add("active");
        if (_t.nextElementSibling && children.length) {
            const nextNode = _t.nextElementSibling;
            nextNode.className.indexOf("collapsed") > 0 ?
                nextNode.className = nextNode.className.replace(/collapsed/, "") :
                nextNode.classList.add("collapsed");
            const display = _t.nextElementSibling.style.display;
            _t.nextElementSibling.style.display = display.indexOf("block") > -1 ? "none" : "block";
        }
    }
    render() {
        const props = this.props;
        const children = props.children;
        return <div
            className="e-tree_node"
            style={props.style}
        >
            {children.length ? <i
                className="e-tree_node_arrow e-mr-4 icon echoicon e-icon-more"
                onClick={event => { this.toggleHandler(children); }}
            ></i> : null}
            {props.showCheckBox ? <CheckBox
                disabled={props.disabled}
                value={props.id}
                checked={props.checked}
                onChange={(event, vNode) => { this.handleCheckChange(event, vNode) }}
            ></CheckBox> : null}
            <span
                onClick={event => { this.toggleHandler(children); }}
            >{props.label}</span>
        </div>
    }
}
TreeNode.defaultProps = {
    showCheckBox: false
}