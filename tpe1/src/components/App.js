import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header'
import Ambiente from "./Ambiente";
import './api';
import './room';
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
