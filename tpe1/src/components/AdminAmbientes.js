import React, {Component} from 'react';
import Ambientes from './Ambientes';
import EditarAmbiente from './EditarAmbiente'
import {Button} from 'reactstrap'
import Simplert from 'react-simplert'
import api from '../api';
import '../css/AdminAmbientes.css'

export default class AdminAmbientes extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.didCreate = this.didCreate.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.state = {
            popup: false,
            showAlert: false,
            alertType: "",
            alertMessage: ""
        };
    }

    toggle() {
        this.setState({
            popup: !this.state.popup
        });
    }

    didCreate(bool) {
        if(bool) {
            this.setState({
                alertType: "success",
                alertMessage: "El ambiente se creó correctamente",
                showAlert: true
            });
            this.props.callback();
        }
        else {
            this.setState({
                alertType: "error",
                alertMessage: "Hubo un error al intentar crear el ambiente",
                showAlert: true
            })
        }
    }

    closeAlert() {
        this.setState({
            showAlert: false
        });
    }

    render() {
        return (
            <div className="adminambientes">
                <h1>Ambientes</h1>
                <Ambientes rooms={this.props.rooms} callback={this.props.callback}/>
                <Button color="primary" className="crear-ambiente" onClick={this.toggle}>Crear Ambiente</Button>
                <EditarAmbiente visible={this.state.popup} toggle={this.toggle} callback={this.didCreate}/>
                <Simplert showSimplert={this.state.showAlert} type={this.state.alertType} message={this.state.alertMessage} customCloseBtnText={"Entendido"}
                          onClose={this.closeAlert} disableOverlayClick={true}/>
            </div>
        );
    }
}
