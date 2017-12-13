import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import TextBox from './../../components/ui/textBox/textBox.jsx'
import TextArea from './../../components/ui/textArea/textArea.jsx'
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
    handleClick(e) {
        e.preventDefault();
    }
    changeHandle(event) {
        console.log("this is change")
    }
    clickHandle(event) {
        console.log("this is click")
    }
    focusHandle(event) {
        console.log("this is focus")
    }
    blurHandle(event) {
        console.log("this is blur")
    }
    render() {
        return (
            <div className="e-container">
                <TextBox name="textBox" onChange={this.changeHandle} onClick={this.clickHandle}
                onFocus={this.focusHandle} onBlur={this.blurHandle}/>
                <br />
                <TextArea name="textarea" onChange={this.changeHandle} onClick={this.clickHandle}
                onFocus={this.focusHandle} onBlur={this.blurHandle}></TextArea>
                <br />
                {this.props.name}
            </div>
        )
    }
}
Container.propTypes = {
    name: PropTypes.oneOf(["myContainer", "2"])
}
Container.defaultProps = {
    name: "myContainer"
}
render(<Container></Container>, document.getElementById('root'));