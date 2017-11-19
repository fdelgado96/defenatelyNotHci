package com.falopa.smarthome.model;


public class IntegerParam extends Param{
    private Integer value;

    public IntegerParam(Integer value) {
        this.value = value;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }
}
