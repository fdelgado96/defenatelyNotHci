import  React from "react";
import api from '../api';
import {Button, ButtonGroup, Form, Input, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import "../css/activationSlider.css"
import "../css/Slider.css"

class PopUpDoor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: "",
            locked: "",
            id: props.id
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        console.log(this.props.id)
        api.devices.getState(this.props.id)
            .done((data) => {
                console.log(data);
                this.setState({
                    status: data.result.status,
                    locked: data.result.locked,
                })
            })
            .fail(()=>{
                console.log("failed")
            })
    }

    handleChange(event){
        if(event.target.name === "activarPuerta") {
            if (this.state.status === "on") {
                this.setState({status: "off"});
            }
            else {
                this.setState({status: "on"});
            }
        }
        else{
            if (this.state.locked === "on") {
                this.setState({locked: "off"});
            }
            else {
                this.setState({locked: "on"});
            }
        }
    }

    handleSubmit(event){
        event.preventDefault();
        let statusParam = this.state.status;
        let lockedParam = this.state.locked;

        api.devices.putDevice(this.state.id, statusParam,[])
            .always(()=> api.devices.putDevice(this.state.id, lockedParam,[]))

    }

    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
                <ModalHeader>{this.props.name}</ModalHeader>
                <ModalBody>
                    <div className="popup-item">
                        <h6>Abierto:</h6>
                        <div className="input-group">
                            <label className="switch active">
                                <input type="checkbox" name="activarPuerta"  checked={this.state.status === "on" ? "checked" : ""} onChange={this.handleChange}/>
                                <span className="slider round"/>
                            </label>
                        </div>
                        <div className="popup-item">
                            <h6>Cerrado Con llave:</h6>
                            <div className="input-group">
                                <label className="switch active">
                                    <input type="checkbox" name="CerrarPuertaConLlave"  checked={this.state.locked === "on" ? "checked" : ""} onChange={this.handleChange}/>
                                    <span className="slider round"/>
                                </label>
                            </div>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={this.props.closeModal}>Cerrar</button>
                    <input type="submit" className="btn btn-primary" value="Guardar"/>
                </ModalFooter>

            </Form>

        );
    }


}
export default PopUpDoor;