package com.falopa.smarthome.model;


public class NumberParamType extends ParamType {
    private Integer minValue;
    private Integer maxValue;

    public NumberParamType(String name, String type, String desc, Integer minValue, Integer maxValue) {
        this.name = name;
        this.type = type;
        this.description = desc;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    public Integer getMinValue() {
        return minValue;
    }

    public Integer getMaxValue() {
        return maxValue;
    }
}
