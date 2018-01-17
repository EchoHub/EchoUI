import React, { Component } from "react";
import "./modal.scss";
/**
 * @desc 模态框
 */
export default class Modal extends Component {
    constructor(props) {
        super(props)
        this.filterPropsHandle(props)
    }

    render() {
        return <div></div>
    }
}

Modal.defaultProps = {
    className: "e-modal"
}