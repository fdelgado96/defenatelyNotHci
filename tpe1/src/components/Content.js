import React from 'react';
import General from './General';
import Ambiente from './Ambiente';
import Ayuda from '.Ayuda';

export default function (props) {
    switch (props.view) {
        case "general":
            return <General />;
        case "cocina":
            return <Ambiente id="b398aa66327c56bd"/>;
        case "ayuda":
            return <Ayuda />;
        default:
            return <h1>Me dio paja hacer todos</h1>;
    }
}