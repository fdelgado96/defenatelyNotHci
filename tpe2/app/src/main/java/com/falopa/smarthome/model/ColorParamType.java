package com.falopa.smarthome.model;


public class ColorParamType extends ParamType {
    private String maxValue;
    private String minValue;

    public ColorParamType(String name, String type, String desc, String minValue, String maxValue) {
        this.name = name;
        this.type = type;
        this.description = desc;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    public String getMaxValue() {
        return maxValue;
    }

    public String getMinValue() {
        return minValue;
    }
}
