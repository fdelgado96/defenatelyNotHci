import  React from "react";
import api from '../api';
import {Button, ButtonGroup, Form, Input, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import "../css/activationSlider.css"
import "../css/Slider.css"

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
            maxTemp: 230
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
                heat: data.result.temperature,
                grill: data.result.grill,
                convection: data.result.convection
            })
            })
        // api.deviceTypes.getDeviceType("im77xxyulpegfmv8")
        //     .done((data)=>{
        //     this.setState({
        //         minTemp: data.device.actions["setTemperature"]
        //     })
        //
        //     })
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

    handleStatusChange(event){
        if(event.checked)
            this.setState({status: "on"});
        else
            this.setState({status: "off"});
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.status === "on") {
            api.devices.putDevice(this.state.id, "turnOn","");
            console.log("in if: "+this.state.status);
        }
        else
            api.devices.putDevice(this.state.id,"turnOff","");

        api.devices.putDevice(this.state.id,"setTemperature","["+18+"]")
        //faltan mas, pero primero hay que arreglar popuplamp
        this.props.closeModal();

    }


    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
                <ModalHeader>{this.props.name}</ModalHeader>
                <ModalBody>
                    <div className="">
                        <h6>Modo de Calor:</h6>
                        <ButtonGroup>
                            <Button color="primary" name="top" onClick={this.setHeatMode}>Top</Button>
                            <Button color="primary" name="bottom" onClick={this.setHeatMode}>Bottom</Button>
                            <Button color="primary" name="conventional" onClick={this.setHeatMode}>Conventional</Button>
                        </ButtonGroup>
                    </div>
                    <div className="">
                        <h6>Modo Parilla:</h6>
                        <ButtonGroup>
                            <Button color="primary" name="large" onClick={this.setGrillMode}>Large</Button>
                            <Button color="primary" name="eco" onClick={this.setGrillMode}>Eco</Button>
                            <Button color="primary" name="off" onClick={this.setGrillMode}>Off</Button>
                        </ButtonGroup>
                    </div>
                    <div className="">
                        <h6>Modo convección:</h6>
                        <ButtonGroup>
                            <Button color="primary" name="normal" onClick={this.setConvectionMode}>Normal</Button>
                            <Button color="primary" name="eco" onClick={this.setConvectionMode}>Eco</Button>
                            <Button color="primary" name="off" onClick={this.setConvectionMode}>Off</Button>
                        </ButtonGroup>
                    </div>
                    <div className="">
                        <h6>Temperature:</h6>
                        <Input type="range" className="Slider" min={this.state.minTemp} max={this.state.maxTemp} onChange={this.setTemperature}/>
                    </div>
                    <div className="">
                        <h6>Activar</h6>
                        <div className="input-group ">
                            <label className="switch ">
                                <input type="checkbox" className="text-center" name="activarHorno"  defaultChecked={this.state.status === "on" ? "true" : "false"} onChange={this.handleStatusChange}/>
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