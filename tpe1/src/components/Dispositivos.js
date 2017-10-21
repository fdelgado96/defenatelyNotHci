import React from 'react';
import api from '../api';
import cog from '../images/cog.png';
import PopUpDispositivo from './PopUpDispositivo';
import {Button, Modal ,ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


class Dispositivos extends React.Component{
    constructor(props){
        super(props);
        this.state = {devices : []};
    }

    componentWillMount(){
        console.log("props id mount " +this.props.id)
        api.room.getDevices(this.props.id)
            .done((data) => {
                console.log(this)
                this.setState({devices : data.devices});
            })
            .fail(() => {console.log("failed")}

            )


    }

   render(){
        console.log(this.state.devices);
       const listDevices = this.state.devices.map((device) =>
           <Dispositivo name={device.name} typeId={device.typeId} id={device.id}/>)
       return <ul>{listDevices}</ul>;

   };
}

class Dispositivo extends React.Component{
    constructor(props){
        super(props)
        this.state = {open: false}
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick()
    {
        this.setState({open:true});
    }

    render() {
        console.log(this.props.name);
        let closeModal = () => this.setState({ open: false })

        let saveAndClose = () => {
            // api.saveData()
            //     .then(() =>
                this.setState({ open: false });
        }

        return(
            <div>

                <div className="input-group">
                    <span className="input-group-addon">{this.props.name}</span>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"/>
                    </label>
                    <button type="button" className="btn" onClick={this.handleClick}>
                        <img src={cog} width="20" alt="cog"/>
                    </button>
                </div>

                <Modal isOpen={this.state.open} onExit={closeModal} aria-labelledby={this.props.id+"Modal"}>
                    <ModalHeader closeButton>{this.props.name}</ModalHeader>
                    <ModalBody>
                        <PopUpDispositivo typeId={this.props.typeId}/>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={closeModal}>Close</button>
                        <button className="btn btn-primary" onClick={saveAndClose}>Save</button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    };
}
export default Dispositivos;

