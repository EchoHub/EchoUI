import React, { Component } from "react";
import { render, findDOMNode } from "react-dom";
import "./modal.scss";
import Button from "./../button/button.jsx";
/**
 * @desc 对话框
 */
export default class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dragable: false,
            _self: null,
            distX: 0,
            distY: 0
        }
    }

    componentDidMount() {
        const _selfElem = findDOMNode(this).querySelector(".e-modal");
        const _height = _selfElem.offsetHeight;
        const _width = _selfElem.offsetWidth;
        _selfElem.style.marginTop = -_height / 2 + "px"
        _selfElem.style.marginLeft = -_width / 2 + "px"
        this.setState({
            _self: _selfElem
        });
    }

    /**
     * @desc 开始拖动
     * @param {*} event 
     */
    dragStarthandle(event) {
        event.preventDefault();
        if (this.props.dragable) {
            this.state._self.style.cursor = "move"
            const x = event.clientX;
            const y = event.clientY;
            const _selfLeft = this.state._self.offsetLeft;
            const _selfTop = this.state._self.offsetTop;
            const distX = x - _selfLeft;
            const distY = y - _selfTop;
            this.setState({
                dragable: true,
                distX: distX,
                distY: distY
            });
            this.state._self.addEventListener('mousemove', this.dragMovehandle.bind(this), true);
            document.body.addEventListener('mousemove', this.dragMovehandle.bind(this), true)
            document.body.addEventListener('mouseup', this.dragEndhandle.bind(this), true);
        }
    }
    /**
     * @desc 拖动
     * @param {*} event 
     */
    dragMovehandle(event) {
        const x = event.clientX;
        const y = event.clientY;
        if (this.state.dragable) {
            this.state._self.style.marginTop = 0;
            this.state._self.style.marginLeft = 0;
            this.state._self.style.left = x - this.state.distX + "px";
            this.state._self.style.top = y - this.state.distY + "px";
        }
    }
    /**
    * @desc 结束拖动
    * @param {*} event 
    */
    dragEndhandle(event) {
        if (this.props.dragable) {
            this.setState({
                dragable: false,
                distX: 0,
                distY: 0
            });
            this.state._self.addEventListener('mousemove', null, true);
            document.body.addEventListener('mousemove', null, true);
            document.body.addEventListener('mouseup', null, true);
        }
    }

    /**
     * 
     * @param {*} isOk Boolean 用于判断 当前按钮操作是否是 确认按钮 true or false
     * @param {*} event 当前event
     */
    clickHandle(isOk, event) {
        if(isOk) {
            this.props.onOk ? this.props.onOk() : this.ok();
            return 
        }
        this.props.onCancel ? this.props.onCancel() : this.cancel()
    }

    ok(){
        findDOMNode(this).remove();
    }

    cancel() {
        findDOMNode(this).remove();
    }

    render() {
        return <div className={`e-modal-dialog${this.props.activeMask ? " e-modal-mask" : ""}`}>
            <div className="e-modal"
                onMouseDown={e => this.dragStarthandle(e)}
                onMouseMove={e => this.dragMovehandle(e)}
                onMouseUp={e => this.dragEndhandle(e)}>
                <div className={`e-modal-title ${this.props.icon || ""}`}>{
                    this.props.icon ? <span className={`e-modal-icon icon iconfont ${this.props.iconEnum[this.props.icon]}`}></span> : null
                } {this.props.title}</div>
                <div className="e-modal-content">{this.props.content}</div>
                {
                    this.props.buttons ? <div className="e-modal-buttons e-mt-10 e-text-right">
                        {
                            Object.keys(this.props.buttons).map((d, i) =>
                                <Button className={`e-button-small e-mr-4 ${this.props.buttons[d] ? this.props.icon : ""}`} key={d} onClick={e => {
                                    this.clickHandle(this.props.buttons[d], e)
                                }}>{d}</Button>
                            )
                        }
                    </div> : null
                }
            </div>
        </div>
    }
}

Modal.defaultProps = {
    className: "e-modal",
    activeMask: true,
    iconEnum: {
        "default": "icon iconfont icon-xunwen",
        "primary": "icon iconfont icon-xinxi",
        "success": "icon iconfont icon-success",
        "error": "icon iconfont icon-error",
        "warning": "icon iconfont icon-jinggao"
    },
    dragable: false
}

export class MessageBox {
    /**
     * @desc 打开一个弹窗
     */
    show(options) {
        this.createModal(options);
    }

    /**
     * @desc 提示框
     */
    alert(title, content, icon, ops) {
        const options = {
            title: title || "温馨提示",
            content: content,
            icon: icon,
            buttons: {确定: true},
            activeMask: ops? ops.activeMask : true,
            dragable: ops? ops.dragable : false,
        };
        this.createModal(options);
    }

    /**
     * @desc 确认框
     */
    confirm(title, content, buttons, icon, onOk, onCancel, ops) {
        const options = {
            title: title || "确认框",
            content: content,
            buttons: buttons || { 确认: true, 取消: false },
            icon: icon,
            onOk: onOk,
            onCancel: onCancel,
            activeMask: ops? ops.activeMask : true,
            dragable: ops? ops.dragable : false,
        };
        this.createModal(options);
    }

    /**
     * @desc 创建一个对话框
     */
    createModal(options) {
        const modalContianer = document.createElement("div");
        modalContianer.className = "e-modal-contianer";
        document.body.appendChild(modalContianer);
        render(<Modal {...options} container={modalContianer}></Modal>, modalContianer);
    }
}