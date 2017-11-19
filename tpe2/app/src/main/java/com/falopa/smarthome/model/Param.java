package com.falopa.smarthome.model;


public abstract class Param {
    private ParamType type;

    public ParamType getType() {
        return type;
    }

    public void setType(ParamType type) {
        this.type = type;
    }
}
