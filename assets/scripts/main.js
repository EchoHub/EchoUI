import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import "./../styles/main.scss";
import Button from "./../../components/ui/button/button.jsx";
import RadioBox from "./../../components/ui/radioBox/radioBox.jsx";
import RadioBoxGroup from "./../../components/ui/radioBoxGroup/radioBoxGroup.jsx";
import CheckBox from "./../../components/ui/checkBox/checkBox.jsx";
import CheckBoxGroup from "./../../components/ui/checkBoxGroup/checkBoxGroup.jsx";
import TextBox from "./../../components/ui/textBox/textBox.jsx";
import TextArea from "./../../components/ui/textArea/textArea.jsx";
import Switch from "./../../components/ui/switch/switch.jsx";
import Select from "./../../components/ui/select/select.jsx";
import { ListItem } from "./../../components/ui/comboBox/comboBox.jsx";
import Form, { FormItem } from "./../../components/ui/form/form.jsx";
import NavMenu, { MenuItem, MenuItemTitle, MenuItemList, MenuItemFlag, SubMenu } from "./../../components/ui/navMenu/navMenu.jsx";
import Tabs, { Tab } from "./../../components/ui/tabs/tabs.jsx";
import BreadCrumb, { BreadCrumbItem } from "./../../components/ui/breadCrumb/breadCrumb.jsx";
import DropDown, { DropDownItem } from "./../../components/ui/dropDown/dropDown.jsx";
import Steps, { Step } from "./../../components/ui/steps/steps.jsx";
import Alert from "./../../components/ui/alert/alert.jsx";
import Message from "./../../components/ui/message/message.jsx";
import { MessageBox } from "./../../components/ui/modal/modal.jsx";
import { Notice } from "./../../components/ui/notification/notification.jsx";
class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            formValue: {},
            switchStatus: "开",
            switchTheme: "black",
            inlineCollapsed: false,
            curStep: 2,
            isFinishStep: false
        }

    }
    componentDidMount() {
        document.body.onscroll = () => {
            const menu = document.body.querySelector(".e-main-menu");
            const _menuTop = menu.offsetTop;
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop > _menuTop - 30) menu.style.position = "fixed";
        }
    }

    componentWillUnmount() {
        console.log("this is componentWillUnmount");
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
     * @desc switch 开关change事件
     */
    changeSwitchValue(event, vNode) {
        this.setState({
            switchStatus: vNode.value ? "开" : "关"
        });
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
     * @desc navmenu 展开收起
     */
    collpaseNavMenuHandler() {
        this.setState({
            inlineCollapsed: !this.state.inlineCollapsed
        });
    }
    /**
     * @desc navmenu 换肤
     */
    changeSwitchTheme(event, vNode) {
        this.setState({
            switchTheme: vNode.value ? "black" : "default"
        });
    }
    /**
     * @desc 步骤条
     * @param type 0 pre 1 next
     */
    stepNextHandler(type) {
        this.setState({
            isFinishStep: type === 1 && this.state.curStep === 4 ? true : false
        });
        this.setState({
            curStep: type ?
                (
                    this.state.curStep === 4 ?
                        4 : this.state.curStep + 1
                )
                :
                (
                    this.state.curStep === 1 ?
                        1 : this.state.isFinishStep ? this.state.curStep : this.state.curStep - 1
                )
        });
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
                    icon: theme,
                    activeMask: typeof activeMask === "boolean" ? activeMask : false,
                    dragable: typeof dragable === "boolean" ? dragable : false
                });
                break;
            case "alert":
                messageBox.alert("Alert Title", "Alert Content", theme, {
                    activeMask: typeof activeMask === "boolean" ? activeMask : true,
                    dragable: typeof dragable === "boolean" ? dragable : false
                });
                break;
            case "confirm":
                messageBox.confirm("Confirm Title", "Confirm Content", null, theme, () => {
                    messageBox.alert("Ok Title", "Ok Content", "info");
                }, null, {
                        activeMask: typeof activeMask === "boolean" ? activeMask : true,
                        dragable: typeof dragable === "boolean" ? dragable : false
                    });
                break;
        }
    }
    /**
     * @desc notification 通知 
     */
    notificationHandle(theme, autoClose) {
        const notice = new Notice
        switch (theme) {
            case "info":
                notice.info({
                    title: "Info Title",
                    content: "Info Description",
                    autoClose: autoClose
                })
                break;
            case "success":
                notice.success({
                    title: "Success Title",
                    content: "Success Description",
                    autoClose: autoClose
                })
                break;
            case "warning":
                notice.warning({
                    title: "Warning Title",
                    content: "Warning Description",
                    autoClose: autoClose
                })
                break;
            case "error":
                notice.error({
                    title: "Error Title",
                    content: "Error Description",
                    autoClose: autoClose
                })
                break;
            default:
                notice.show({
                    title: "Default Title",
                    content: `Default DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault Description
                    Default DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault Description
                    Default DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault Description
                    Default DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault DescriptionDefault Description
                    `,
                    theme: theme,
                    autoClose: autoClose
                })
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
                                <li><a href="#e-input">输入框 Input</a></li>
                                <li><a href="#e-input">计数器 InputNumber</a></li>
                                <li><a href="#e-radio">单选框 Radio</a></li>
                                <li><a href="#e-radio">单选框组 RadioGroup</a></li>
                                <li><a href="#e-switch">开关 Switch</a></li>
                                <li><a href="#e-select">下拉框 Select</a></li>
                                <li><a href="#e-select">带模糊查询的下拉框 Suggest</a></li>
                                <li><a href="#e-select">多选下拉框 MultiSelect</a></li>
                                <li><a href="#e-select">联级选择器 Cascader</a></li>
                                <li><a href="#e-form">表单 Form</a></li>
                                <li><a href="#e-timerpicker">时间选择框 TimePicker</a></li>
                            </ul>
                            <div className="e-main-aside-nav-subtitle">导航 <span className="e-aside-nav-title-tip">Navigation</span></div>
                            <ul className="e-main-aside">
                                <li><a href="#e-navmenu">导航菜单 NavMenu</a></li>
                                <li><a href="#e-tabs">标签页 Tabs</a></li>
                                <li><a href="#e-breadcrumb">面包屑 BreadCrumb</a></li>
                                <li><a href="#e-dropdown">下拉菜单 DropDown</a></li>
                                <li><a href="#e-steps">步骤条 Steps</a></li>
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
                                <p className="e-section-intro"><b>按钮</b>：用户的即时操作，响应用户的点击行为的组件。 PS：主要分为正常、小型、大型三类按钮</p>
                                <div className="e-section-demo">
                                    <div className="e-clear">
                                        <Button className="e-m-4   e-button-default e-button-small">Default</Button>
                                        <Button className="e-m-4   e-button-primary e-button-small">Primary</Button>
                                        <Button className="e-m-4   e-button-success e-button-small">Success</Button>
                                        <Button className="e-m-4   e-button-warning e-button-small">Warning</Button>
                                        <Button className="e-m-4   e-button-error e-button-small">Error</Button>
                                        <Button className="e-m-4   e-button-light e-button-small">Light</Button>
                                    </div>
                                    <div className="e-clear">
                                        <Button className="e-m-4   e-button-default">Default</Button>
                                        <Button className="e-m-4   e-button-primary">Primary</Button>
                                        <Button className="e-m-4   e-button-success">Success</Button>
                                        <Button className="e-m-4   e-button-warning">Warning</Button>
                                        <Button className="e-m-4   e-button-error">Error</Button>
                                        <Button className="e-m-4   e-button-light">Light</Button>
                                    </div>
                                    <div className="e-clear">
                                        <Button className="e-m-4   e-button-default e-button-large">Default</Button>
                                        <Button className="e-m-4   e-button-primary e-button-large">Primary</Button>
                                        <Button className="e-m-4   e-button-success e-button-large">Success</Button>
                                        <Button className="e-m-4   e-button-warning e-button-large">Warning</Button>
                                        <Button className="e-m-4   e-button-error e-button-large">Error</Button>
                                        <Button className="e-m-4   e-button-light e-button-large">Light</Button>
                                    </div>
                                </div>
                            </section>
                        </fieldset>
                        <fieldset className="e-fieldset">
                            <legend className="e-container-subsubtitle">表单 form</legend>
                            <section className="e-section-container">
                                <h4 className="e-section-container-title" id="e-radio">单选框 RadioBox</h4>
                                <p className="e-section-intro"><b>单选框</b>：多个备选项中选取一个备选项，常和 RadioBoxGroup 一起使用。</p>
                                <div className="e-section-demo">
                                    <RadioBoxGroup name="radioBoxRef" ref="radioBoxRef">
                                        <RadioBox value="apple">苹果</RadioBox>
                                        <RadioBox value="banana">香蕉</RadioBox>
                                        <RadioBox value="pear">梨子</RadioBox>
                                        <RadioBox value="grape">葡萄</RadioBox>
                                    </RadioBoxGroup>
                                    <span className="e-ph-1rem">{this.state.radioBoxGroupRefValue}</span>
                                    <br />
                                </div>
                                <h4 className="e-section-container-title" id="e-checkbox">多选框 CheckBox</h4>
                                <p className="e-section-intro"><b>多选框</b>：多个备选项中选取任意个备选项，常和 CheckBoxGroup 一起使用。</p>
                                <div className="e-section-demo">
                                    <CheckBoxGroup name="checkBoxRef" ref="checkBoxRef">
                                        <CheckBox value="apple">苹果</CheckBox>
                                        <CheckBox value="banana">香蕉</CheckBox>
                                        <CheckBox value="pear">梨子</CheckBox>
                                        <CheckBox value="grape">葡萄</CheckBox>
                                    </CheckBoxGroup>
                                    <span className="e-ph-1rem">{this.state.checkBoxGroupRefValue}</span>
                                    <br />
                                </div>
                                <h4 className="e-section-container-title" id="e-switch">开关 Switch</h4>
                                <p className="e-section-intro"><b>开关</b>：开关选择器，表示开关状态／两种状态之间的切换。</p>
                                <div className="e-section-demo">
                                    <h5 className="e-section-demo-title">1.基本用法</h5>
                                    <Switch
                                        className="e-switch"
                                        name="switchRef"
                                        ref="switchRef"
                                        defaultChecked
                                        onChange={(event, vNode) => { this.changeSwitchValue(event, vNode) }}></Switch>
                                    <span className="e-ph-1rem">{this.state.switchStatus}</span>
                                    <h5 className="e-section-demo-title">2.不可用状态</h5>
                                    <Switch
                                        className="e-switch"
                                        name="switchRef"
                                        ref="switchRef"
                                        disabled
                                    >
                                    </Switch>
                                    <h5 className="e-section-demo-title">3.带文字和图标</h5>
                                    <Switch
                                        className="e-switch"
                                        name="switchRef"
                                        ref="switchRef"
                                        content={{ true: 1, false: 0 }}
                                    >
                                    </Switch>
                                    <h5 className="e-section-demo-title">4.不同尺寸</h5>
                                    <Switch
                                        className="e-switch e-m-4"
                                        name="switchRef"
                                        ref="switchRef"
                                        defaultChecked
                                        size="small"
                                    >
                                    </Switch>
                                    <Switch
                                        className="e-switch"
                                        name="switchRef"
                                        ref="switchRef"
                                        defaultChecked
                                        size="large"
                                    >
                                    </Switch>
                                </div>
                                <h4 className="e-section-container-title" id="e-input">输入框 Input</h4>
                                <p className="e-section-intro"><b>输入框</b>：表单中文本域内容输入的组件。</p>
                                <div className="e-section-demo">
                                    <div className="e-clear">
                                        <TextBox ref="textBoxRef" name="textBoxRef" onChange={this.changeHandle} onClick={this.clickHandle}
                                            placeholder="请输入"
                                            onFocus={this.focusHandle} onBlur={this.blurHandle} onInput={this.inputHandle} />
                                    </div>
                                    <div className="e-clear e-mt-10">
                                        <TextArea ref="textAreaRef" name="textAreaRef" onChange={this.changeHandle} onClick={this.clickHandle}
                                            defaultValue="默认文本"
                                            onFocus={this.focusHandle} onBlur={this.blurHandle}></TextArea>
                                    </div>
                                </div>
                                <h4 className="e-section-container-title" id="e-select">下拉框 Select</h4>
                                <p className="e-section-intro"><b>下拉框</b>：提供一个下拉菜单，为用户提供选择操作。 PS：包含单选、多选、联级、带模糊查询的选择器。</p>
                                <div className="e-section-demo">
                                    <div className="e-clear">
                                        <Select ref="selectRef" name="selectRef" className="formSelect">
                                            <ListItem value={1}>下拉项 一</ListItem>
                                            <ListItem value={2}>下拉项 二</ListItem>
                                            <ListItem value={3}>下拉项 三</ListItem>
                                        </Select>
                                    </div>
                                </div>
                                <h4 className="e-section-container-title" id="e-form">表单 Form</h4>
                                <p className="e-section-intro"><b>表单</b>：具有数据收集、校验和提交功能的表单。 PS：包含复选框、单选框、输入框、下拉选择框等元素。</p>
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
                                    <Button className="e-button-primary e-mt-10" onClick={this.setFormValue.bind(this)}>赋值</Button>
                                    <Button className="e-ml-1rem e-mt-10" onClick={this.formHandleSubmit.bind(this)}>提交</Button>
                                </div>
                            </section>
                        </fieldset>
                        <fieldset className="e-fieldset">
                            <legend className="e-container-subsubtitle">导航</legend>
                            <section className="e-section-container">
                                <h4 className="e-section-container-title" id="e-navmenu">导航菜单 NavMenu</h4>
                                <p className="e-section-intro"><b>导航菜单</b>：为页面和功能提供导航的菜单列表。</p>
                                <div className="e-section-demo">
                                    <section>
                                        <h5 className="e-section-demo-title">1.垂直菜单， 内嵌子菜单</h5>
                                        <div className="e-flex">
                                            <NavMenu>
                                                <MenuItem show>
                                                    <MenuItemTitle>导航一</MenuItemTitle>
                                                    <MenuItemList>
                                                        <MenuItemFlag>分栏一</MenuItemFlag>
                                                        <MenuItem>菜单 1</MenuItem>
                                                        <MenuItem>菜单 2</MenuItem>
                                                        <MenuItemFlag>分栏二</MenuItemFlag>
                                                        <MenuItem>菜单 1</MenuItem>
                                                        <MenuItem>菜单 2</MenuItem>
                                                        <SubMenu show>
                                                            <MenuItemTitle>菜单</MenuItemTitle>
                                                            <MenuItemList>
                                                                <MenuItem>子菜单 1</MenuItem>
                                                                <MenuItem>子菜单 2</MenuItem>
                                                            </MenuItemList>
                                                        </SubMenu>
                                                    </MenuItemList>
                                                </MenuItem>
                                                <MenuItem show>
                                                    <MenuItemTitle>导航二</MenuItemTitle>
                                                    <MenuItemList>
                                                        <MenuItem>子菜单 1</MenuItem>
                                                        <MenuItem>子菜单 2</MenuItem>
                                                    </MenuItemList>
                                                </MenuItem>
                                                <MenuItem>导航三</MenuItem>
                                                <MenuItem>导航四</MenuItem>
                                            </NavMenu>
                                        </div>
                                    </section>
                                    <section>
                                        <h5 className="e-section-demo-title">2.垂直菜单，可折叠</h5>
                                        <Button className="e-mv-10 icon iconfont icon-collapse e-button-primary" onClick={event => { this.collpaseNavMenuHandler() }}></Button>
                                        <div className="e-flex">
                                            <NavMenu
                                                inlineCollapsed={this.state.inlineCollapsed}
                                            >
                                                <MenuItem icon={"icon-all"} show>
                                                    <MenuItemTitle>导航一</MenuItemTitle>
                                                    <MenuItemList>
                                                        <MenuItemFlag>分栏一</MenuItemFlag>
                                                        <MenuItem>菜单 1</MenuItem>
                                                        <MenuItem>菜单 2</MenuItem>
                                                        <MenuItemFlag>分栏二</MenuItemFlag>
                                                        <MenuItem>菜单 1</MenuItem>
                                                        <MenuItem>菜单 2</MenuItem>
                                                        <SubMenu show>
                                                            <MenuItemTitle>菜单</MenuItemTitle>
                                                            <MenuItemList>
                                                                <MenuItem>子菜单 1</MenuItem>
                                                                <MenuItem>子菜单 2</MenuItem>
                                                            </MenuItemList>
                                                        </SubMenu>
                                                    </MenuItemList>
                                                </MenuItem>
                                                <MenuItem icon={"icon-all"}>
                                                    <MenuItemTitle>导航二</MenuItemTitle>
                                                    <MenuItemList>
                                                        <MenuItem>子菜单 1</MenuItem>
                                                        <MenuItem>子菜单 2</MenuItem>
                                                    </MenuItemList>
                                                </MenuItem>
                                                <MenuItem >导航三</MenuItem>
                                                <MenuItem icon={"icon-all"}>导航四</MenuItem>
                                            </NavMenu>
                                        </div>
                                    </section>
                                    {/* <section>
                                        <h5 className="e-section-demo-title">3.垂直菜单，子菜单为弹出形式</h5>
                                        <Switch className="e-mv-10"></Switch>
                                        <div className="e-flex">
                                            <NavMenu className="e-clearfix">
                                                <MenuItem show>
                                                    <MenuItemTitle>导航一</MenuItemTitle>
                                                    <MenuItemList>
                                                        <MenuItemFlag>分栏一</MenuItemFlag>
                                                        <MenuItem>菜单 1</MenuItem>
                                                        <MenuItem>菜单 2</MenuItem>
                                                        <MenuItemFlag>分栏二</MenuItemFlag>
                                                        <MenuItem>菜单 1</MenuItem>
                                                        <MenuItem>菜单 2</MenuItem>
                                                        <SubMenu show>
                                                            <MenuItemTitle>菜单</MenuItemTitle>
                                                            <MenuItemList>
                                                                <MenuItem>子菜单 1</MenuItem>
                                                                <MenuItem>子菜单 2</MenuItem>
                                                            </MenuItemList>
                                                        </SubMenu>
                                                    </MenuItemList>
                                                </MenuItem>
                                                <MenuItem>
                                                    <MenuItemTitle>导航二</MenuItemTitle>
                                                    <MenuItemList>
                                                        <MenuItem>子菜单 1</MenuItem>
                                                        <MenuItem>子菜单 2</MenuItem>
                                                    </MenuItemList>
                                                </MenuItem>
                                                <MenuItem>导航三</MenuItem>
                                                <MenuItem>导航四</MenuItem>
                                            </NavMenu>
                                        </div>
                                    </section> */}
                                    <section>
                                        <h5 className="e-section-demo-title">4.换肤</h5>
                                        <Switch
                                            className="e-mv-10"
                                            defaultChecked
                                            content={{ true: "黑色", false: "白色" }}
                                            onChange={(event, vNode) => { this.changeSwitchTheme(event, vNode) }}
                                        ></Switch>
                                        <div className="e-flex">
                                            <NavMenu className="e-clearfix" theme={this.state.switchTheme}>
                                                <MenuItem show>
                                                    <MenuItemTitle>导航一</MenuItemTitle>
                                                    <MenuItemList>
                                                        <MenuItemFlag>分栏一</MenuItemFlag>
                                                        <MenuItem>菜单 1</MenuItem>
                                                        <MenuItem>菜单 2</MenuItem>
                                                        <MenuItemFlag>分栏二</MenuItemFlag>
                                                        <MenuItem>菜单 1</MenuItem>
                                                        <MenuItem>菜单 2</MenuItem>
                                                        <SubMenu show>
                                                            <MenuItemTitle>菜单</MenuItemTitle>
                                                            <MenuItemList>
                                                                <MenuItem>子菜单 1</MenuItem>
                                                                <MenuItem>子菜单 2</MenuItem>
                                                            </MenuItemList>
                                                        </SubMenu>
                                                    </MenuItemList>
                                                </MenuItem>
                                                <MenuItem>
                                                    <MenuItemTitle>导航二</MenuItemTitle>
                                                    <MenuItemList>
                                                        <MenuItem>子菜单 1</MenuItem>
                                                        <MenuItem>子菜单 2</MenuItem>
                                                    </MenuItemList>
                                                </MenuItem>
                                                <MenuItem>导航三</MenuItem>
                                                <MenuItem>导航四</MenuItem>
                                            </NavMenu>
                                        </div>
                                    </section>
                                </div>
                                <h4 className="e-section-container-title" id="e-tabs">标签页 Tabs</h4>
                                <p className="e-section-intro"><b>标签页</b>： 分隔内容上有关联但属于不同类别的数据集合。</p>
                                <div className="e-section-demo">
                                    <section>
                                        <h5 className="e-section-demo-title">1.基本用法：</h5>
                                        <Tabs className="e-tabs-basic" active={1}>
                                            <Tab name="tab1" label={"tab1"}>Tab1 Content  选项卡1 内容区域</Tab>
                                            <Tab name="tab2" label={"tab2"}>Tab2 Content  选项卡2 内容区域</Tab>
                                            <Tab name="tab3" label={"tab3"}>Tab3 Content  选项卡3 内容区域</Tab>
                                            <Tab name="tab4" label={"tab4"}>Tab4 Content  选项卡4 内容区域</Tab>
                                        </Tabs>
                                        <h5 className="e-section-demo-title">2.设置滚动（isScroll）：</h5>
                                        <Tabs className="e-tabs-basic" active={1} width={450} isScroll={true}>
                                            <Tab name="tab1" label={"tab1"}>Tab1 Content  选项卡1 内容区域</Tab>
                                            <Tab name="tab2" label={"tab2"}>Tab2 Content  选项卡2 内容区域</Tab>
                                            <Tab name="tab3" label={"tab3"}>Tab3 Content  选项卡3 内容区域</Tab>
                                            <Tab name="tab4" label={"tab4"}>Tab4 Content  选项卡4 内容区域</Tab>
                                            <Tab name="tab5" label={"tab5"}>Tab5 Content  选项卡5 内容区域</Tab>
                                            <Tab name="tab6" label={"tab6"}>Tab6 Content  选项卡6 内容区域</Tab>
                                            <Tab name="tab7" label={"tab7"}>Tab7 Content  选项卡7 内容区域</Tab>
                                            <Tab name="tab8" label={"tab8"}>Tab8 Content  选项卡8 内容区域</Tab>
                                        </Tabs>
                                        <h5 className="e-section-demo-title">3.设置主题（theme: line、border、card）：</h5>
                                        <Tabs className="e-tabs-basic" active={1} width={550} isScroll={true} theme={"border"}>
                                            <Tab name="tab1" label={"border1"}>Tab1 Content  边框主题</Tab>
                                            <Tab name="tab2" label={"border2"}>Tab2 Content  边框主题</Tab>
                                            <Tab name="tab3" label={"border3"}>Tab3 Content  边框主题</Tab>
                                            <Tab name="tab4" label={"border4"}>Tab4 Content  边框主题</Tab>
                                            <Tab name="tab5" label={"border5"}>Tab5 Content  边框主题</Tab>
                                            <Tab name="tab6" label={"border6"}>Tab6 Content  边框主题</Tab>
                                            <Tab name="tab7" label={"border7"}>Tab7 Content  边框主题</Tab>
                                            <Tab name="tab8" label={"border8"}>Tab8 Content  边框主题</Tab>
                                        </Tabs>
                                        <Tabs className="e-tabs-basic e-mv-10" active={1} width={450} isScroll={true} theme={"card"}>
                                            <Tab name="tab1" label={"card1"}>Tab1 Content  卡片主题</Tab>
                                            <Tab name="tab2" label={"card2"}>Tab2 Content  卡片主题</Tab>
                                            <Tab name="tab3" label={"card3"}>Tab3 Content  卡片主题</Tab>
                                            <Tab name="tab4" label={"card4"}>Tab4 Content  卡片主题</Tab>
                                            <Tab name="tab5" label={"card5"}>Tab5 Content  卡片主题</Tab>
                                        </Tabs>
                                    </section>
                                </div>
                                <h4 className="e-section-container-title" id="e-breadcrumb">面包屑 BreadCrumb</h4>
                                <p className="e-section-intro"><b>面包屑</b>：显示当前页面在系统层级结构中的位置，并能向上返回。</p>
                                <div className="e-section-demo">
                                    <section>
                                        <h5 className="e-section-demo-title">1.基本用法</h5>
                                        <div className="e-mh-10">
                                            <BreadCrumb >
                                                <BreadCrumbItem path="#e-breadcrumb">首页</BreadCrumbItem>
                                                <BreadCrumbItem path="#e-breadcrumb">一级标题</BreadCrumbItem>
                                                <BreadCrumbItem path="#e-breadcrumb">二级标题</BreadCrumbItem>
                                                <BreadCrumbItem>三级标题</BreadCrumbItem>
                                            </BreadCrumb>
                                        </div>
                                        <h5 className="e-section-demo-title">2.自定义分隔符</h5>
                                        <div className="e-mh-10">
                                            <h6>例 1: separator 设置为 “ > ” ：</h6>
                                            <BreadCrumb separator={">"}>
                                                <BreadCrumbItem path="#e-breadcrumb">首页</BreadCrumbItem>
                                                <BreadCrumbItem path="#e-breadcrumb">一级标题</BreadCrumbItem>
                                                <BreadCrumbItem path="#e-breadcrumb">二级标题</BreadCrumbItem>
                                                <BreadCrumbItem>三级标题</BreadCrumbItem>
                                            </BreadCrumb>
                                            <h6>例 2: separator 设置为 “ | ” ：</h6>
                                            <BreadCrumb separator={"|"}>
                                                <BreadCrumbItem path="#e-breadcrumb">首页</BreadCrumbItem>
                                                <BreadCrumbItem path="#e-breadcrumb">一级标题</BreadCrumbItem>
                                                <BreadCrumbItem path="#e-breadcrumb">二级标题</BreadCrumbItem>
                                                <BreadCrumbItem>三级标题</BreadCrumbItem>
                                            </BreadCrumb>
                                        </div>
                                        <h5 className="e-section-demo-title">3.自定义图标</h5>
                                        <div className="e-mh-10">
                                            <BreadCrumb>
                                                <BreadCrumbItem icon={"icon-home"} path="#e-breadcrumb">首页</BreadCrumbItem>
                                                <BreadCrumbItem icon={"icon-user"} path="#e-breadcrumb">一级标题</BreadCrumbItem>
                                                <BreadCrumbItem icon={"icon-setting"} path="#e-breadcrumb">二级标题</BreadCrumbItem>
                                                <BreadCrumbItem>三级标题</BreadCrumbItem>
                                            </BreadCrumb>
                                        </div>
                                    </section>
                                </div>
                                <h4 className="e-section-container-title" id="e-dropdown">拉下菜单 DropDown</h4>
                                <p className="e-section-intro"><b>拉下菜单</b>：向下弹出的列表。当页面中操作项太多时，可以运用此组件将用户操作放到下拉菜单中。</p>
                                <div className="e-section-demo">
                                    <section>
                                        <h5 className="e-section-demo-title">1.基本用法</h5>
                                        <div className="e-mh-10">
                                            <DropDown menu={
                                                [
                                                    {
                                                        item: {
                                                            key: 1, name: "1st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 2, name: "2st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 3, name: "3st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 4, name: "4st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 5, name: "5st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 6, name: "6st menu item"
                                                        }
                                                    }
                                                ]
                                            }>
                                                Hover me
                                            </DropDown>
                                        </div>
                                        <h5 className="e-section-demo-title">2.多级菜单</h5>
                                        <div className="e-mh-10">
                                            <DropDown multiple menu={
                                                [
                                                    {
                                                        subMenu: {
                                                            name: "1st submenu",
                                                            menu: [
                                                                {
                                                                    key: 1, name: "1st menu item", disabled: true
                                                                },
                                                                {
                                                                    key: 2, name: "2st submenu item"
                                                                },
                                                                {
                                                                    key: 3, name: "3st submenu item"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 2, name: "2st menu item"
                                                        }
                                                    },
                                                    {
                                                        subMenu: {
                                                            name: "3st submenu",
                                                            menu: [
                                                                {
                                                                    subMenu: {
                                                                        name: "3st submenu",
                                                                        menu: [
                                                                            {
                                                                                key: 1, name: "1st menu item"
                                                                            },
                                                                            {
                                                                                key: 2, name: "2st submenu item"
                                                                            },
                                                                            {
                                                                                key: 3, name: "3st submenu item"
                                                                            }
                                                                        ]
                                                                    }
                                                                },
                                                                {
                                                                    key: 2, name: "2st submenu item"
                                                                },
                                                                {
                                                                    key: 3, name: "3st submenu item"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        subMenu: {
                                                            name: "4st submenu",
                                                            menu: [
                                                                {
                                                                    subMenu: {
                                                                        name: "4st submenu",
                                                                        menu: [
                                                                            {
                                                                                subMenu: {
                                                                                    name: "4st submenu",
                                                                                    disabled: true,
                                                                                    menu: [
                                                                                        {
                                                                                            key: 1, name: "1st menu item"
                                                                                        },
                                                                                        {
                                                                                            key: 2, name: "2st submenu item"
                                                                                        },
                                                                                        {
                                                                                            key: 3, name: "3st submenu item"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            },
                                                                            {
                                                                                key: 2, name: "2st submenu item"
                                                                            },
                                                                            {
                                                                                key: 3, name: "3st submenu item"
                                                                            }
                                                                        ]
                                                                    }
                                                                },
                                                                {
                                                                    key: 2, name: "2st submenu item"
                                                                },
                                                                {
                                                                    key: 3, name: "3st submenu item"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 5, name: "5st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 6, name: "6st menu item"
                                                        }
                                                    }
                                                ]
                                            }>
                                                Hover me
                                            </DropDown>
                                        </div>
                                        <h5 className="e-section-demo-title">3.状态 disabled 设置禁用状态</h5>
                                        <div className="e-mh-10">
                                            <DropDown menu={
                                                [
                                                    {
                                                        item: {
                                                            key: 1, name: "1st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 2, name: "2st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 3, name: "3st menu item", disabled: true
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 4, name: "4st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 5, name: "5st menu item", disabled: true
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 6, name: "6st menu item"
                                                        }
                                                    }
                                                ]
                                            }>
                                                Hover me
                                            </DropDown>
                                        </div>
                                        <h5 className="e-section-demo-title">3.触发方式， Hover／Click 触发</h5>
                                        <div className="e-mh-10">
                                            <DropDown className="e-mr-10" menu={
                                                [
                                                    {
                                                        item: {
                                                            key: 1, name: "1st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 2, name: "2st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 3,
                                                            name: "3st menu item",
                                                            disabled: true
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 4, name: "4st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 5,
                                                            name: "5st menu item",
                                                            disabled: true
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 6, name: "6st menu item"
                                                        }
                                                    }
                                                ]
                                            }>
                                                Hover me
                                            </DropDown>
                                            <DropDown type="click" menu={
                                                [
                                                    {
                                                        item: {
                                                            key: 1, name: "1st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 2, name: "2st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 3, name: "3st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 4, name: "4st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 5, name: "5st menu item"
                                                        }
                                                    },
                                                    {
                                                        item: {
                                                            key: 6, name: "6st menu item"
                                                        }
                                                    }
                                                ]
                                            }>
                                                Click me
                                            </DropDown>
                                        </div>
                                    </section>
                                </div>
                                <h4 className="e-section-container-title" id="e-steps">步骤条 Steps</h4>
                                <p className="e-section-intro"><b>步骤条</b>：引导用户按照流程完成任务的分步导航条。</p>
                                <div className="e-section-demo">
                                    <section>
                                        <h5 className="e-section-demo-title">1.基本用法</h5>
                                        <div className="e-mh-10">
                                            <h6>简单的步骤条：</h6>
                                            <Steps
                                                active={this.state.curStep}
                                                // space={200}
                                                finishStatus={this.state.isFinishStep}
                                            >
                                                <Step title={"Step 1"}></Step>
                                                <Step title={"Step 2"}></Step>
                                                <Step title={"Step 3"}></Step>
                                                <Step title={"Step 4"}></Step>
                                            </Steps>
                                            <Button className="e-button-primary e-mv-10" onClick={() => { this.stepNextHandler(0) }}>上一步</Button>
                                            <Button className="e-button-primary e-m-10" onClick={() => { this.stepNextHandler(1) }}>下一步</Button>
                                        </div>
                                        <h5 className="e-section-demo-title">2.有描述的步骤条</h5>
                                        <div className="e-mh-10">
                                            <h6>每一个步骤都有相应的步骤描述：</h6>
                                            <Steps
                                                active={2}
                                            // space={200}
                                            >
                                                <Step title={"Step 1"} description={"This is Step 1 Description"}></Step>
                                                <Step title={"Step 2"} description={"This is Step 2 Description"}></Step>
                                                <Step title={"Step 3"} description={"This is Step 3 Description"}></Step>
                                                <Step title={"Step 4"} description={"..."}></Step>
                                            </Steps>
                                        </div>
                                        <h5 className="e-section-demo-title">3.自定义图标的步骤条</h5>
                                        <div className="e-mh-10">
                                            <h6>每一个步骤都可以自定义图标（目前只支持组件库本身提供的icon class）：</h6>
                                            <Steps
                                                active={2}
                                                space={200}
                                            >
                                                <Step icon={"icon-user"} title={"BaseInfo"} description={"ba la ba la ...ba la ba la ...ba la ba la ...ba la ba la ...ba la ba la ...ba la ba la ...ba la ba la ..."}></Step>
                                                <Step icon={"icon-car"} title={"CarInfo"} description={"ba la ba la ..."}></Step>
                                                <Step icon={"icon-home"} title={"HouseInfo"} description={"ba la ba la ..."}></Step>
                                                <Step icon={"icon-family"} title={"FamilyInfo"} description={"ba la ba la ..."}></Step>
                                            </Steps>
                                        </div>
                                        <h5 className="e-section-demo-title">4.垂直步骤条</h5>
                                        <div className="e-mh-10">
                                            <h6>垂直方向的步骤条：</h6>
                                            <Steps
                                                active={3}
                                                type={"vertical"}
                                            >
                                                <Step icon={"icon-user"} title={"BaseInfo"} description={"ba la ba la ..."}></Step>
                                                <Step icon={"icon-car"} title={"CarInfo"} description={"ba la ba la ..."}></Step>
                                                <Step icon={"icon-home"} title={"HouseInfo"} description={"ba la ba la ..."}></Step>
                                                <Step icon={"icon-family"} title={"FamilyInfo"} description={"ba la ba la ..."}></Step>
                                            </Steps>
                                        </div>
                                    </section>
                                </div>
                            </section>
                        </fieldset>
                        <fieldset className="e-fieldset">
                            <legend className="e-container-subsubtitle">通知 Notice</legend>
                            <section className="e-section-container">
                                <h4 className="e-section-container-title" id="e-alert">警告框 Alert</h4>
                                <p className="e-section-intro"><b>操作提示</b>：各种类型的操作提示，多用于表单操作。 PS：有三种可选配置： 默认配置、带关闭按钮、带图标</p>
                                <div className="e-section-demo">
                                    <div className="e-clear">
                                        <div className="e-row">
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10">Default Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" theme="primary">Primary Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" theme="success">Success Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" theme="error">Error Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" theme="warning">Warning Description</Alert>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="e-clear e-mt-10">
                                        <div className="e-row">
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" title="Default Alert">Default Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" title="Primary Alert" theme="primary">Primary Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" title="Success Alert" theme="success">Success Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" title="Error Alert" theme="error">Error Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" title="Warning Alert" theme="warning">Warning Description</Alert>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="e-clear e-mt-10">
                                        <div className="e-row">
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" title="Default Alert" close>Default Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" title="Primary Alert" theme="primary" close>Primary Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" title="Success Alert" theme="success" close>Success Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" title="Error Alert" theme="error" close>Error Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" title="Warning Alert" theme="warning" close>Warning Description</Alert>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="e-clear e-mt-10">
                                        <div className="e-row">
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" title="Default Alert" flag="default" close>Default Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" title="Primary Alert" flag="primary" theme="primary" close>Primary Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" title="Success Alert" flag="success" theme="success" close>Success Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" title="Error Alert" flag="error" theme="error" close>Error Description</Alert>
                                            </div>
                                            <div className="e-col  e-mv-10">
                                                <Alert className="e-mr-10" title="Warning Alert" flag="warning" theme="warning" close>Warning Description</Alert>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="e-section-container-title" id="e-message">全局提示 Message</h4>
                                <p className="e-section-intro"><b>全局提示</b>：各种类型的全局消息提示，默认出现在窗口的顶层中间位置。</p>
                                <div className="e-section-demo">
                                    <div className="e-row">
                                        <div className="e-col e-m-4"><Button onClick={this.msgHandle.bind(null, "default")}>Default</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-primary" onClick={this.msgHandle.bind(null, "primary")}>Primary</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-success" onClick={this.msgHandle.bind(null, "success")}>Success</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-warning" onClick={this.msgHandle.bind(null, "warning")}>Warning</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-error" onClick={this.msgHandle.bind(null, "error")}>Error</Button></div>
                                    </div>
                                </div>
                                <h4 className="e-section-container-title" id="e-modal">对话框 Modal</h4>
                                <p className="e-section-intro"><b>消息提示</b>：各种类型的消息提示框，仅提供确认按钮关闭消息。</p>
                                <div className="e-section-demo">
                                    <div className="e-row">
                                        <div className="e-col e-m-4"><Button className="e-button-default" onClick={this.modalHandle.bind(null, "alert", "default")}>Default Show</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-primary" onClick={this.modalHandle.bind(null, "alert", "primary")}>Info Show</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-success" onClick={this.modalHandle.bind(null, "alert", "success")}>Success Show</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-warning" onClick={this.modalHandle.bind(null, "alert", "warning")}>Warning Show</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-error" onClick={this.modalHandle.bind(null, "alert", "error")}>Error Show</Button></div>
                                    </div>
                                </div>
                                <p className="e-section-intro"><b>消息确认框</b>：各种类型的消息确认框，提供确认/取消按钮用于消息确认／取消。</p>
                                <div className="e-section-demo">
                                    <div className="e-row">
                                        <div className="e-col e-m-4"><Button className="e-button-default" onClick={this.modalHandle.bind(null, "confirm", "default")}>Default Confirm</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-primary" onClick={this.modalHandle.bind(null, "confirm", "primary")}>Info Confirm</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-success" onClick={this.modalHandle.bind(null, "confirm", "success")}>Success Confirm</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-warning" onClick={this.modalHandle.bind(null, "confirm", "warning")}>Warning Confirm</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-error" onClick={this.modalHandle.bind(null, "confirm", "error")}>Error Confirm</Button></div>
                                    </div>
                                </div>
                                <p className="e-section-intro"><b>其他设置</b>：无遮罩模式（No Mask）／可拖拽模式(Dragable)。</p>
                                <div className="e-section-demo">
                                    <div className="e-row">
                                        <div className="e-col e-m-4"><Button className="e-button-default" onClick={this.modalHandle.bind(null, "alert", "default", false, false)}>No mask</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-primary" onClick={this.modalHandle.bind(null, "confirm", "primary", true, true)}>Dragable</Button></div>
                                    </div>
                                </div>
                                <h4 className="e-section-container-title" id="e-notification">通知 Notification</h4>
                                <p className="e-section-intro"><b>通知</b>：用于全局消息通知，悬浮出现在页面角。</p>
                                <div className="e-section-demo">
                                    <div className="e-row">
                                        <div className="e-col e-m-4"><Button className="e-button-default" onClick={this.notificationHandle.bind(null, "default", false)}>Default Show</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-primary" onClick={this.notificationHandle.bind(null, "info", false)}>Info Show</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-success" onClick={this.notificationHandle.bind(null, "success", false)}>Success Show</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-warning" onClick={this.notificationHandle.bind(null, "warning", true)}>Warning Show</Button></div>
                                        <div className="e-col e-m-4"><Button className="e-button-error" onClick={this.notificationHandle.bind(null, "error", true)}>Error Show</Button></div>
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