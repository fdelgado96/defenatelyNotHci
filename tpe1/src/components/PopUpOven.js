import  React from "react";
import api from '../api';
import {Button, ButtonGroup, Form, Input, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import "../css/activationSlider.css"
import "../css/Slider.css"
import "../css/PopUp.css"


class PopUpOven extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            status: "",
            temperature: 0,
            heat: "",
            grill:"",
            convection:"",
            minTemp: 90,
            maxTemp: 230,
            id: props.id
        }
        this.setHeatMode = this.setHeatMode.bind(this);
        this.setGrillMode = this.setGrillMode.bind(this);
        this.setConvectionMode = this.setConvectionMode.bind(this);
        this.handleStatusChange= this.handleStatusChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setTemperature = this.setTemperature.bind(this);

    }

    componentWillMount(){
        api.devices.getState(this.props.id)
            .done((data)=>{
            this.setState({
                status: data.result.status,
                temperature: data.result.temperature,
                heat: data.result.heat,
                grill: data.result.grill,
                convection: data.result.convection
            })
            })
    }

    setHeatMode(event){
        this.setState({heat: event.target.name});
    }

    setTemperature(event){
        this.setState({temperature: event.target.value});
    }

    setGrillMode(event){
        this.setState({grill: event.target.name});
    }

    setConvectionMode(event){
        this.setState({convection: event.target.name});
    }

    handleStatusChange(){
        if(this.state.status === "on"){
            this.setState({status: "off"});
            console.log("changed to"+this.state.status)
        }
        else{
            this.setState({status: "on"});
            console.log("changed to"+this.state.status)

        }
    }

    handleSubmit(event){
        event.preventDefault();
        console.log("id: "+this.state.id)

        api.devices.putDevice(this.state.id,"setTemperature",[this.state.temperature])
            .always(()=>
                api.devices.putDevice(this.state.id,"setHeat",[this.state.heat])
                    .always(()=>
                        api.devices.putDevice(this.state.id,"setGrill",[this.state.grill])
                            .always(()=>
                                api.devices.putDevice(this.state.id,"setConvection",[this.state.convection])
                                    .always(()=>{
                                        if(this.state.status === "on") {
                                            api.devices.putDevice(this.state.id, "turnOn",[]);
                                            console.log("in if: "+this.state.status);
                                        }
                                        else
                                            api.devices.putDevice(this.state.id,"turnOff",[]);
                                    })
                            )
                    )
            )
            .fail((data)=> console.log(data))
        this.props.closeModal();
    };


    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
                <ModalHeader>{this.props.name}</ModalHeader>
                <ModalBody>
                    <div className="popup-item">
                        <h6>Modo de Calor:</h6>
                        <ButtonGroup>
                            <Button color="primary" name="top" onClick={this.setHeatMode}>Top</Button>
                            <Button color="primary" name="bottom" onClick={this.setHeatMode}>Bottom</Button>
                            <Button color="primary" name="conventional" onClick={this.setHeatMode}>Conventional</Button>
                        </ButtonGroup>
                    </div>
                    <div className="popup-item">
                        <h6>Modo Parilla:</h6>
                        <ButtonGroup>
                            <Button color="primary" name="large" onClick={this.setGrillMode}>Large</Button>
                            <Button color="primary" name="eco" onClick={this.setGrillMode}>Eco</Button>
                            <Button color="primary" name="off" onClick={this.setGrillMode}>Off</Button>
                        </ButtonGroup>
                    </div>
                    <div className="popup-item">
                        <h6>Modo convección:</h6>
                        <ButtonGroup>
                            <Button color="primary" name="normal" onClick={this.setConvectionMode}>Normal</Button>
                            <Button color="primary" name="eco" onClick={this.setConvectionMode}>Eco</Button>
                            <Button color="primary" name="off" onClick={this.setConvectionMode}>Off</Button>
                        </ButtonGroup>
                    </div>
                    <div className="popup-item">
                        <h6>Temperatura:</h6>
                        <Input type="range" value={this.state.temperature} className="Slider" min={this.state.minTemp} max={this.state.maxTemp} onChange={this.setTemperature}/>
                    </div>
                    <div className="popup-item">
                        <h6>Activar</h6>
                        <div className="input-group">
                            <label className="switch active">
                                <input type="checkbox" name="activarHorno"  checked={this.state.status === "on" ? "checked" : ""} onChange={this.handleStatusChange}/>
                                <span className="slider round"/>
                            </label>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.closeModal}>Cerrar</Button>
                    <input type="submit" className="btn btn-primary" value="Guardar" />
                </ModalFooter>
            </Form>
        )
    }

}

export default PopUpOven;