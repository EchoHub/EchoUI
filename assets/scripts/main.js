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
import Form, { FormItem } from "./../../components/ui/form/form.jsx";
import Button from "./../../components/ui/button/button.jsx";
import Alert from "./../../components/ui/alert/alert.jsx";
import Message from "./../../components/ui/message/message.jsx";
import { MessageBox } from "./../../components/ui/modal/modal.jsx";
class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            formValue: {}
        }

    }
    componentDidMount() {
        console.log("this is componentDidMount");
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
        const val = this.refs.radioBoxRef.value
        this.setState({
            radioBoxGroupRefValue: val
        })
    }
    /**
     * @desc 多选框
     */
    checkBoxHandleSubmit() {
        const val = this.refs.checkBoxRef.value
        this.setState({
            checkBoxGroupRefValue: val ? val.join(",") : ""
        })
    }
    /**
     * @desc 文本框提交
     */
    textBoxHandleSubmit() {
        const val = this.refs.textBoxRef.value
        this.setState({
            textBoxRefValue: val
        })
    }
    /**
     * @desc 文本域提交
     */
    textAreaHandleSubmit() {
        const val = this.refs.textAreaRef.value
        this.setState({
            textAreaRefValue: val
        })
    }
    /**
     * @desc 下拉菜单选项
     */
    selectHandleSubmit() {
        const val = this.refs.selectRef.value
        const text = this.refs.selectRef.text
        this.setState({
            selectRefValue: `${text}: ${val}`
        })
    }
    /**
     * @desc 表单提交
     */
    formHandleSubmit() {
        if (this.refs.formRef.reportValidity.valid) {
            const val = this.refs.formRef.value;
            console.log("表单提交的内容是：", val)
            // this.setState({
            //     formRefValue: val
            // })
        }
    }
    /**
     * @desc 表单赋值
     */
    setFormValue() {
        this.setState({
            formValue: {
                selectRef: 1,
                radioBoxRef: ["banana"],
                checkBoxRef: ["banana", "pear"],
                textBoxRef: "你猜～～～",
                textAreaRef: "好吃啊～～～"
            }
        })
    }

    /**
     * @desc message 全局提示
     */
    msgHandle(type) {
        const message = new Message;
        switch (type) {
            case "default":
                message.default("Default Message");
                break;
            case "primary":
                message.info("Info Message");
                break;
            case "success":
                message.success("Success Message");
                break;
            case "warning":
                message.warning("Warning Message");
                break;
            case "error":
                message.error("Error Message");
                break;
        }
    }
    /**
     * @desc modal 对话框
     */
    modalHandle(type, theme, activeMask, dragable) {
        const messageBox = new MessageBox;
        switch (type) {
            case "show":
                messageBox.show({
                    title: "Modal Title",
                    content: "Modal Content",
                    icon: theme
                });
                break;
            case "alert":
                messageBox.alert("Alert Title", "Alert Content", theme, {
                    activeMask: activeMask,
                    dragable: dragable
                });
                break;
            case "confirm":
                messageBox.confirm("Confirm Title", "Confirm Content", null, theme, () => {
                    messageBox.alert("Ok Title", "Ok Content", "info");
                }, () => {
                    messageBox.alert("Cancel Title", "Cancel Content", "info");
                }, {
                    activeMask: activeMask, 
                    dragable: dragable
                });
                break;
        }
    }
    render() {
        return (
            <div className="e-container">
                <header className="e-header">
                    <div className="e-row">
                        <h1 className="logo">ECHO</h1>
                    </div>
                </header>
                <div className="e-main-wrapper">
                    <div className="e-main-menu">
                        <div className="e-main-menu-nav">
                            <div className="e-main-aside-nav-title">UI组件 <span className="e-aside-nav-title-tip">(UI Components)</span></div>
                            <div className="e-main-aside-nav-subtitle">通用 <span className="e-aside-nav-title-tip">General</span></div>
                            <ul className="e-main-aside">
                                <li><a href="#e-button">按钮 Button</a></li>
                            </ul>
                            <div className="e-main-aside-nav-subtitle">表单 <span className="e-aside-nav-title-tip">Form</span></div>
                            <ul className="e-main-aside">
                                <li><a href="#e-checkbox">多选框 CheckBox</a></li>
                                <li><a href="#e-checkbox">多选框组 CheckBoxGroup</a></li>
                                <li><a href="#e-form">表单 Form</a></li>
                                <li><a href="#e-input">输入框 Input</a></li>
                                <li><a href="#e-select">计数器 InputNumber</a></li>
                                <li><a href="#e-multiselect">多选下拉框 MultiSelect</a></li>
                                <li><a href="#e-radio">单选框 Radio</a></li>
                                <li><a href="#e-radio">单选框组 RadioGroup</a></li>
                                <li><a href="#e-select">下拉框 Select</a></li>
                                <li><a href="#e-suggest">带模糊查询的下拉框 Suggest</a></li>
                                <li><a href="#e-timerpicker">时间选择框 TimePicker</a></li>
                            </ul>
                            <div className="e-main-aside-nav-subtitle">通知 <span className="e-aside-nav-title-tip">Notice</span></div>
                            <ul className="e-main-aside">
                                <li><a href="#e-alert">警告 Alert</a></li>
                                <li><a href="#e-message">消息提示 Message</a></li>
                                <li><a href="#e-modal">对话框 Modal</a></li>
                                <li><a href="#e-notification">通知提醒框 Notification</a></li>
                                <li><a href="#e-tooltip">文字提示 ToolTip</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="e-main-container">
                        <h2 className="e-container-subtitle">UI组件</h2>
                        <fieldset className="e-fieldset">
                            <legend className="e-container-subsubtitle">按钮 button</legend>
                            <section className="e-section-container">
                                <h4 className="e-section-container-title" id="e-button">按钮 Button Normal</h4>
                                <div className="e-section-demo">
                                    <Button className="e-mr-1rem e-button-default">默认</Button>
                                    <Button className="e-mr-1rem e-button-primary">正常</Button>
                                    <Button className="e-mr-1rem e-button-success">成功</Button>
                                    <Button className="e-mr-1rem e-button-warning">警告</Button>
                                    <Button className="e-mr-1rem e-button-error">错误</Button>
                                    <Button className="e-mr-1rem e-button-light">线条</Button>
                                </div>
                                <h4 className="e-section-container-title">按钮 Button Smaller</h4>
                                <div className="e-section-demo">
                                    <Button className="e-mr-1rem e-button-default e-button-small">默认</Button>
                                    <Button className="e-mr-1rem e-button-primary e-button-small">正常</Button>
                                    <Button className="e-mr-1rem e-button-success e-button-small">正常</Button>
                                    <Button className="e-mr-1rem e-button-warning e-button-small">警告</Button>
                                    <Button className="e-mr-1rem e-button-error e-button-small">错误</Button>
                                    <Button className="e-mr-1rem e-button-light e-button-small">线条</Button>
                                </div>
                                <h4 className="e-section-container-title">按钮 Button Larger</h4>
                                <div className="e-section-demo">
                                    <Button className="e-mr-1rem e-button-default e-button-large">默认</Button>
                                    <Button className="e-mr-1rem e-button-primary e-button-large">正常</Button>
                                    <Button className="e-mr-1rem e-button-success e-button-large">正常</Button>
                                    <Button className="e-mr-1rem e-button-warning e-button-large">警告</Button>
                                    <Button className="e-mr-1rem e-button-error e-button-large">错误</Button>
                                    <Button className="e-mr-1rem e-button-light e-button-large">线条</Button>
                                </div>
                            </section>
                        </fieldset>
                        <fieldset className="e-fieldset">
                            <legend className="e-container-subsubtitle">表单 form</legend>
                            <section className="e-section-container">
                                <h4 className="e-section-container-title" id="e-radio">单选框 RadioBox</h4>
                                <div className="e-section-demo">
                                    <RadioBoxGroup name="radioBoxRef" ref="radioBoxRef">
                                        <RadioBox value="apple">苹果</RadioBox>
                                        <RadioBox value="banana">香蕉</RadioBox>
                                        <RadioBox value="pear">梨子</RadioBox>
                                        <RadioBox value="grape">葡萄</RadioBox>
                                    </RadioBoxGroup>
                                    {/* <Button className="e-ml-1rem" onClick={this.radioBoxHandleSubmit.bind(this)}>提交</Button> */}
                                    <span className="e-ph-1rem">{this.state.radioBoxGroupRefValue}</span>
                                    <br />
                                </div>
                                <h4 className="e-section-container-title" id="e-checkbox">多选框 CheckBox</h4>
                                <div className="e-section-demo">
                                    <CheckBoxGroup name="checkBoxRef" ref="checkBoxRef">
                                        <CheckBox value="apple">苹果</CheckBox>
                                        <CheckBox value="banana">香蕉</CheckBox>
                                        <CheckBox value="pear">梨子</CheckBox>
                                        <CheckBox value="grape">葡萄</CheckBox>
                                    </CheckBoxGroup>
                                    {/* <Button className="e-ml-1rem" onClick={this.checkBoxHandleSubmit.bind(this)}>提交</Button> */}
                                    <span className="e-ph-1rem">{this.state.checkBoxGroupRefValue}</span>
                                    <br />
                                </div>
                                <h4 className="e-section-container-title" id="e-input">文本框 TextBox</h4>
                                <div className="e-section-demo">
                                    <TextBox ref="textBoxRef" name="textBoxRef" onChange={this.changeHandle} onClick={this.clickHandle}
                                        placeholder="请输入"
                                        onFocus={this.focusHandle} onBlur={this.blurHandle} onInput={this.inputHandle} />
                                    {/* <Button className="e-ml-1rem" onClick={this.textBoxHandleSubmit.bind(this)}>提交</Button> */}
                                    <span className="e-ph-1rem">{this.state.textBoxRefValue}</span>
                                    <br />
                                </div>
                                <h4 className="e-section-container-title" id="e-textarea">文本域 TextArea</h4>
                                <div className="e-section-demo">
                                    <TextArea ref="textAreaRef" name="textAreaRef" onChange={this.changeHandle} onClick={this.clickHandle}
                                        defaultValue="默认文本"
                                        onFocus={this.focusHandle} onBlur={this.blurHandle}></TextArea>
                                    {/* <Button className="e-ml-1rem" onClick={this.textAreaHandleSubmit.bind(this)}>提交</Button> */}
                                    <span className="e-ph-1rem">{this.state.textAreaRefValue}</span>
                                </div>
                                <h4 className="e-section-container-title" id="e-select">下拉框 Select</h4>
                                <div className="e-section-demo">
                                    <Select ref="selectRef" name="selectRef" className="formSelect">
                                        <ListItem value={1}>下拉项 一</ListItem>
                                        <ListItem value={2}>下拉项 二</ListItem>
                                        <ListItem value={3}>下拉项 三</ListItem>
                                    </Select>
                                    {/* <Button className="e-ml-1rem" onClick={this.selectHandleSubmit.bind(this)}>提交</Button> */}
                                    <span className="e-ph-1rem">{this.state.selectRefValue}</span>
                                </div>
                                <h4 className="e-section-container-title" id="e-form">表单 Form</h4>
                                <div className="e-section-demo">
                                    <Form ref="formRef" value={this.state.formValue}>
                                        <h6>1.你经常吃水果吗？</h6>
                                        <FormItem name="selectRef"
                                            placeholder="请选择"
                                            required>
                                            <Select>
                                                <ListItem value={1}>是</ListItem>
                                                <ListItem value={0}>否</ListItem>
                                            </Select>
                                        </FormItem>
                                        <h6>2.哪个水果更好吃？</h6>
                                        <FormItem name="radioBoxRef" required>
                                            <RadioBoxGroup>
                                                <RadioBox value="apple">苹果</RadioBox>
                                                <RadioBox value="banana">香蕉</RadioBox>
                                            </RadioBoxGroup>
                                        </FormItem>
                                        <h6>3.你喜欢哪些水果？</h6>
                                        <FormItem name="checkBoxRef" required>
                                            <CheckBoxGroup>
                                                <CheckBox value="apple">苹果</CheckBox>
                                                <CheckBox value="banana">香蕉</CheckBox>
                                                <CheckBox value="pear">梨子</CheckBox>
                                                <CheckBox value="grape">葡萄</CheckBox>
                                            </CheckBoxGroup>
                                        </FormItem>
                                        <h6>4.你最喜欢吃的水果是什么？</h6>
                                        <FormItem name="textBoxRef"
                                            pattern={/\S{1,10}/g}
                                            patternMessage="请输入非空字符"
                                            placeholder="请输入"
                                            required>
                                            <TextBox />
                                        </FormItem>
                                        <h6>5.你为什么最喜欢吃？</h6>
                                        <FormItem name="textAreaRef"
                                            pattern={/^\S{1,10}$/g}
                                            patternMessage="字符数长度不可大于10个字符"
                                            defaultValue="因为好吃啊!!!"
                                            required>
                                            <TextArea></TextArea>
                                        </FormItem>
                                    </Form>
                                    <Button className="e-ml-1rem" onClick={this.setFormValue.bind(this)}>赋值</Button>
                                    <Button className="e-ml-1rem" onClick={this.formHandleSubmit.bind(this)}>提交</Button>
                                    <span className="e-ph-1rem">{this.state.formRefValue}</span>
                                </div>
                            </section>
                        </fieldset>
                        <fieldset className="e-fieldset">
                            <legend className="e-container-subsubtitle">通知 Notice</legend>
                            <section className="e-section-container">
                                <h4 className="e-section-container-title" id="e-alert">警告框 Alert</h4>
                                <div className="e-section-demo">
                                    <div className="e-row">
                                        <div className="e-col">
                                            <Alert className="e-mr-10">Default Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" theme="primary">Primary Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" theme="success">Success Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" theme="error">Error Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" theme="warning">Warning Description</Alert>
                                        </div>
                                    </div>
                                </div>
                                <div className="e-section-demo e-mt-10">
                                    <div className="e-row">
                                        <div className="e-col">
                                            <Alert className="e-mr-10" title="Default Alert">Default Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" title="Primary Alert" theme="primary">Primary Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" title="Success Alert" theme="success">Success Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" title="Error Alert" theme="error">Error Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" title="Warning Alert" theme="warning">Warning Description</Alert>
                                        </div>
                                    </div>

                                </div>
                                <div className="e-section-demo e-mt-10">
                                    <div className="e-row">
                                        <div className="e-col">
                                            <Alert className="e-mr-10" title="Default Alert" close>Default Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" title="Primary Alert" theme="primary" close>Primary Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" title="Success Alert" theme="success" close>Success Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" title="Error Alert" theme="error" close>Error Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" title="Warning Alert" theme="warning" close>Warning Description</Alert>
                                        </div>
                                    </div>
                                </div>
                                <div className="e-section-demo">
                                    <div className="e-row e-mt-10">
                                        <div className="e-col">
                                            <Alert className="e-mr-10" title="Default Alert" flag="default" close>Default Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" title="Primary Alert" flag="primary" theme="primary" close>Primary Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" title="Success Alert" flag="success" theme="success" close>Success Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" title="Error Alert" flag="error" theme="error" close>Error Description</Alert>
                                        </div>
                                        <div className="e-col">
                                            <Alert className="e-mr-10" title="Warning Alert" flag="warning" theme="warning" close>Warning Description</Alert>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="e-section-container-title" id="e-message">全局提示 Message</h4>
                                <div className="e-section-demo e-mt-10">
                                    <div className="e-row">
                                        <div className="e-col e-mr-1rem"><Button onClick={this.msgHandle.bind(null, "default")}>默认提示</Button></div>
                                        <div className="e-col e-mr-1rem"><Button className="e-button-primary" onClick={this.msgHandle.bind(null, "primary")}>消息提示</Button></div>
                                        <div className="e-col e-mr-1rem"><Button className="e-button-success" onClick={this.msgHandle.bind(null, "success")}>成功提示</Button></div>
                                        <div className="e-col e-mr-1rem"><Button className="e-button-warning" onClick={this.msgHandle.bind(null, "warning")}>警告提示</Button></div>
                                        <div className="e-col e-mr-1rem"><Button className="e-button-error" onClick={this.msgHandle.bind(null, "error")}>错误提示</Button></div>
                                    </div>
                                </div>
                                <h4 className="e-section-container-title" id="e-modal">对话框 Modal</h4>
                                <div className="e-section-demo e-mt-10">
                                    <div className="e-row">
                                        <div className="e-col e-mr-1rem"><Button className="e-button-default" onClick={this.modalHandle.bind(null, "alert", "default")}>Default Show</Button></div>
                                        <div className="e-col e-mr-1rem"><Button className="e-button-primary" onClick={this.modalHandle.bind(null, "alert", "primary")}>Info Show</Button></div>
                                        <div className="e-col e-mr-1rem"><Button className="e-button-success" onClick={this.modalHandle.bind(null, "alert", "success")}>Success Show</Button></div>
                                        <div className="e-col e-mr-1rem"><Button className="e-button-warning" onClick={this.modalHandle.bind(null, "alert", "warning")}>Warning Show</Button></div>
                                        <div className="e-col e-mr-1rem"><Button className="e-button-error" onClick={this.modalHandle.bind(null, "alert", "error")}>Error Show</Button></div>
                                    </div>
                                </div>
                                <div className="e-section-demo e-mt-10">
                                    <div className="e-row">
                                        <div className="e-col e-mr-1rem"><Button className="e-button-default" onClick={this.modalHandle.bind(null, "confirm", "default")}>Default Confirm</Button></div>
                                        <div className="e-col e-mr-1rem"><Button className="e-button-primary" onClick={this.modalHandle.bind(null, "confirm", "primary")}>Info Confirm</Button></div>
                                        <div className="e-col e-mr-1rem"><Button className="e-button-success" onClick={this.modalHandle.bind(null, "confirm", "success")}>Success Confirm</Button></div>
                                        <div className="e-col e-mr-1rem"><Button className="e-button-warning" onClick={this.modalHandle.bind(null, "confirm", "warning")}>Warning Confirm</Button></div>
                                        <div className="e-col e-mr-1rem"><Button className="e-button-error" onClick={this.modalHandle.bind(null, "confirm", "error")}>Error Confirm</Button></div>
                                    </div>
                                </div>
                                <div className="e-section-demo e-mt-10">
                                    <div className="e-row">
                                        <div className="e-col e-mr-1rem"><Button className="e-button-default" onClick={this.modalHandle.bind(null, "alert", "default", false)}>No mask</Button></div>
                                        <div className="e-col e-mr-1rem"><Button className="e-button-primary" onClick={this.modalHandle.bind(null, "confirm", "primary", false, true)}>Dragable</Button></div>
                                    </div>
                                </div>
                            </section>
                        </fieldset>
                    </div>
                </div>
            </div>
        )
    }
}
Container.propTypes = {
    name: PropTypes.oneOf(["echo", "x-echo"])
}
Container.defaultProps = {
    name: "echo"
}
const containerNode = document.getElementById('root');
render(<Container></Container>, containerNode);