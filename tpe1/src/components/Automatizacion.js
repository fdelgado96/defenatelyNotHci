import React, {Component} from 'react';
import Funciones from './Funciones';
import EditarFuncion from './EditarFuncion'
import {Button} from 'reactstrap'
import Simplert from 'react-simplert'
import api from '../api';
import '../css/Automatizacion.css'

export default class Automatizacion extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.refresh = this.refresh.bind(this);
        this.didCreate = this.didCreate.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.state = {
            popup: false,
            routines: [],
            showAlert: false,
            alertType: "",
            alertMessage: ""
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

    didCreate(bool) {
        if(bool) {
            this.setState({
                alertType: "success",
                alertMessage: "La función se creó correctamente",
                showAlert: true
            });
            this.refresh();
        }
        else {
            this.setState({
                alertType: "error",
                alertMessage: "Hubo un error al intentar crear la función",
                showAlert: true
            })
        }
    }

    refresh() {
        api.routines.list()
            .done((data) => {
                this.setState({
                    routines: data.routines
                });
            })
            .fail(() => {
                this.setState({
                    alertType: "error",
                    alertMessage: "Hubo un error al intentar actualizar la lista de funciones",
                    showAlert: true
                })
            });
    }

    closeAlert() {
        this.setState({
            showAlert: false
        });
    }

    render() {
        return (
        <div className="automatizacion">
            <h1>Funciones Personalizadas</h1>
            <Funciones routines={this.state.routines} callback={this.refresh}/>
            <Button color="primary" className="crear-funcion" onClick={this.toggle}>Crear Función</Button>
            <EditarFuncion visible={this.state.popup} toggle={this.toggle} callback={this.didCreate}/>
            <Simplert showSimplert={this.state.showAlert} type={this.state.alertType} message={this.state.alertMessage} customCloseBtnText={"Entendido"}
                onClose={this.closeAlert}/>
        </div>
        );
    }
}
