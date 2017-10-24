import React from 'react';
import bulb from '../images/bulb.png';
import gears from '../images/gears.png';
import dispositivos from '../images/dispositivos.png';
import '../css/Menu.css';

function MenuItem(props) {
    return (
        <div className="col-md-3 menu-item" onClick={props.onClick}>
            <img src={props.img} className="menu-img" alt="img" />
            <h3 className="menu-text">{props.title}</h3>
        </div>
    );
}

function Menu(props) {
    return (
        <div className="container full-page">
            <div className="row menu-container align-items-center justify-content-md-center">
                <MenuItem title="ILUMINACIÓN" img={bulb} onClick={()=> props.callback("iluminacion")} />
                <MenuItem title="ADMINISTRACIÓN DE DISPOSITIVOS" img={dispositivos} onClick={()=> props.callback("dispositivos")} />
                <MenuItem title="AUTOMATIZACIÓN" img={gears} onClick={()=> props.callback("automatizacion")} />
            </div>
        </div>
    );
}
export default Menu;