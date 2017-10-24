import React from 'react';
import api from '../api';
import whiteCog from '../images/whiteCog.jpg';
import {Modal, ModalBody, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import * as $ from "jquery";
import PopUpLamp from './PopUpLamp';
import PopUpOven from './PopUpOven';
import PopUpAC from './PopUpAC';
import PopUpDoor from './PopUpDoor';
import PopUpRefrigerator from './PopUpRefrigerador';
import PopUpBlind from './PopUpBlind';

import '../css/Lists.css'
import "../css/PopUp.css"

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
               <ListGroupItem className="list-background-color">
                   <Dispositivo key={device.id} name={device.name} typeId={device.typeId} id={device.id}/>
               </ListGroupItem>
           )
       });
       return <ListGroup>{listDevices}</ListGroup>;

   };
}

class Dispositivo extends React.Component{
    constructor(props){
        super(props)
        this.state = {open: false}
        this.handleClick = this.handleClick.bind(this);
        this.closeModal =this.closeModal.bind(this);
    }

    handleClick()
    {
        this.setState({open:true});
    }

    closeModal = () => this.setState({ open: false })


    render() {
        return(
            <div>

                <ListGroup className="input-group-lg">
                    <ListGroupItemHeading>{this.props.name}</ListGroupItemHeading>
                    <ListGroupItem className="no-padding">
                        <button type="button" className="btn col-lg-12 btn-primary" onClick={this.handleClick}>
                            <span className="text-center">Modificar </span>
                            <img src={whiteCog} width="30" alt="cog"/>
                        </button>
                    </ListGroupItem>
                </ListGroup>

                <Modal  style={{width:'400px'}} isOpen={this.state.open} onExit={this.closeModal} aria-labelledby={this.props.id+"Modal"}>
                    <PopUpSelector  id ={this.props.id} typeId={this.props.typeId} name={this.props.name}  closeModal ={this.closeModal}/>
                </Modal>

            </div>
        );
    };
}

function PopUpSelector(props){
    switch(props.typeId){
        case "go46xmbqeomjrsjr":
            return <PopUpLamp id={props.id} name={props.name} closeModal={props.closeModal}/>;

        case "im77xxyulpegfmv8":
            return <PopUpOven id={props.id} name={props.name} closeModal={props.closeModal}/>;

        case "li6cbv5sdlatti0j":
            return<PopUpAC id={props.id} name={props.name} closeModal={props.closeModal}/>;

        case"lsf78ly0eqrjbz91":
            return <PopUpDoor id={props.id} name={props.name} closeModal={props.closeModal}/>;

        // case "mxztsyjzsrq7iaqc":
        //     return <PopUpAlarm id={props.id} name={props.name} closeModal={props.closeModal}/>;
        //
        // case "ofglvd9gqX8yfl3l":
        //     return <PopUpTimer id={props.id} name={props.name} closeModal={props.closeModal}/>;
        //
        case "rnizejqr2di0okho":
            return <PopUpRefrigerator id={props.id} name={props.name} closeModal={props.closeModal}/>;

        case "eu0v2xgprrhhg41g":
            return <PopUpBlind id={props.id} name={props.name} closeModal={props.closeModal}/>;

        default:
            return (
                <ModalBody>
                    <h1>No existe dispositivo</h1>
                    <button className="btn btn-primary" onClick={props.closeModal}>cerrar</button>
                </ModalBody>
            );
    }

}
export default Dispositivos;

