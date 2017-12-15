import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import "./../styles/main.scss";
import TextBox from "./../../components/ui/textBox/textBox.jsx";
import TextArea from "./../../components/ui/textArea/textArea.jsx";
import Select from "./../../components/ui/select/select.jsx";
import { ListItem } from "./../../components/ui/comboBox/comboBox.jsx";
import Button from "./../../components/ui/button/button.jsx";
class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }

    }
    componentDidMount() {
        console.log("this is componentDidMount");
        console.log(this.props.children);
    }

    componentWillUnmount() {
        console.log("this is componentWillUnmount");
        clearInterval(this.timerId)
    }
    changeHandle(event) {
        // console.log("%c this is change" + event.target.value, "color: #2196f3")
    }
    inputHandle(event) {
        // console.log("%c This is inputHandle event:" + event.target.value, "color: #ff4949")
    }
    clickHandle(event) {
        // console.log("this is click", event)
    }
    focusHandle(event) {
        // console.log("this is focus", event)
    }
    blurHandle(event) {
        // console.log("this is blur", event)
    }
    /**
     * @desc 文本框提交
     */
    textBoxHandleSubmit() {
        const val = this.refs.textBoxRef.value()
        this.setState({
            textBoxRef: val
        })
    }
    /**
     * @desc 文本域提交
     */
    textAreaHandleSubmit() {
        const val = this.refs.textAreaRef.value()
        this.setState({
            textAreaRef: val
        })
    }
    /**
     * @desc 下拉菜单选项
     */
    selectHandleSubmit() {

    }
    render() {
        return (
            <div className="e-container">
                <h1 className="e-container-title">{this.props.name}</h1>
                <h2 className="e-container-subtitle">* UI组件</h2>
                <h4 className="e-container-subsubtitle">1. 按钮组件 button</h4>
                <section className="e-section-container">
                    <h4>按钮 normal</h4>
                    <div className="e-section-demo">
                        <Button className="e-mr-1rem e-button-default">默认</Button>
                        <Button className="e-mr-1rem e-button-primary">正常</Button>
                        <Button className="e-mr-1rem e-button-light">线条</Button>
                    </div>
                    <h4>按钮 small</h4>
                    <div className="e-section-demo">
                        <Button className="e-mr-1rem e-button-default e-button-small">默认</Button>
                        <Button className="e-mr-1rem e-button-primary e-button-small">正常</Button>
                        <Button className="e-mr-1rem e-button-light e-button-small">线条</Button>
                    </div>
                    <h4>按钮 larger</h4>
                    <div className="e-section-demo">
                        <Button className="e-mr-1rem e-button-default e-button-large">默认</Button>
                        <Button className="e-mr-1rem e-button-primary e-button-large">正常</Button>
                        <Button className="e-mr-1rem e-button-light e-button-large">线条</Button>
                    </div>
                </section>
                <h4 className="e-container-subsubtitle">2. 表单组件 form</h4>
                <section className="e-section-container">
                    <h4>文本框</h4>
                    <div className="e-section-demo">
                        <TextBox ref="textBoxRef" name="textBoxRef" onChange={this.changeHandle} onClick={this.clickHandle}
                            placeholder="请输入"
                            onFocus={this.focusHandle} onBlur={this.blurHandle} onInput={this.inputHandle} />
                        <Button className="e-ml-1rem" onClick={this.textBoxHandleSubmit.bind(this)}>提交</Button>
                        <span className="e-ph-1rem">{this.state.textBoxRef}</span>
                        <br />
                    </div>
                    <h4>文本域</h4>
                    <div className="e-section-demo">
                        <TextArea ref="textAreaRef" name="textAreaRef" onChange={this.changeHandle} onClick={this.clickHandle}
                            defaultValue="默认文本"
                            onFocus={this.focusHandle} onBlur={this.blurHandle}></TextArea>
                        <Button className="e-ml-1rem" onClick={this.textAreaHandleSubmit.bind(this)}>提交</Button>
                        <span className="e-ph-1rem">{this.state.textAreaRef}</span>
                    </div>
                    <h4>下拉框</h4>
                    <div className="e-section-demo">
                        <Select ref="selectRef" name="selectRef"className="123">
                            <ListItem value={1}>下拉项 一</ListItem>
                            <ListItem value={2}>下拉项 二</ListItem>
                            <ListItem value={3}>下拉项 三</ListItem>
                        </Select>
                        <Button className="e-ml-1rem" onClick={this.selectHandleSubmit.bind(this)}>提交</Button>
                        <span className="e-ph-1rem">{this.state.selectRef}</span>
                    </div>
                </section>
            </div>
        )
    }
}
Container.propTypes = {
    name: PropTypes.oneOf(["demo", "2"])
}
Container.defaultProps = {
    name: "demo"
}
render(<Container></Container>, document.getElementById('root'));