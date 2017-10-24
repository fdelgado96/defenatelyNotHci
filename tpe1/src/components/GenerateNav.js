import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../images/logo.png';
import "../css/Header.css"
import api from '../api'


class GenerateNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {rooms: []};
    }

    componentWillMount(){
        api.room.list()
            .done((data)=>this.setState({rooms: data.rooms}))

    }

    render() {
        const listNavItems = this.state.rooms.map((room)=>{
            return(
                <NavItem>
                    <NavLink active={this.props.active === room.id} onClick={() => this.props.callback(room.id)}
                             href="#">{room.name.toUpperCase()}</NavLink>
                </NavItem>
                );
            });

        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink active={this.props.active === "general"} onClick={() => this.props.callback("general")} href="#">GENERAL</NavLink>
                </NavItem>
                {listNavItems}
                <NavItem>
                    <NavLink active={this.props.active === "ayuda"} onClick={() => this.props.callback("ayuda")}
                             href="#">AYUDA</NavLink>
                </NavItem>
            </Nav>
        );
    }

}

export default GenerateNav