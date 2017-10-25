import React, {Component} from 'react';
import ListDevices from './ListDevices';
import EditDevice from './EditDevice'
import {Button} from 'reactstrap'
import Simplert from 'react-simplert'
import api from '../api';
import '../css/Automatizacion.css'


class EditarDispositivos extends React.Component{
    constructor(props){
        super(props);
    }
}

class AdministrarDispositivos extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.refresh = this.refresh.bind(this);
        this.didCreate = this.didCreate.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.state = {
            popup: false,
            devices: [],
            showAlert: false,
            alertType: "",
            alertMessage: ""
        };
    }

    componentWillMount() {
        this.refresh();
    }

    toggle() {
        this.setState({
            popup: !this.state.popup
        });
    }

    didCreate(bool) {
        if (bool) {
            this.setState({
                alertType: "success",
                alertMessage: "El dispositivo se creó correctamente",
                showAlert: true
            });
            this.refresh();
        }
        else {
            this.setState({
                alertType: "error",
                alertMessage: "Hubo un error al intentar crear el dispositivo",
                showAlert: true
            })
        }
    }

    refresh() {
        console.log("startRefresh ")
        api.devices.list()
            .done((data) => {
                console.log(data);
                this.setState({
                    devices: data.devices
                });
            })
            .fail(() => {
                this.setState({
                    alertType: "error",
                    alertMessage: "Hubo un error al intentar actualizar la lista de dispositivos",
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
                    <h1>Dispositivos</h1>
                    <ListDevices devices={this.state.devices} callback={this.refresh}/>
                    <Button color="primary" className="crear-funcion" onClick={this.toggle}>Crear Dispositivo</Button>
                    <EditDevice visible={this.state.popup} toggle={this.toggle} callback={this.didCreate}/>
                    <Simplert showSimplert={this.state.showAlert} type={this.state.alertType} message={this.state.alertMessage} customCloseBtnText={"Entendido"}
                              onClose={this.closeAlert} disableOverlayClick={true}/>

                </div>
        );
    }
}

export default AdministrarDispositivos;

{/*<div className="automatizacion">*/}
{/*<h1>Funciones Personalizadas</h1>*/}
{/*<Funciones devices={this.state.devices} callback={this.refresh}/>*/}
{/*<Button color="primary" className="crear-funcion" onClick={this.toggle}>Crear Función</Button>*/}
{/*<EditarFuncion visible={this.state.popup} toggle={this.toggle} callback={this.didCreate}/>*/}
{/*message={this.state.alertMessage} customCloseBtnText={"Entendido"}*/}
{/*onClose={this.closeAlert} disableOverlayClick={true}/>*/}
{/*</div>*/}