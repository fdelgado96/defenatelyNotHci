import  React from "react";
import api from '../api';
import {Button, Modal, ButtonGroup, Form, Input, InputGroup, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import "../css/activationSlider.css"
import "../css/Slider.css"
import Simplert from "react-simplert";


class PopUpAlarm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: props.id,
            status: "",
            localCode: 0,
            modalOpen: false,
            showAlert: false,
            alertMessage: "",
            alertType: ""
        };
        this.setLocalCode = this.setLocalCode.bind(this);
        this.changeState = this.changeState.bind(this);
        this.closeNewCodeModal = this.closeNewCodeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    componentWillMount(){
        api.devices.getState(this.props.id)
            .done((data) => {
            console.log(data);
                this.setState({
                    status: data.result.status,
                })
            })
            .fail(()=>{
                console.log("failed")
            });
    }

    setLocalCode(event){
        this.setState({localCode: event.target.value})
    }

    changeState(event){
        this.setState({status: event.target.name})
    }

    closeNewCodeModal = () => this.setState({ modalOpen: false })

    openNewCodeModal = () => this.setState({ modalOpen: true })

    handleSubmit(event){
        event.preventDefault();
        let param;
        if(this.state.status === "disarmed"){
            param = "disarm";
        }
        else if(this.state.status === "armedAway"){
            param = "armAway";
        }
        else{
            param = "armStay";
        }

        api.devices.putDevice(this.state.id, param, [this.state.localCode])
            .done((data)=>{
            if(JSON.parse(data).result){
                this.props.closeModal();
            }
            else{
                this.setState({
                    showAlert: true,
                    alertMessage: "Codigo de seguridad incorrecto",
                    alertType: "error"
                })
            }
            })
    }

    closeAlert() {
        this.setState({
            showAlert: false

        });
    }

    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
                <ModalHeader>{this.props.name}</ModalHeader>
                <ModalBody>
                    <div className="popup-item">
                        <ButtonGroup>
                            <Button color="primary" name="disarmed" onClick={this.changeState} active={this.state.status === "disarmed"}>Deshabilitar</Button>
                            <Button color="primary" name="armedAway" onClick={this.changeState} active={this.state.status === "armedAway"}>ArmAway</Button>
                            <Button color="primary" name="armedStay" onClick={this.changeState} active={this.state.status === "armedStay"}>ArmAway</Button>
                        </ButtonGroup>
                    </div>
                    <div className="popup-item">
                        <h6>Ingrese el Codigo de Seguridad:</h6>
                        <InputGroup>
                            <Input type="text" onChange={this.setLocalCode} />
                        </InputGroup>
                    </div>
                    <div className="popup-item">
                        <button type="button" className="btn col-lg-12 btn-primary" onClick={this.openNewCodeModal}>Cambiar Codigo:</button>
                        <Modal  style={{width:'270px'}} isOpen={this.state.modalOpen} onExit={this.closeNewCodeModal} aria-labelledby={this.props.id+"Modal"}>
                            <ChangePass  id ={this.props.id} typeId={this.props.typeId} name={this.props.name}  closeModal ={this.closeNewCodeModal}/>
                        </Modal>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={this.props.closeModal}>Cerrar</button>
                    <input type="submit" className="btn btn-primary" value="Guardar"/>
                </ModalFooter>
                <Simplert showSimplert={this.state.showAlert} type={this.state.alertType} message={this.state.alertMessage} customCloseBtnText={"Entendido"}
                          onClose={this.closeAlert} disableOverlayClick={true}/>
            </Form>
        );
    }


}

class ChangePass extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            oldCode: 0,
            newCode: 0,
            showAlert: false,
            alertMessage: "",
            alertType: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setNewCode = this.setNewCode.bind(this);
        this.setOldCode = this.setOldCode.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        api.devices.putDevice(this.props.id, "changeSecurityCode",[this.state.oldCode, this.state.newCode])
            .done((data=>{
                if(JSON.parse(data).result){
                    this.props.closeModal();
                }
                else{
                    this.setState({
                        showAlert: true,
                        alertMessage: "Codigo de seguridad incorrecto",
                        alertType: "error"
                    })
                }
            }))

    }

    setNewCode(event){
        this.setState({newCode: event.target.value})
    }

    setOldCode(event){
        this.setState({oldCode: event.target.value})
    }

    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
                <ModalHeader>Cambiar Codigo</ModalHeader>
                <ModalBody>
                    <h6>Nuevo Codigo de Seguridad*</h6>
                    <InputGroup>
                        <Input type="text" onChange={this.setNewCode} />
                    </InputGroup>
                    <h6>Codigo de Seguridad Actual*</h6>
                    <InputGroup>
                        <Input type="text" onChange={this.setOldCode} />
                    </InputGroup>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={this.props.closeModal}>Cerrar</button>
                    <input type="submit" className="btn btn-primary" value="Cambiar"/>
                </ModalFooter>
                <Simplert showSimplert={this.state.showAlert} type={this.state.alertType} message={this.state.alertMessage} customCloseBtnText={"Entendido"}
                          onClose={this.closeAlert} disableOverlayClick={true}/>
            </Form>
        )
    }


}


export default  PopUpAlarm;