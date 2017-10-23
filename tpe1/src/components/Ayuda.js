import React from 'react';
import { Alert } from 'reactstrap';
import { Button } from 'reactstrap';


export default class HelpBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            missing:true,
            submited:false,
        };
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validInput(input1,input2,input3,input4) {
       return input1 && input2 && input3 && input4;
      }

    handleClick() {

        var name = document.getElementById("name").textContent;
        var apellido = document.getElementById("apellido").textContent;
        var email = document.getElementById("email").textContent;
        var comment = document.getElementById("comment").textContent;
        var asunto = document.getElementById("asunto").textContent;

        if(validInput(name,apellido,comment,asunto) && validateEmail(email)) {
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

        //reset text content in input 
        var name = document.getElementById("name").textContent = "";
        var apellido = document.getElementById("apellido").textContent = "";
        var email = document.getElementById("email").textContent = "";
        var comment = document.getElementById("comment").textContent = "";
        var asunto = document.getElementById("asunto").textContent = "";

        this.setState(
            {
                missing: true,
                submited: false,
            }
        );
        
    }
    missingRender() {

        var alert = this.state.submited ? <AlertInput /> : <p>""</p>;

        return (
            <div id="help-container">
                <h2>Centro de Ayuda</h2>
                <div >
                    {alert}
                    <TextInput />
                    <EmailInput />
                    <CommentInput />
                </div>
                <ButtonSend onClick={() => this.handleClick()} />
            </div>

        );
    }

    render() {

        if(this.state.missing) 
            return missingRender;
        else {   
            return (
                <div id="message-sent">
                    <HelpSent email={this.state.email}/>
                    <ButtonAccept onClick={() => this.handleClick2()} />
                </div>
            );
        }
    }
}

function ButtonAccept(props) {
    
    return (
        <Button color="success" onClick={() => this.props.onClick()} >Aceptar</Button>
    );
}

function HelpSent(props) {
    
    return (
        <div>
            <Alert color="success">
                <h4 className="alert-heading">Su consulta ha sido enviada con exito!</h4>
                <p>
                Nos comunicaremos con usted a la brevedad para solucionar su problema. Se le enviara un mail a la casilla ingresada: 
                {this.props.email}.
                </p>
                <hr />
                <p className="mb-0">
                Se puede ingresar algo aca tambien.
                </p>
            </Alert>
        </div>
    );

}

function ButtonSend(props) {

    return (
        <Button color="primary" onClick={() => this.props.onClick()} >Enviar</Button>
    );
}

function TextInput(props) { //inputs de nombre y apellido
    return (
            <div className="col-text-input">
                <div className="form-group">
                    <label for="name">Nombre:</label>
                    <input type="text" className="form-control" id="name"/>
                </div>
                <div class="form-group">
                    <label for="apellido">Apellido</label>
                    <input type="text" className="form-control" id="apellido" />
                </div>
            </div>
    );
}

function EmailInput(props) { //inputs de email y asunto

    return (
        <div className="col-text-input">
            <div className="form-group">
                <label for="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="name@example.com"/>
            </div>
            <div class="form-group">
                <label for="asunto">Asunto</label>
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
        <div class="form-group">
            <label for="comment">Comentario</label>
            <textarea class="form-control" rows="10" id="comment" placeholder="Escriba aqui su mensaje..."></textarea>
        </div>
    );

}

export default HelpBoard;