import React, {Component} from 'react';
import api from '../api';
import '../css/EditarFuncion.css';
import '../css/Slider.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Form, FormGroup, Label, Input, InputGroup, InputGroupButton, InputGroupAddon, Table, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import { CirclePicker } from 'react-color';
import Simplert from 'react-simplert'

export default class EditarAmbiente extends Component {
    constructor(props) {
        super(props);
        this.apply = this.apply.bind(this);
        this.cancel = this.cancel.bind(this);
        this.changeName = this.changeName.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.state = {
            name: "",
            showAlert: false,
            alertMessage: "",
            alertType: ""
        };
    }

    componentWillReceiveProps(newProps) {
        if(newProps.id) {
            api.room.get(newProps.id)
                .done((data) => {
                    this.setState({
                        name: data.room.name,
                    });
                })
                .fail(() => {
                    this.setState({
                        alertType: "error",
                        alertMessage: "Hubo un error al intentar cargar el ambiente",
                        showAlert: true
                    })
                });
        }
    }

    componentWillMount() {
        if(this.props.id) {
            api.room.get(this.props.id)
                .done((data) => {
                    this.setState({
                        name: data.room.name,
                    });
                })
                .fail(() => {
                    this.setState({
                        alertType: "error",
                        alertMessage: "Hubo un error al intentar cargar el ambiente",
                        showAlert: true
                    })
                });
        }
        else {
            this.setState({
                name: "",
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

        const room = {
            id: this.props.id,
            name: this.state.name
        };

        if(room.id)
            api.room.modify(room)
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
            api.room.add(room)
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

    closeAlert() {
        this.setState({
            showAlert: false
        });
    }

    render() {
        return (
            <Modal isOpen={this.props.visible} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>{this.props.id ? "Editar Ambiente" : "Crear Ambiente"}</ModalHeader>
                <Form>
                    <ModalBody>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="text" name="name" value={this.state.name} onChange={this.changeName}/>
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