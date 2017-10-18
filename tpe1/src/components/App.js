import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/App.css';
import Header from './Header'
import Content from './Content'

class App extends Component {
    constructor(props) {
        super(props);

        this.setView = this.setView.bind(this);
        this.state = {
            activeView: "general"
        };
    }
    setView(view) {
        this.setState({
            activeView: view
        });
    }
    render() {
        return (
            <div>
                <Header active={this.state.activeView} callback={this.setView}/>
                <Content view={this.state.activeView}/>
            </div>
        );
    }
}

export default App;
