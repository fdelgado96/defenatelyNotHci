import React, {Component} from 'react';
import api from '../api';
import EditarFuncion from './EditarFuncion'
import {Button} from 'reactstrap'

class Funciones extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const routineList = this.props.routines.map(
           (routine) =>
                <Funcion name={routine.name} id={routine.id} callback={this.props.callback}/>
        );

        return (<ul>{routineList}</ul>);
    };
}

class Funcion extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.deleteFunction = this.deleteFunction.bind(this);
        this.state = {
            popup: false
        };
    }

    toggle() {
        this.setState({
            popup: !this.state.popup
        });
    }

    deleteFunction() {
        api.routines.delete(this.props.id)
            .done(() => this.props.callback())
            .fail(() => console.log("Delete function "+this.props.id+" failed"));
    }

    render() {
        return (
            <div className="input-group">
                <span className="input-group-addon">{this.props.name}</span>
                <button type="button" className="btn" onClick={this.toggle}>
                    <span className="glyphicon glyphicon-cog"/>
                </button>
                <Button color="danger" onClick={this.deleteFunction}>-</Button>
                <EditarFuncion id={this.props.id} visible={this.state.popup} toggle={this.toggle} />
            </div>
        );
    }
}
export default Funciones;
