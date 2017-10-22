import React, {Component} from 'react';
import api from '../api';
import EditarFuncion from './EditarFuncion'

class Funciones extends Component{
    constructor(props){
        super(props);
        this.state = {
            routines : []
        };
    }

    componentWillMount(){
        api.routines.list()
            .done((data) => {
                if(this.props.room) {
                    this.setState({
                        routines: data.routines.filter(routine => routine.meta === this.props.room)
                    });
                }
                else {
                    this.setState({
                        routines: data.routines
                    });
                }
            })
            .fail(() => {
                console.log("List Routines Failed")}
            );
        api.deviceTypes.list()
            .done((data) => {
                let params = [];
                data.devices.forEach( element =>
                    element.actions.forEach( action =>
                        action.params.forEach( param =>
                            params.push(param)
                        )
                    )
                );
                console.log(params.filter( (v, i, a) => a.indexOf(v) === i));
            });
    }

    render(){
       const routineList = this.state.routines.map(
           (routine) =>
                <Funcion name={routine.name} id={routine.id}/>
       );

       return (<ul>{routineList}</ul>);
    };
}

class Funcion extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            popup: false
        };
    }

    toggle() {
        this.setState({
            popup: !this.state.popup
        });
    }

    render() {
        return (
            <div className="input-group">
                <span className="input-group-addon">{this.props.name}</span>
                <button type="button" className="btn" onClick={this.toggle}>
                    <span className="glyphicon glyphicon-cog"/>
                </button>
                <EditarFuncion id={this.props.id} visible={this.state.popup} toggle={this.toggle}/>
            </div>
        );
    }
}
export default Funciones;
