import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import "./../styles/main.scss";
import "./../styles/hapi.scss";
import Form, { FormItem } from "./../../components/ui/form/form.jsx";
import { ListItem } from "./../../components/ui/comboBox/comboBox.jsx";
import Message from "./../../components/ui/message/message.jsx";
import { MessageBox } from "./../../components/ui/modal/modal.jsx";
import CheckBox from "./../../components/ui/checkBox/checkBox.jsx";
import CheckBoxGroup from "./../../components/ui/checkBoxGroup/checkBoxGroup.jsx";
import RadioBox from "./../../components/ui/radioBox/radioBox.jsx";
import RadioBoxGroup from "./../../components/ui/radioBoxGroup/radioBoxGroup.jsx";
import Switch from "./../../components/ui/switch/switch.jsx";
import Button from "./../../components/ui/button/button.jsx";
import Select from "./../../components/ui/select/select.jsx";
import TextBox from "./../../components/ui/textBox/textBox.jsx";
import TextArea from "./../../components/ui/textArea/textArea.jsx";
class Home extends Component {
    constructor(props) {
        super(props)
    }
    /**
     * @desc 表单提交
     */
    submit() {
        // if (this.refs.formRef.reportValidity.valid) {
            const val = this.refs.formRef.value;
            new Message().success(JSON.stringify(val))
        // }
    }
    pass() {

    }
    
    unpass() {

    }

    render() {
        return <div className="e-home">
            <h2 className="hapi_title">哈皮狗 HTTP模拟测试工具</h2>
            <div className="e-section-demo">
                <Form ref="formRef">
                    <span className="e-mr-1 e-font-bold hapi_label">entityId:</span>
                    <FormItem name="entityRef"
                        placeholder="请输入entityId"
                        required>
                        <TextBox name="entityId" />
                    </FormItem>
                    <br />
                    <span className="e-mr-1 e-font-bold hapi_label">店铺名称:</span>
                    <FormItem name="nameRef"
                        placeholder="请输入店铺名称"
                        required>
                        <TextBox name="name" />
                    </FormItem>
                </Form>
                <div>
                    <span className="e-mr-1 e-font-bold hapi_label">&nbsp;</span>
                    <Button className="e-mt-10 e-button-primary" onClick={this.submit.bind(this)}>审核</Button>
                    <Button className="e-ml-10" onClick={this.pass.bind(this)}>审核通过</Button>
                    <Button className="e-ml-10" onClick={this.unpass.bind(this)}>审核失败</Button>
                </div>
            </div>
        </div>
    }
}
const containerNode = document.getElementById('root');
render(<Home></Home>, containerNode);

function ajax() {
    
}