import React from 'react';
import api from '../api';

class Funciones extends React.Component{
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
    }

   render(){
       const routineList = this.state.routines.map(
           (routine) =>
                <Funcion name={routine.name} id={routine.id}/>
       );

       return (<ul>{routineList}</ul>);
   };
}

function Funcion(props){

    return(
        <div className="input-group">
            <span className="input-group-addon" >{props.name}</span>
            <button type="button" className="btn">
                <span className="glyphicon glyphicon-cog"/>
            </button>
        </div>
    );
}
export default Funciones;
