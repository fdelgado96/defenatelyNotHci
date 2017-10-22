import React, {Component} from 'react';
import Funciones from './Funciones';
import EditarFuncion from './EditarFuncion'
import {Button} from 'reactstrap'
import api from '../api';

export default class Automatizacion extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.refresh = this.refresh.bind(this);
        this.state = {
            popup: false,
            routines: []
        };
    }

    componentWillMount(){
        this.refresh();
    }

    toggle() {
        this.setState({
            popup: !this.state.popup
        });
    }

    refresh() {
        api.routines.list()
            .done((data) => {
                this.setState({
                    routines: data.routines
                });
            })
            .fail(() => {
                console.log("List Routines Failed")}
            );
    }

    render() {
        return (
        <div>
            <h1>Funciones Personalizadas</h1>
            <Funciones routines={this.state.routines} callback={this.refresh}/>
            <Button color="primary" onClick={this.toggle}>Crear Función</Button>
            <EditarFuncion visible={this.state.popup} toggle={this.toggle} callback={this.refresh}/>
        </div>
        );
    }
}
