import React from 'react';
import api from '../api'
import Dispositivos from './Dispositivos'
import arrow from '../images/arrow.png';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button} from 'reactstrap';
import '../css/Lists.css'

class Administracion extends React.Component {
    constructor(props){
        super(props);
        this.refresh = this.refresh.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            room: "0086b49564394504",
            rooms: []
        };
    }

    handleClick(roomId) {
        // var newState = this.state
        // newState.room = roomId
        this.setState({
            room: roomId,
            rooms: this.state.rooms
        });
    }

    componentWillMount(){
        this.refresh();
    }

    refresh() {
        api.room.list()
            .done((data) => {
                this.setState({
                    room: this.state.room,
                    rooms: data.rooms
                });
            })
            .fail(() => {
                console.log("List areas Failed")}
            );
    }

    render(){
        const areas = this.state.rooms.map(room =>
            <Area id={room.id} name={room.name} callback={this.handleClick} />
        );
        return (
            <div>
                <div className="container row mx-auto">
                    <div className="col-lg-6 mx-auto">
                        <h1>Areas</h1>
                        <ListGroup>{areas}</ListGroup>
                    </div>
                    <div className="col-lg-6 mx-auto">
                        <h1>Dispositivos</h1>
                        <Dispositivos id={this.state.room} />
                    </div>
                </div>
            </div>
        );
    }
}

class Area extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return <button type="button" className="btn col-lg-12" onClick={() => this.props.callback(this.props.id)}>
            <span>{this.props.name}</span>
            <img src={arrow} width="30"/>
        </button>
    }
}

export default Administracion;