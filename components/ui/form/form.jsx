import React, { Component } from "react"
import "./form.scss"
/**
 * @desc 表单
 */
export default class Form extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="e-form">
            {[this.props.children]}
        </div>
    }
}