import  React from "react";
import api from '../api';
import {Button, ButtonGroup, Form, Input, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import "../css/activationSlider.css"
import "../css/Slider.css"

class PopUpRefrigerador extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            freezerTemperature: 0,
            temperature: 0,
            mode: "",
            minTemp: 2,
            maxTemp: 8,
            minFreezerTemp: -20,
            maxFreezerTemp: -8,
            id: props.id,

        }

        this.setMode = this.setMode.bind(this);
        this.setTemperature = this.setTemperature.bind(this);
        this.setFreezerTemperature = this.setFreezerTemperature.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    setMode(event){
        this.setState({mode: event.target.name});
    }

    setTemperature(event){
        this.setState({temperature: event.target.value})
    }
    setFreezerTemperature(event){
        this.setState({freezerTemperature: event.target.value})
    }

    componentWillMount(){
        console.log(this.props.id)
        api.devices.getState(this.props.id)
            .done((data) => {
                console.log(data);
                this.setState({
                    freezerTemperature: data.result.freezerTemperature,
                    temperature: data.result.temperature,
                    mode: data.result.mode,
                })
            })
            .fail(()=>{
                console.log("failed")
            })
    }

    handleSubmit(event){
        event.preventDefault();
        api.devices.putDevice(this.state.id, "setFreezerTemperature",[this.state.freezerTemperature])
            .always(()=>
                api.devices.putDevice(this.state.id, "setTemperature",[this.state.temperature])
                    .always(()=>
                        api.devices.putDevice(this.state.id, "setMode",[this.state.mode])
                    )
            )
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
                            <Button color="primary" name="default" onClick={this.setMode}>Default</Button>
                            <Button color="primary" name="vacation" onClick={this.setMode}>Vacation</Button>
                            <Button color="primary" name="party" onClick={this.setMode}>Party</Button>
                        </ButtonGroup>
                    </div>
                    <div className="popup-item">
                        <h6>Temperatura de Heladera:</h6>
                        <Input type="range" value={this.state.temperature} className="Slider" min={this.state.minTemp} max={this.state.maxTemp} onChange={this.setTemperature}/>
                    </div>
                    <div className="popup-item">
                        <h6>Temperatura de Freezer:</h6>
                        <Input type="range" value={this.state.freezerTemperature} className="Slider" min={this.state.minFreezerTemp} max={this.state.maxFreezerTemp} onChange={this.setFreezerTemperature}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.closeModal}>Cerrar</Button>
                    <input type="submit" className="btn btn-primary" value="Guardar" />
                </ModalFooter>
            </Form>
        );

    }

}
export default PopUpRefrigerador;