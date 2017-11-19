package com.falopa.smarthome.model;


public class StringParam extends Param{
    private String value;

    public StringParam(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
