import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "0",
            expression: "0"
        }
        this.handleClick = this.handleClick.bind(this);
        this.clearDisplay = this.clearDisplay.bind(this);
        this.handleOperators = this.handleOperators.bind(this);
        this.handleEqual = this.handleEqual.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
    }

    //handle click on numbers

    handleClick(e) {
        if (this.state.expression.endsWith("-")) {
            this.setState({
                inputValue: this.state.inputValue + e.target.value,
                expression: this.state.expression + e.target.value
            })
        } else {
            this.setState({
                inputValue: this.state.inputValue === "0" ? e.target.value : this.state.inputValue.replace(/([-+*/])+/g, "$1") + e.target.value,
                expression: this.state.expression === "0" ? e.target.value : this.state.expression.replace(/([-+*/])+/g, "$1") + e.target.value
            })
        }
    }

    //handle clear btn

    clearDisplay() {
        this.setState({
            inputValue: "0",
            expression: "0"
        })
    }

    //handle the operator btn
    handleOperators(event) {
        let result = event.target.value;
        if (/[+-/*]$/.test(this.state.expression) && result !== "-") {
            this.setState({
                inputValue: result,
                expression: this.state.expression.replace(/[+-/*]$/, "0") + result
            })
        } else if (this.state.inputValue === "0") {
            this.setState({
                expression: this.state.inputValue + result,
                inputValue: result
            })
        } else {
            this.setState({
                inputValue: result,
                expression: this.state.expression + result
            })
        }
    }

    // handle the equal button

    handleEqual() {
        let solution = Math.round(10000000000 * eval(this.state.expression)) / 10000000000;
        this.setState({
            inputValue: String(solution),
            expression: String(solution)
        })
    }

    //handle decimal button

    handleDecimal(event) {
        let result = event.target.value;
        if (!this.state.inputValue.includes(".")) {
            this.setState({
                inputValue: this.state.inputValue + result,
                expression: this.state.expression + result
            })
        }
    }

    render() {
        return (
            <div data-theme="bumblebee" className="app-container ">
                <div className="outer-container artboard phone-1 bg-primary-content artboard-demo ">
                    <div className="display card bg-neutral p2">
                        <div className="expression-display chiffres">
                            {this.state.expression}
                        </div>
                        <div id="display" className="result-display chiffres">
                            {this.state.inputValue}
                        </div>
                    </div>
                    <Button
                        inputValue={this.state.inputValue}
                        handleEqual={this.handleEqual}
                        handleClick={this.handleClick}
                        clearDisplay={this.clearDisplay}
                        handleOperators={this.handleOperators}
                        handleDecimal={this.handleDecimal} />
                </div>
            </div>
        )
    }
}

class Button extends React.Component {
    render() {
        return (
            <div className="button-container card p2">
                <button className="btn btn-warning  " onClick={this.props.clearDisplay} id="clear">AC</button>
                <button className="btn btn-secondary " onClick={this.props.handleOperators} id="add" value="+">+</button>
                <button className="btn btn-secondary " onClick={this.props.handleOperators} id="subtract" value="-">-</button>
                <button className="btn btn-primary " onClick={this.props.handleClick} id="seven" value="7">7</button>
                <button className="btn btn-primary " onClick={this.props.handleClick} id="eight" value="8">8</button>
                <button className="btn btn-primary " onClick={this.props.handleClick} id="nine" value="9">9</button>
                <button className="btn btn-secondary" onClick={this.props.handleOperators} id="multiply" value="*">X</button>
                <button className="btn btn-primary " onClick={this.props.handleClick} id="four" value="4">4</button>
                <button className="btn btn-primary " onClick={this.props.handleClick} id="five" value="5">5</button>
                <button className="btn btn-primary " onClick={this.props.handleClick} id="six" value="6">6</button>
                <button className="btn btn-secondary" onClick={this.props.handleOperators} id="divide" value="/">/</button>
                <button className="btn btn-primary " onClick={this.props.handleClick} id="one" value="1">1</button>
                <button className="btn btn-primary " onClick={this.props.handleClick} id="two" value="2">2</button>
                <button className="btn btn-primary " onClick={this.props.handleClick} id="three" value="3">3</button>
                <button className="btn btn-secondary" onClick={this.props.handleEqual} id="equals">=</button>
                <button className="btn btn-primary " onClick={this.props.handleClick} id="zero" value="0">0</button>
                <button className="btn btn-secondary " onClick={this.props.handleDecimal} id="decimal" value=".">.</button>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));