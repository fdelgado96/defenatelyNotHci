import React from 'react';
import api from '../api'
import arrow from '../images/arrow.png';
import {Modal, ModalHeader, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, InputGroup, InputGroupAddon, InputGroupButton, Button, Label, Input, Form, FormGroup, ModalBody, ModalFooter} from 'reactstrap';
import Simplert from 'react-simplert'

class Administracion extends React.Component {
    constructor(props){
        super(props);
        this.refresh = this.refresh.bind(this);
        this.handleChangeRoom = this.handleChangeRoom.bind(this);
        this.state = {
            id: "0086b49564394504",
            name: "living",
            rooms: [],
            visible: true
        };
    }

    handleChangeRoom(roomId, roomName) {
        this.setState({id: roomId, name: roomName});
    }

    componentWillMount(){
        this.refresh();
    }

    refresh() {
        api.room.list()
            .done((data) => {
                this.setState({rooms: data.rooms});
            })
            .fail(() => {
                console.log("List areas Failed")}
            );
    }

    render(){
        const areas = this.state.rooms.map(room =>
            <Area id={room.id} name={room.name} callback={this.handleChangeRoom} />
        );
        return (
            <div>
                <Agregar visible={this.state.visible} id={this.state.roomId} rooms={this.state.rooms} toggle={() => {this.setState({visible: !this.state.visible})}}/>
                <h1></h1>
                <div className="container row mx-auto">
                    <div className="col-lg-6 mx-auto">
                        <h1>Areas</h1>
                        <ListGroup>{areas}</ListGroup>
                    </div>
                    <div className="col-lg-6 mx-auto">
                        <h1>Dispositivos en {this.state.name}</h1>
                        <Dispositivos id={this.state.id} />
                        <button type="button" className="btn col-lg-12 btn-success" onClick={() => {this.setState({visible: !this.state.visible})}}>
                            <span className="text-center">Agregar </span>
                            <i className="fa fa-plus"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

class Agregar extends React.Component {
    constructor(props) {
        super(props);
        this.changeRoom = this.changeRoom.bind(this)
        this.changeType = this.changeType.bind(this)
        this.apply = this.apply.bind(this)
        this.state = { id: props.id, type: "go46xmbqeomjrsjr", name: "" }
    }

    changeRoom(event) {
        this.state.id = event.target.value;
        this.setState(this.state);
    }

    changeType(event) {
        this.state.type = event.target.value;
        this.setState(this.state);
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

        api.devices.add("{\"typeId\": \"" + this.state.type + "\",\"name\": " + this.state.name + ",\"meta\": {}}")
            .done(() => this.props.toggle())
            .fail(() => console.log("List areas Failed"));

        this.props.toggle();
    }

    render() {
        const roomOptions = this.props.rooms.map(room => <option value={room.id}>{room.name}</option>);
        const types = [<option value="eu0v2xgprrhhg41g">cortina</option>, <option value="go46xmbqeomjrsjr">luz</option>, <option value="im77xxyulpegfmv8">horno</option>,
            <option value="li6cbv5sdlatti0j">aire</option>, <option value="lsf78ly0eqrjbz91">puerta</option>, <option value="mxztsyjzsrq7iaqc">alarma</option>,
            <option value="ofglvd9gqX8yfl3l">timer</option>, <option value="rnizejqr2di0okho">heladera</option>]
        return <Modal isOpen={this.props.visible} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>Agregar Dispositivo</ModalHeader>
                    <Form>
                        <ModalBody>
                            <FormGroup>
                                <Label>Nombre</Label>
                                <input type="text" className="form-control" ref="name" onChange={(event) => this.setState({name: event.target.value})}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Tipo</Label>
                                <Input type="select" name="rooms" value={this.state.type} onChange={this.changeType}>
                                    {types}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Area</Label>
                                <Input type="select" name="rooms" value={this.state.id} onChange={this.changeRoom}>
                                    <option value="">Todas</option>
                                    {roomOptions}
                                </Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.apply}>Crear</Button>{' '}
                            <Button color="secondary" onClick={this.props.toggle}>Cancelar</Button>
                        </ModalFooter>
                    </Form>
                    <Simplert showSimplert={this.state.showAlert} type={this.state.alertType} message={this.state.alertMessage} customCloseBtnText={"Entendido"}
                              onClose={() => this.setState({showAlert: false})} disableOverlayClick={true}/>
                </Modal>
    }
}

class Area extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return <button type="button" className="btn col-lg-12" onClick={() => this.props.callback(this.props.id, this.props.name)}>
            <span>{this.props.name} (id: {this.props.id})</span>
            <img src={arrow} width="30"/>
        </button>
    }
}

class Dispositivos extends React.Component{
    constructor(props){
        super(props);
        this.state = {devices : []};
    }

    componentWillMount(){
        api.room.getDevices(this.props.id)
            .done((data) => {
                this.setState({devices : data.devices});
            })
            .fail(() => {console.log("failed")}

            )
    }

    componentWillReceiveProps() {
        this.componentWillMount();
    }

   render(){
       const listDevices = this.state.devices.map((device) => {
           return (
                   <Dispositivo key={device.id} name={device.name} typeId={device.typeId} id={device.id}/>
           )
       });
       return <ListGroup className="list-background-color">{listDevices}</ListGroup>;

   };
}

class Dispositivo extends React.Component{
    constructor(props){
        super(props);
        this.state = {open: false};
        this.handleClick = this.handleClick.bind(this);
        this.closeModal =this.closeModal.bind(this);
        this.attemptDelete = this.attemptDelete.bind(this);
        this.deleteDevice = this.deleteDevice.bind(this);
        this.resetConfirm = this.resetConfirm.bind(this);
    }

    handleClick()
    {
        this.setState({open:true});
    }

    closeModal = () => this.setState({ open: false })

    attemptDelete() {
        this.setState({
            alertType: "warning",
            alertMessage: "¿Esta seguro de que desea eliminar el dispositivo (id: " + this.props.id + ", type: " + this.props.typeId + ")?",
            alertConfirm: true,
            showAlert: true
        })
    }

    deleteDevice() {
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

    render() {
        return(
            <InputGroup className="funcion justify-content-center">
                <InputGroupAddon className="funcion-text">{this.props.name} (id: {this.props.id})</InputGroupAddon>
                <Simplert showSimplert={this.state.showAlert} type={this.state.alertType} message={this.state.alertMessage} customCloseBtnText={this.state.alertConfirm? "Canclear" : "Entendido"}
                    useConfirmBtn={this.state.alertConfirm} customConfirmBtnText={"Eliminar"} customConfirmBtnClass={"danger"} onConfirm={this.deleteDevice} onClose={this.resetConfirm}
                    disableOverlayClick={true}/>
                <InputGroupButton><Button color="danger" onClick={this.attemptDelete} block><i className="fa fa-trash"/></Button></InputGroupButton>
            </InputGroup>
        );
    };
}

export default Administracion;