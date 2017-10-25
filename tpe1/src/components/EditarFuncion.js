import React, {Component} from 'react';
import api from '../api';
import '../css/EditarFuncion.css';
import '../css/Slider.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Form, FormGroup, Label, Input, InputGroup, InputGroupButton, InputGroupAddon, Table, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import { CirclePicker } from 'react-color';
import Simplert from 'react-simplert'

export default class EditarFuncion extends Component {
    constructor(props) {
        super(props);
        this.loadDevices = this.loadDevices.bind(this);
        this.apply = this.apply.bind(this);
        this.cancel = this.cancel.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeRoom = this.changeRoom.bind(this);
        this.addAction = this.addAction.bind(this);
        this.deleteAction = this.deleteAction.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.state = {
            name: "",
            actions: [],
            room: "{}",
            devices: [],
            rooms: [],
            showAlert: false,
            alertMessage: "",
            alertType: ""
        };
    }

    componentWillMount() {
        if(this.props.id) {
            api.routines.get(this.props.id)
                .done((data) => {
                    this.setState({
                        name: data.routine.name,
                        actions: data.routine.actions,
                        room: data.routine.meta
                    });
                    this.loadDevices();
                })
                .fail(() => {
                    this.setState({
                        alertType: "error",
                        alertMessage: "Hubo un error al intentar cargar la función",
                        showAlert: true
                    });
                    this.loadDevices();
                });
        }
        else {
            this.setState({
                name: "",
                actions: [],
                room: "{}"
            });
            this.loadDevices();
        }

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

    loadDevices() {
        if(this.state.room === "{}") {
            api.devices.list()
                .done((data) => {
                    this.setState({
                        devices: data.devices
                    });
                })
                .fail(() => {
                    this.setState({
                        alertType: "error",
                        alertMessage: "Hubo un error al intentar cargar la lista de dispositivos",
                        showAlert: true
                    })
                });
        }
        else {
            api.room.getDevices(this.state.room)
                .done((data) => {
                    this.setState({
                        devices: data.devices
                    });
                })
                .fail(() => {
                    this.setState({
                        alertType: "error",
                        alertMessage: "Hubo un error al intentar cargar la lista de dispositivos",
                        showAlert: true
                    })
                });
        }
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

        if(this.state.actions.length === 0) {
            this.setState({
                alertType: "warning",
                alertMessage: "Debe especificar al menos una acción",
                showAlert: true
            });
            return;
        }

        const routine = {
            id: this.props.id,
            name: this.state.name,
            actions: JSON.stringify(this.state.actions),
            meta: this.state.room? this.state.room : "{}"
        };

        if(routine.id)
            api.routines.modify(routine)
                .done(()=> {
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
            api.routines.add(routine)
                .done(()=> {
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
        const room = event.target.value;
        api.room.getDevices(room)
            .done((data) => {
                this.setState({
                    room: room,
                    actions: [],
                    devices: data.devices
                });
            })
            .fail(() => {
                this.setState({
                    alertType: "error",
                    alertMessage: "Hubo un error al intentar cargar la lista de dispositivos",
                    showAlert: true
                })
            });
    }

    addAction(action) {
        const actions = this.state.actions.slice();
        actions.push(action);
        this.setState({
            actions: actions
        });
    }

    deleteAction(actionName) {
        this.setState({
            actions: this.state.actions.filter((elem) => elem.actionName !== actionName)
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
                <ModalHeader toggle={this.props.toggle}>{this.props.id ? "Editar Función" : "Crear Función"}</ModalHeader>
                <Form>
                    <ModalBody>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="text" name="name" value={this.state.name} onChange={this.changeName}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Ambiente</Label>
                            <RoomSelect value={this.state.room} rooms={this.state.rooms} handler={this.changeRoom}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Acciones</Label>
                            <Table>
                                <ActionList actions={this.state.actions} devices={this.state.devices} callback={this.deleteAction}/>
                            </Table>
                            <ActionAdd devices={this.state.devices} callback={this.addAction} id={this.props.id}/>
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

function ActionList(props) {
    const actionList = props.actions.map(
        action => {
            let device = props.devices.find(element => element.id === action.deviceId);
            return (
                <tr>
                    <td className="action-text">
                        {device? device.name : ""}
                    </td>
                    <td className="action-text">
                        {action.actionName}
                    </td>
                    <td className="action-text">
                        {action.params.length > 0 ? action.params[0] : ""}
                    </td>
                    <td className="action-delete">
                        <Button color="danger" onClick={() => props.callback(action.actionName)}><i
                            className="fa fa-trash"/></Button>
                    </td>
                </tr>
            );
        });

    return (
        <tbody>
            {actionList}
        </tbody>
    );
}

function RoomSelect(props) {
    const roomOptions = props.rooms.map(
        room =>
            <option value={room.id}>{room.name}</option>
    );
    return (
        <Input type="select" name="room" value={props.value} onChange={props.handler}>
            <option value="{}" >Todas</option>
            {roomOptions}
        </Input>
    );
}

class ActionAdd extends Component {
    constructor(props) {
        super(props);
        this.changeDevice = this.changeDevice.bind(this);
        this.changeAction = this.changeAction.bind(this);
        this.changeParam = this.changeParam.bind(this);
        this.submit = this.submit.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.state = {
            device: {},
            action: {
                name: "",
                params:[]
            },
            param: "",
            actions: [],
            showAlert: false,
            alertMessage: "",
            alertType: ""
        }
    }

    changeDevice(event) {
        const device = this.props.devices.find(device => device.id === event.target.value);
        api.deviceTypes.get(device.typeId)
            .done( data =>
                this.setState({
                    device: device,
                    actions: data.device.actions,
                    action: {
                        name: "",
                        params: []
                    }
                })
            )
            .fail(() => {
                this.setState({
                    alertType: "error",
                    alertMessage: "Hubo un error al intentar cargar la lista de acciones",
                    showAlert: true
                })
            });
    }

    changeAction(event) {
        const action = this.state.actions.find(action => action.name === event.target.value);
        this.setState({
            action: action,
            param: ""
        });
    }

    changeParam(param) {
        this.setState({
            param: param
        })
    }

    submit() {
        if(!this.state.device.id) {
            this.setState({
                alertType: "warning",
                alertMessage: "Debe seleccionar un dispositivo",
                showAlert: true
            });
            return;
        }
        if(this.state.action.name === "") {
            this.setState({
                alertType: "warning",
                alertMessage: "Debe seleccionar una acción",
                showAlert: true
            });
            return;
        }
        if(this.state.action.params.length > 0 && this.state.param === "") {
            this.setState({
                alertType: "warning",
                alertMessage: "Debe especificar un valor para esta acción",
                showAlert: true
            });
            return;
        }

        this.props.callback({
            deviceId: this.state.device.id,
            actionName: this.state.action.name,
            params: this.state.param === "" ? [] : [this.state.param],
            meta: "{}"
        });
    }

    closeAlert() {
        this.setState({
            showAlert: false
        });
    }

    render() {
        return (
                <InputGroup>
                    <DeviceSelect devices={this.props.devices} handler={this.changeDevice} />
                    <ActionSelect actions={this.state.actions} value={this.state.action.name} handler={this.changeAction}/>
                    <ParamInput params={this.state.action.params} value={this.state.param} handler={this.changeParam} id={this.props.id}/>
                    <Simplert showSimplert={this.state.showAlert} type={this.state.alertType} message={this.state.alertMessage} customCloseBtnText={"Entendido"}
                              onClose={this.closeAlert} disableOverlayClick={true}/>
                    <InputGroupButton><Button color="primary" className="actionadd-button" onClick={this.submit}>+</Button></InputGroupButton>
                </InputGroup>
        );
    }
}

function DeviceSelect(props) {
    const deviceOptions = props.devices.map(
        device =>
            <option value={device.id}>{device.name}</option>
    );
    return (
        <Input className="actionadd-select" type="select" onChange={props.handler}>
            <option value="" disabled selected hidden>Seleccione</option>
            {deviceOptions}
        </Input>
    );
}

function ActionSelect(props) {
    const actionOptions = props.actions.filter(action => action.name != "getState").map(
        action =>
            <option value={action.name}>{action.name}</option>
    );
    return (
        <Input className="actionadd-select" type="select" value={props.value} onChange={props.handler}>
            <option value="" disabled selected hidden>Seleccione</option>
            {actionOptions}
        </Input>
    );
}

class ParamInput extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            popover: false
        }
    }

    componentWillReceiveProps() {
        this.setState({
            popover: false
        })
    }

    toggle() {
        this.setState({
            popover: !this.state.popover
        })
    }
//<Input type="text" disabled id={"popover-" + this.props.id} value={this.props.value} onClick={this.toggle}/>
    render()
    {
        if (this.props.params.length > 0) {
            switch (this.props.params[0].name) {
                case "color":
                    return (
                        <InputGroupAddon id={"popover-" + this.props.id} className="color-displayer" style={{background: "#"+this.props.value}} onClick={this.toggle}>
                            Seleccione
                            <Popover placement="bottom" isOpen={this.state.popover} target={"popover-" + this.props.id} toggle={this.toggle}>
                                <PopoverHeader>Popover Title</PopoverHeader>
                                <PopoverBody>
                                    <CirclePicker color={"#"+this.props.value} onChangeComplete={(elem) => this.props.handler(elem.hex.substring(1))}/>
                                </PopoverBody>
                            </Popover>
                        </InputGroupAddon>
                    );
                case "brightness":
                case "temperature":
                    if(this.props.value === "") {
                        this.props.handler((this.props.params[0].maxValue+this.props.params[0].minValue)/2)
                    }
                    return (<Input type="range" value={this.props.value} min={this.props.params[0].minValue}
                                   max={this.props.params[0].maxValue} onChange={(e) => this.props.handler(parseInt(e.target.value))}/>);
                case "heat":
                case "grill":
                case "convection":
                case "mode":
                case "verticalSwing":
                case "horizontalSwing":
                case "fanSpeed":
                    const options = this.props.params[0].supportedValues.map(
                        value =>
                            <option value={value}>{value}</option>
                    );
                    return (
                        <Input type="select" value={this.props.value} onChange={(e) => this.props.handler(e.target.value)}>
                            <option value="" disabled selected hidden>Seleccione</option>
                            {options}
                        </Input>
                    );
                case "interval":
                    return (<Input type="number" value={this.props.value} min={this.props.params[0].minValue}
                                   max={this.props.params[0].maxValue} onChange={(e) => this.props.handler(parseInt(e.target.value))}/>);
            }
        }

        return (<span/>);
    }
}