package com.falopa.smarthome.model;

import java.util.ArrayList;


public class OptionsParamType extends ParamType {
    private ArrayList<String> supportedValues;

    public OptionsParamType(String name, String type, String desc, ArrayList<String> supportedValues) {
        this.name = name;
        this.type = type;
        this.description = desc;
        this.supportedValues = supportedValues;
    }

    public ArrayList<String> getSupportedValues() {
        return supportedValues;
    }
}
