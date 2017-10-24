import React, {Component} from 'react';
import api from '../api';
import EditDevice from './EditDevice';
import {Button, ListGroup, ListGroupItem, InputGroup, InputGroupAddon, InputGroupButton} from 'reactstrap'
import Simplert from 'react-simplert'
import '../css/Funciones.css'



class ListDevices extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const routineList = this.props.devices.map(
            (device) =>
                <Dispositivo name={device.name} id={device.id} callback={this.props.callback}/>
        );

        return (
            <div >
                {routineList}
            </div>
        );
    };
}

class Dispositivo extends React.Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.attemptDelete = this.attemptDelete.bind(this);
        this.deleteFunction = this.deleteFunction.bind(this);
        this.resetConfirm = this.resetConfirm.bind(this);
        this.didModify = this.didModify.bind(this);
        this.state = {
            popup: false,
            showAlert: false,
            alertType: "",
            alertMessage: "",
            alertConfirm: false
        };
    }

    toggle() {
        this.setState({
            popup: !this.state.popup
        });
    }

    attemptDelete() {
        this.setState({
            alertType: "warning",
            alertMessage: "¿Esta seguro de que desea el dispositivo?",
            alertConfirm: true,
            showAlert: true
        })
    }

    deleteFunction() {
        this.resetConfirm();
        api.routines.list()
            .done((data) => {
                let devices = [];
                data.routines.forEach(routine =>
                    routine.actions.forEach(action =>
                        devices.push(action.deviceId)
                    )
                );

                if(devices.includes(this.props.id)) {
                    this.setState({
                        alertType: "error",
                        alertMessage: "No se puede eliminar el dispositivo porque esta asociado a una o más funciones",
                        showAlert: true
                    });
                }
                else {
                    api.devices.delete(this.props.id)
                        .done(() => this.props.callback())
                        .fail(() =>
                            this.setState({
                                alertType: "error",
                                alertMessage: "Hubo un error al intentar eliminar el dispositivo",
                                showAlert: true
                            })
                        );
                }
            })
            .fail(()=>
                this.setState({
                    alertType: "error",
                    alertMessage: "Hubo un error al intentar eliminar el dispositivo",
                    showAlert: true
                })
            );
    }

    resetConfirm() {
        this.setState({
            alertConfirm: false,
            showAlert: false
        });
    }

    didModify(bool) {
        if(bool) {
            this.setState({
                alertType: "success",
                alertMessage: "El dispositivo se actualizó correctamente",
                showAlert: true
            })
        }
        else {
            this.setState({
                alertType: "error",
                alertMessage: "Hubo un error al intentar actualizar el dispositivo",
                showAlert: true
            })
        }
    }



    render() {
        return (
            <InputGroup className="funcion justify-content-center">
                <InputGroupAddon className="funcion-text">{this.props.name}</InputGroupAddon>
                <EditDevice id={this.props.id} visible={this.state.popup} toggle={this.toggle} callback={this.didModify}/>
                <Simplert showSimplert={this.state.showAlert} type={this.state.alertType} message={this.state.alertMessage} customCloseBtnText={this.state.alertConfirm? "Canclear" : "Entendido"}
                          useConfirmBtn={this.state.alertConfirm} customConfirmBtnText={"Eliminar"} customConfirmBtnClass={"danger"} onConfirm={this.deleteFunction} onClose={this.resetConfirm}
                          disableOverlayClick={true} />
                <InputGroupButton><Button color="primary" onClick={this.toggle}><i className="fa fa-cog"/></Button></InputGroupButton>
                <InputGroupButton><Button color="danger" onClick={this.attemptDelete}><i className="fa fa-trash"/></Button></InputGroupButton>
            </InputGroup>
        );
    }
}
export default ListDevices;