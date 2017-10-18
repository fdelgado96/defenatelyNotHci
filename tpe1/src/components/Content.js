import React from 'react';

export default function (props) {
    switch (props.view) {
        case "general":
            return <h1>Tamo en general</h1>;
        case "cocina":
            return <h1>Tamo en cocina</h1>;
        default:
            return <h1>Me dio paja hacer todos</h1>;
    }
}