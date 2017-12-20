import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import "./../styles/main.scss";
import RadioBox from "./../../components/ui/radioBox/radioBox.jsx";
import RadioBoxGroup from "./../../components/ui/radioBoxGroup/radioBoxGroup.jsx";
import CheckBox from "./../../components/ui/checkBox/checkBox.jsx";
import CheckBoxGroup from "./../../components/ui/checkBoxGroup/checkBoxGroup.jsx";
import TextBox from "./../../components/ui/textBox/textBox.jsx";
import TextArea from "./../../components/ui/textArea/textArea.jsx";
import Select from "./../../components/ui/select/select.jsx";
import { ListItem } from "./../../components/ui/comboBox/comboBox.jsx";
import Form from "./../../components/ui/form/form.jsx";
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
    /**
     * @desc 多选框 选择
     */
    cbSelectHandle(event) {

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
     * @desc 单选框
     */
    radioBoxHandleSubmit() {
        const val = this.refs.radioBoxRef.value()
        this.setState({
            radioBoxGroupRefValue: val
        })
    }
    /**
     * @desc 多选框
     */
    checkBoxHandleSubmit() {
        const val = this.refs.checkBoxRef.value()
        this.setState({
            checkBoxGroupRefValue: val ? val.join(",") : ""
        })
    }
    /**
     * @desc 文本框提交
     */
    textBoxHandleSubmit() {
        const val = this.refs.textBoxRef.value()
        this.setState({
            textBoxRefValue: val
        })
    }
    /**
     * @desc 文本域提交
     */
    textAreaHandleSubmit() {
        const val = this.refs.textAreaRef.value()
        this.setState({
            textAreaRefValue: val
        })
    }
    /**
     * @desc 下拉菜单选项
     */
    selectHandleSubmit() {
        const val = this.refs.selectRef.value()
        const text = this.refs.selectRef.text()
        this.setState({
            selectRefValue: `${text}: ${val}`
        })
    }
    /**
     * @desc 表单提交
     */
    formHandleSubmit() {
        const val = this.refs.formRef.value()
        this.setState({
            formRefValue: val
        })
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
                    <h4>单选框</h4>
                    <div className="e-section-demo">
                        <RadioBoxGroup ref="radioBoxRef">
                            <RadioBox name="radioBoxRef" value="apple">苹果</RadioBox>
                            <RadioBox name="radioBoxRef" value="banana">香蕉</RadioBox>
                            <RadioBox name="radioBoxRef" value="pear">梨子</RadioBox>
                            <RadioBox name="radioBoxRef" value="grape">葡萄</RadioBox>
                        </RadioBoxGroup>
                        <Button className="e-ml-1rem" onClick={this.radioBoxHandleSubmit.bind(this)}>提交</Button>
                        <span className="e-ph-1rem">{this.state.radioBoxGroupRefValue}</span>
                        <br />
                    </div>
                    <h4>多选框</h4>
                    <div className="e-section-demo">
                        <CheckBoxGroup ref="checkBoxRef">
                            <CheckBox name="checkBoxRef" value="apple">苹果</CheckBox>
                            <CheckBox name="checkBoxRef" value="banana">香蕉</CheckBox>
                            <CheckBox name="checkBoxRef" value="pear">梨子</CheckBox>
                            <CheckBox name="checkBoxRef" value="grape">葡萄</CheckBox>
                        </CheckBoxGroup>
                        <Button className="e-ml-1rem" onClick={this.checkBoxHandleSubmit.bind(this)}>提交</Button>
                        <span className="e-ph-1rem">{this.state.checkBoxGroupRefValue}</span>
                        <br />
                    </div>
                    <h4>文本框</h4>
                    <div className="e-section-demo">
                        <TextBox ref="textBoxRef" name="textBoxRef" onChange={this.changeHandle} onClick={this.clickHandle}
                            placeholder="请输入"
                            onFocus={this.focusHandle} onBlur={this.blurHandle} onInput={this.inputHandle} />
                        <Button className="e-ml-1rem" onClick={this.textBoxHandleSubmit.bind(this)}>提交</Button>
                        <span className="e-ph-1rem">{this.state.textBoxRefValue}</span>
                        <br />
                    </div>
                    <h4>文本域</h4>
                    <div className="e-section-demo">
                        <TextArea ref="textAreaRef" name="textAreaRef" onChange={this.changeHandle} onClick={this.clickHandle}
                            defaultValue="默认文本"
                            onFocus={this.focusHandle} onBlur={this.blurHandle}></TextArea>
                        <Button className="e-ml-1rem" onClick={this.textAreaHandleSubmit.bind(this)}>提交</Button>
                        <span className="e-ph-1rem">{this.state.textAreaRefValue}</span>
                    </div>
                    <h4>下拉框</h4>
                    <div className="e-section-demo">
                        <Select ref="selectRef" name="selectRef" className="123">
                            <ListItem value={1}>下拉项 一</ListItem>
                            <ListItem value={2}>下拉项 二</ListItem>
                            <ListItem value={3}>下拉项 三</ListItem>
                        </Select>
                        <Button className="e-ml-1rem" onClick={this.selectHandleSubmit.bind(this)}>提交</Button>
                        <span className="e-ph-1rem">{this.state.selectRefValue}</span>
                    </div>
                    <h4>表单</h4>
                    <div className="e-section-demo">
                        <Form ref="formRef">
                            <h6>1.你经常吃水果吗？</h6>
                            <div>
                                <Select name="selectRef" placeholder="请选择">
                                    <ListItem value={1}>是</ListItem>
                                    <ListItem value={0}>否</ListItem>
                                </Select>
                            </div>
                            <h6>2.哪个水果更好吃？</h6>
                            <div>
                                <RadioBoxGroup>
                                    <RadioBox name="radioBoxRef" value="apple">苹果</RadioBox>
                                    <RadioBox name="radioBoxRef" value="banana">香蕉</RadioBox>
                                </RadioBoxGroup>
                            </div>
                            <h6>3.你喜欢哪些水果？</h6>
                            <div>
                                <CheckBoxGroup ref="checkBoxRef">
                                    <CheckBox name="checkBoxRef" value="apple">苹果</CheckBox>
                                    <CheckBox name="checkBoxRef" value="banana">香蕉</CheckBox>
                                    <CheckBox name="checkBoxRef" value="pear">梨子</CheckBox>
                                    <CheckBox name="checkBoxRef" value="grape">葡萄</CheckBox>
                                </CheckBoxGroup>
                            </div>
                            <h6>4.你最喜欢吃的水果是什么？</h6>
                            <div>
                                <TextBox name="textBoxRef" placeholder="请输入" />
                            </div>
                            <h6>5.你为什么最喜欢吃？</h6>
                            <div>
                                <TextArea ref="textAreaRef" defaultValue="因为好吃啊!!!"></TextArea>
                            </div>

                        </Form>
                        <Button className="e-ml-1rem" onClick={this.formHandleSubmit.bind(this)}>提交</Button>
                        <span className="e-ph-1rem">{this.state.formRefValue}</span>
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