import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header'
import Ambiente from "./Ambiente";
import api from '../api';
import '../room';
import Content from './Content'

class App extends Component {
    constructor(props) {
        super(props);

        this.setView = this.setView.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.state = {
            activeView: "general",
            rooms: []
        };
    }

    componentWillMount(){
        console.log("refresh");
        api.room.list()
            .done((data)=>
                this.setState({
                    rooms: data.rooms
                })
            )

    }

    setView(view) {
        this.setState({
            activeView: view
        });
    }

    render() {
        return (
            <div>
                <Header rooms={this.state.rooms} active={this.state.activeView} callback={this.setView}/>
                <Content rooms={this.state.rooms} view={this.state.activeView} callback={this.componentWillMount}/>
            </div>
        );
    }
}

export default App;
