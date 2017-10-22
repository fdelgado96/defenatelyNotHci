import React, {Component} from 'react';
import Funciones from './Funciones';
import EditarFuncion from './EditarFuncion'
import {Button} from 'reactstrap'

export default class Automatizacion extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            popup: false
        };
    }

    toggle() {
        this.setState({
            popup: !this.state.popup
        });
    }

    render() {
        return (
        <div>
            <h1>Funciones Personalizadas</h1>
            <Funciones />
            <Button color="primary" onClick={this.toggle}>Crear Función</Button>
            <EditarFuncion visible={this.state.popup} toggle={this.toggle}/>
        </div>
        );
    }
}
