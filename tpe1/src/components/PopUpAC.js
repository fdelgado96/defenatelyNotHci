import  React from "react";
import api from '../api';
import {
    Button, ButtonGroup, Input, Form, ModalBody, ModalFooter, ModalHeader, InputGroup, Label,
    FormGroup
} from 'reactstrap';

import "../css/activationSlider.css"
import "../css/Slider.css"
import "../css/PopUp.css"

class PopUpAC extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            status: "",
            temperature: 1,
            mode: "",
            verticalSwing: "",
            horizontalSwing: "",
            fanSpeed:"",
            minTemp: 18,
            maxTemp: 38,
            id: props.id
        };

        this.setStatus = this.setStatus.bind(this);
        this.setMode = this.setMode.bind(this);
        this.setTemperature = this.setTemperature.bind(this);
        this.setVerticalSwing = this.setVerticalSwing.bind(this);
        this.setHorizontalSwing = this.setHorizontalSwing.bind(this);
        this.setFanSpeed = this.setFanSpeed.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentWillMount(){
        api.devices.getState(this.props.id)
            .done((data)=>{
                this.setState({
                    status: data.result.status,
                    temperature: data.result.temperature,
                    verticalSwing: data.result.verticalSwing,
                    horizontalSwing: data.result.horizontalSwing,
                    fanSpeed: data.result.fanSpeed,
                    mode: data.result.mode
                })
            })
    }


    setStatus(){
        if(this.state.status === "on"){
            this.setState({status: "off"});
            console.log("changed to"+this.state.status)
        }
        else{
            this.setState({status: "on"});
            console.log("changed to"+this.state.status)

        }
    };

    setTemperature(event){
        console.log(event);
        this.setState({temperature: event.target.value})
    };

    setMode(event){
        this.setState({mode: event.target.name})
    };

    setVerticalSwing(event){
        this.setState({verticalSwing: event.target.name})

    };

    setHorizontalSwing(event){
        this.setState({horizontalSwing: event.target.name})

    };
    setFanSpeed(event){
        this.setState({fanSpeed: event.target.name})

    };

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

    render(){

        return(
            <Form onSubmit={this.handleSubmit}>
                <ModalHeader>{this.props.name}</ModalHeader>
                <ModalBody>
                    <div className="popup-item">
                        <h6>Modo:</h6>
                        <ButtonGroup>
                            <Button color="primary" name="cool" onClick={this.setMode}>Cool</Button>
                            <Button color="primary" name="heat" onClick={this.setMode}>Heat</Button>
                            <Button color="primary" name="fan" onClick={this.setMode}>Fan</Button>
                        </ButtonGroup>
                    </div>
                    <div className="popup-item">
                        <h6>Oscilación Vertical:</h6>
                        <ButtonGroup>
                            <Button color="primary" name="auto" onClick={this.setVerticalSwing}>Auto</Button>
                            <Button color="primary" name="22" onClick={this.setVerticalSwing}>22</Button>
                            <Button color="primary" name="45" onClick={this.setVerticalSwing}>45</Button>
                            <Button color="primary" name="67" onClick={this.setVerticalSwing}>67</Button>
                            <Button color="primary" name="90" onClick={this.setVerticalSwing}>90</Button>
                        </ButtonGroup>
                    </div>
                    <div className="popup-item">
                        <h6>Oscilación Horizontal:</h6>
                        <ButtonGroup>
                            <Button color="primary" name="auto" onClick={this.setHorizontalSwing}>Auto</Button>
                            <Button color="primary" name="-90" onClick={this.setHorizontalSwing}>-90</Button>
                            <Button color="primary" name="-45" onClick={this.setHorizontalSwing}>-45</Button>
                            <Button color="primary" name="0" onClick={this.setHorizontalSwing}>0</Button>
                            <Button color="primary" name="45" onClick={this.setHorizontalSwing}>45</Button>
                            <Button color="primary" name="90" onClick={this.setHorizontalSwing}>90</Button>
                        </ButtonGroup>
                    </div>
                    <div className="popup-item">
                        <h6>Velocidad del Ventilador:</h6>
                        <ButtonGroup>
                            <Button color="primary" name="auto" onClick={this.setFanSpeed}>Auto</Button>
                            <Button color="primary" name="25" onClick={this.setFanSpeed}>25</Button>
                            <Button color="primary" name="50" onClick={this.setFanSpeed}>50</Button>
                            <Button color="primary" name="75" onClick={this.setFanSpeed}>75</Button>
                            <Button color="primary" name="100" onClick={this.setFanSpeed}>100</Button>
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
                                <input type="checkbox" name="activarAC"  checked={this.state.status === "on" ? "checked" : ""} onChange={this.setStatus}/>
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



export default PopUpAC