import React from 'react';
import { Alert } from 'reactstrap';
import { Button } from 'reactstrap';
import "../css/ayuda.css"
var ReactDOM = require('react-dom');

class HelpBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            missing:true,
            submited:false,
        };
        this.validateEmail = this.validateEmail.bind(this);
        this.validInput = this.validInput.bind(this);
        this.missingRender = this.missingRender.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
    
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var result = re.test(email);
        
        return result;
    }

    validInput(input1,input2,input3,input4) {
       var bol = (input1 && input2 && input3 && input4);
        return bol;
       
    }

    handleClick() {

        //N
        var name = this.refs.name.value;
        var apellido = this.refs.apellido.value;
        var email = this.refs.email.value;
        var asunto = this.refs.asunto.value;
        var comment = this.refs.comment.value;
        console.log((name === null) ?  "null" : "no es null wep wpe wpe");
       
        if(this.validInput(name,apellido,comment,asunto) && this.validateEmail(email)) {
            this.setState(
                {
                    missing: false,
                    submited: true,
                });
        }
        else {
            this.setState(
            {
                missing: true,
                submited: true,
            });
        }
    }

    handleClick2() {

        this.setState(
            {
                missing: true,
                submited: false,
            }
        );
        
    }
    missingRender() {

        var alert = this.state.submited ? <AlertInput /> : <p></p>;

        return (
            <form id="form-ayuda">
                <div id="help-container">
                    <h2>Centro de Ayuda</h2>
                    <div>
                        {alert}
                
                        <div className="col-text-input">
                            <div className="form-group">
                                <label >Nombre:</label>
                                <input type="text" className="form-control" ref="name"/>
                            </div>
                            <div className="form-group">
                                <label >Apellido</label>
                                <input type="text" className="form-control" ref="apellido" />
                            </div>
                        </div>
                       
                        <div className="col-text-input">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" ref="email" placeholder="name@example.com"/>
                            </div>
                            <div className="form-group">
                                <label>Asunto</label>
                                <input type="text" className="form-control" ref="asunto" placeholder="Ejemplo: Falla en Automatizacion"/>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label>Comentario</label>
                            <textarea className="form-control" rows="10" ref="comment" placeholder="Escriba aqui su mensaje..."></textarea>
                        </div>
                    </div>
                    <Button color="primary" onClick={() => this.handleClick()} >Enviar</Button>
                </div>
            </form>

        );
    }

    render() {

        if(this.state.missing) 
            return this.missingRender();
        else {   
            return (
                <div id="alert-container">
                    <HelpSent />
                    <div id="morel">
                        <Button id="suc-but" color="success" onClick={() => this.handleClick2()} >Aceptar</Button>
                    </div>
                </div>
            );
        }
    }
}


function HelpSent(props) {
    
    return (
        <div >
            <Alert color="success">
                <h4 className="alert-heading">Su consulta ha sido enviada con exito!</h4>
                <p>
                Nos comunicaremos con usted a la brevedad para solucionar su problema. Se le enviara un mail a la casilla ingresada.
                </p>
                <hr />
                <p className="mb-0">
                Gracias por confiar en nosotros!
                </p>
            </Alert>
        </div>
    );

}

function TextInput(props) { //inputs de nombre y apellido
    return (
            <div className="col-text-input">
                <div className="form-group">
                    <label >Nombre:</label>
                    <input type="text" className="form-control" id="name"/>
                </div>
                <div className="form-group">
                    <label >Apellido</label>
                    <input type="text" className="form-control" id="apellido" />
                </div>
            </div>
    );
}

function EmailInput(props) { //inputs de email y asunto

    return (
        <div className="col-text-input">
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" id="email" placeholder="name@example.com"/>
            </div>
            <div className="form-group">
                <label>Asunto</label>
                <input type="text" className="form-control" id="asunto" placeholder="Ejemplo: Falla en Automatizacion"/>
            </div>
        </div>
    );
}

function AlertInput(props) {

    return (
        <Alert color="warning">
            Debes ingresar todos los datos que se piden!
        </Alert>
    );
}

function CommentInput(props) {

    return (
        <div className="form-group">
            <label >Comentario</label>
            <textarea className="form-control" rows="10" id="comment" placeholder="Escriba aqui su mensaje..."></textarea>
        </div>
    );

}

export default HelpBoard;
