import React, { Component } from 'react';
import { render } from 'react-dom';
import TextBox from './../../components/ui/textBox/textBox.jsx';

class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }

    }
    componentDidMount() {
        console.log("this is componentDidMount");
        this.timerId = setInterval(() => this.tick(), 1000)
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
    render() {
        return (
            <div className="e-container">
                <TextBox />
                <br />
                {this.state.date.toLocaleTimeString()}
                <a href="#" onClick={e => this.handleClick(e)}>点击测试</a>
            </div>
        )
    }
}

render(<Container name="container" />, document.getElementById('root'));