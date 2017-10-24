import React, {Component} from 'react';
import api from '../api';
import EditarAmbiente from './EditarAmbiente'
import {Button, ListGroup, ListGroupItem, InputGroup, InputGroupAddon, InputGroupButton} from 'reactstrap'
import Simplert from 'react-simplert'
import '../css/Ambientes.css'

class Ambientes extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const roomList = this.props.rooms.map(
            (room) =>
                <Ambiente name={room.name} id={room.id} callback={this.props.callback}/>
        );

        return (
            <div >
                {roomList}
            </div>
        );
    };
}

class Ambiente extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.attemptDelete = this.attemptDelete.bind(this);
        this.deleteAmbiente = this.deleteAmbiente.bind(this);
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
            alertMessage: "¿Esta seguro de que desea eliminar el ambiente?",
            alertConfirm: true,
            showAlert: true
        })
    }

    deleteAmbiente() {
        this.resetConfirm();

        //TODO: FALLAR SI TIENE DISP

        api.room.delete(this.props.id)
            .done(() => this.props.callback())
            .fail(()=>
                this.setState({
                    alertType: "error",
                    alertMessage: "Hubo un error al intentar eliminar el ambiente",
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
                alertMessage: "El ambiente se actualizó correctamente",
                showAlert: true
            });
            this.props.callback();
        }
        else {
            this.setState({
                alertType: "error",
                alertMessage: "Hubo un error al intentar actualizar el ambiente",
                showAlert: true
            })
        }
    }

    render() {
        return (
            <InputGroup className="ambiente justify-content-center">
                <InputGroupAddon className="ambiente-text">{this.props.name}</InputGroupAddon>
                <EditarAmbiente id={this.props.id} visible={this.state.popup} toggle={this.toggle} callback={this.didModify}/>
                <Simplert showSimplert={this.state.showAlert} type={this.state.alertType} message={this.state.alertMessage} customCloseBtnText={this.state.alertConfirm? "Canclear" : "Entendido"}
                          useConfirmBtn={this.state.alertConfirm} customConfirmBtnText={"Eliminar"} customConfirmBtnClass={"danger"} onConfirm={this.deleteAmbiente} onClose={this.resetConfirm}
                          disableOverlayClick={true} />
                <InputGroupButton><Button color="primary" onClick={this.toggle}><i className="fa fa-cog"/></Button></InputGroupButton>
                <InputGroupButton><Button color="danger" onClick={this.attemptDelete}><i className="fa fa-trash"/></Button></InputGroupButton>
            </InputGroup>
        );
    }
}
export default Ambientes;
