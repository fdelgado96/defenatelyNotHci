import React from 'react';
import api from '../api'
import arrow from '../images/arrow.png';
import {Modal, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, InputGroup, InputGroupAddon, InputGroupButton, Button} from 'reactstrap';
import Simplert from 'react-simplert'

class Administracion extends React.Component {
    constructor(props){
        super(props);
        this.refresh = this.refresh.bind(this);
        this.handleChangeRoom = this.handleChangeRoom.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.state = {
            id: "0086b49564394504",
            name: "living",
            rooms: [],
            visible: false
        };
    }

    handleChangeRoom(roomId, roomName) {
        this.state.id = roomId
        this.state.name = roomName
        this.setState(this.state);
    }

    handleAdd() {}

    componentWillMount(){
        this.refresh();
    }

    refresh() {
        api.room.list()
            .done((data) => {
                this.state.rooms = data.rooms
                this.setState(this.state);
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
                <Agregar visible={this.state.visible} />
                <h1></h1>
                <div className="container row mx-auto">
                    <div className="col-lg-6 mx-auto">
                        <h1>Areas</h1>
                        <ListGroup>{areas}</ListGroup>
                    </div>
                    <div className="col-lg-6 mx-auto">
                        <h1>Dispositivos en {this.state.name}</h1>
                        <Dispositivos id={this.state.id} />
                        <button type="button" className="btn col-lg-12 btn-success" onClick={this.handleAdd}>
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
    }

    render() {
        if (this.props.visible) {
            return <h1>TEST</h1>;
        }
        return <div/>
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
        super(props)
        this.state = {open: false}
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
        api.devices.delete(this.props.id)
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