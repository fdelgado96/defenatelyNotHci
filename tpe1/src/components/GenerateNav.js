import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../images/logo.png';
import "../css/Header.css"
import api from '../api'


function GenerateNav(props) {
        const listNavItems = props.rooms.map((room)=>{
                return(
                    <NavItem>
                        <NavLink active={props.active === room.id} onClick={() => props.callback(room.id)}
                                 href="#">{room.name.toUpperCase()}</NavLink>
                    </NavItem>
                );
            });

        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink active={props.active === "general"} onClick={() => props.callback("general")} href="#">GENERAL</NavLink>
                </NavItem>
                {listNavItems}
                <NavItem>
                    <NavLink active={props.active === "administracion"} onClick={() => props.callback("administracion")}
                             href="#">ADMINISTRACIÓN</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={this.props.active === "ayuda"} onClick={() => this.props.callback("ayuda")}
                             href="#">AYUDA</NavLink>
                </NavItem>
            </Nav>
        );
}

export default GenerateNav