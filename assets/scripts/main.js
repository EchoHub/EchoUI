import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import "./../styles/main.scss";
import TextBox from "./../../components/ui/textBox/textBox.jsx";
import TextArea from "./../../components/ui/textArea/textArea.jsx";
import Select from "./../../components/ui/select/select.jsx";
import { ListItem } from "./../../components/ui/comboBox/comboBox.jsx";
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

    tick() {
        // this.setState((prevState, props) => {
        //     console.log(prevState)
        //     console.log(props)
        // })
        this.setState({
            date: new Date()
        })
    }
    changeHandle(event) {
        console.log("%c this is change" + event.target.value, "color: #2196f3")
    }
    inputHandle(event) {
        console.log("%c This is inputHandle event:" + event.target.value, "color: #ff4949")
    }
    clickHandle(event) {
        console.log("this is click", event)
    }
    focusHandle(event) {
        console.log("this is focus", event)
    }
    blurHandle(event) {
        console.log("this is blur", event)
    }
    render() {
        return (
            <div className="e-container">
                <h1 className="e-container-title">{this.props.name}</h1>
                <h2 className="e-container-subtitle">* UI组件</h2>
                <h4 className="e-container-subsubtitle">1. 表单组件</h4>
                <section className="e-section-container">
                    <h4>文本框</h4>
                    <div className="e-section-demo">
                        <TextBox name="textBox" onChange={this.changeHandle} onClick={this.clickHandle}
                            onFocus={this.focusHandle} onBlur={this.blurHandle} onInput={this.inputHandle} />
                        <br />
                    </div>
                    <h4>文本域</h4>
                    <div className="e-section-demo">
                        <TextArea name="textarea" onChange={this.changeHandle} onClick={this.clickHandle}
                            onFocus={this.focusHandle} onBlur={this.blurHandle}></TextArea>
                    </div>
                    <h4>下拉框</h4>
                    <div className="e-section-demo">
                        <Select>
                            <div>1</div>
                            <div>2</div>
                        </Select>
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