package com.falopa.smarthome.model;


public abstract class ParamType {
    protected String name;
    protected String type;
    protected String description;

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }
}
