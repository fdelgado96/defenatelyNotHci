import React from 'react';
import General from './General'

export default function (props) {
    switch (props.view) {
        case "general":
            return <General />;
        case "cocina":
            return <h1>Tamo en cocina</h1>;
        default:
            return <h1>Me dio paja hacer todos</h1>;
    }
}