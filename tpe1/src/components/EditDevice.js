import React, {Component} from 'react';
import api from '../api';
import '../css/EditarFuncion.css';
import '../css/Slider.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Form, FormGroup, Label, Input, InputGroup, InputGroupButton, InputGroupAddon, Table, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import { CirclePicker } from 'react-color';
import Simplert from 'react-simplert'

class EditDevice extends Component {
    constructor(props) {
        super(props);
        this.apply = this.apply.bind(this);
        this.cancel = this.cancel.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeRoom = this.changeRoom.bind(this);
        this.changeType= this.changeType.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.state = {
            name: "",
            room: "{}",
            type: "",
            rooms: [],
            types: [],
            showAlert: false,
            alertMessage: "",
            alertType: ""
        };
    }

    componentWillMount() {
        if(this.props.id) {
            api.devices.get(this.props.id)
                .done((data) => {
                    this.setState({
                        name: data.device.name,
                        type: data.device.typeId,
                        room: data.device.meta
                    });
                })
                .fail(() => {
                    this.setState({
                        alertType: "error",
                        alertMessage: "Hubo un error al intentar cargar el dispositivo",
                        showAlert: true
                    })
                });
        }
        else {
            this.setState({
                name: "",
                type: "",
                room: "{}"
            });
        }

        api.deviceTypes.list()
            .done((data) => {
                this.setState({
                    types: data.devices
                });
            })
            .fail(() => {
                this.setState({
                    alertType: "error",
                    alertMessage: "Hubo un error al intentar cargar los tipos de dispositivo",
                    showAlert: true
                })
            });


        api.room.list()
            .done((data) => {
                this.setState({
                    rooms: data.rooms
                });
            })
            .fail(() => {
                this.setState({
                    alertType: "error",
                    alertMessage: "Hubo un error al intentar cargar la lista de ambientes",
                    showAlert: true
                })
            });
    }

    apply() {
        if(this.state.name === "") {
            this.setState({
                alertType: "warning",
                alertMessage: "Debe especificar un nombre",
                showAlert: true
            });
            return;
        }

        if(this.state.type === "") {
            this.setState({
                alertType: "warning",
                alertMessage: "Debe especificar un tipo",
                showAlert: true
            });
            return;
        }

        if(this.state.room === "{}"){
            this.setState({
                alertType: "warning",
                alertMessage: "Debe especificar un ambiente",
                showAlert: true
            });
            return;
        }

        const device = {
            id: this.props.id,
            name: this.state.name,
            typeId: this.state.type,
            meta: this.state.room? this.state.room : "{}"
        };

        if(device.id)
            api.devices.modify(device)
                .done(()=> {
                    api.devices.removeDevice(device.id)
                        .done(()=>api.devices.setDevice(device.meta, device.id));
                    if(this.props.callback)
                        this.props.callback(true);
                })
                .fail(()=> {
                    if(this.props.callback)
                        this.props.callback(false);
                })
                .always(()=>
                    this.componentWillMount()
                );
        else
            api.devices.add(device)
                .done((data)=> {
                    console.log(device.meta+" deviceID: "+data.device.id)
                    api.devices.setDevice(device.meta, data.device.id);
                    if(this.props.callback)
                        this.props.callback(true);
                })
                .fail(()=> {
                    if(this.props.callback)
                        this.props.callback(false);
                })
                .always(()=>
                    this.componentWillMount()
                );

        this.props.toggle();
    }

    cancel() {
        this.props.toggle();
        this.componentWillMount();
    }

    changeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    changeRoom(event) {
        this.setState({
            room: event.target.value
        });
    }

    changeType(event){
        this.setState({
            type: event.target.value
        });
    }


    closeAlert() {
        this.setState({
            showAlert: false
        });
    }

    render() {
        return (
            <Modal isOpen={this.props.visible} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>{this.props.id ? "Editar Dispositivo" : "Crear Dispositivo"}</ModalHeader>
                <Form>
                    <ModalBody>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="text" name="name" value={this.state.name} onChange={this.changeName}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Tipo</Label>
                            <TypeSelect value={this.state.type} types={this.state.types} handler={this.changeType}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Ambiente</Label>
                            <RoomSelect value={this.state.room} rooms={this.state.rooms} handler={this.changeRoom}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.apply}>{this.props.id ? "Actualizar" : "Crear"}</Button>{' '}
                        <Button color="secondary" onClick={this.cancel}>Cancelar</Button>
                    </ModalFooter>
                </Form>
                <Simplert showSimplert={this.state.showAlert} type={this.state.alertType} message={this.state.alertMessage} customCloseBtnText={"Entendido"}
                          onClose={this.closeAlert} disableOverlayClick={true}/>
            </Modal>
        );
    }
}



function RoomSelect(props) {
    const roomOptions = props.rooms.map(
        room =>
            <option value={room.id}>{room.name}</option>
    );
    return (
        <Input type="select" name="room" value={props.value} onChange={props.handler}>
            <option value="{}" selected disabled hidden>Seleccione</option>
            {roomOptions}
        </Input>
    );
}

function TypeSelect(props) {
    const typeOptions = props.types.map(
        type =>
            <option value={type.id}>{type.name}</option>
    );
    return (
        <Input type="select" name="type" value={props.value} onChange={props.handler}>
            <option value="" selected disabled hidden>Seleccione</option>
            {typeOptions}
        </Input>
    );
}
export default EditDevice;