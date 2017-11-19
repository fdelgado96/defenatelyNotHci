package com.falopa.smarthome.model;


public class Refrigerator extends Device {
    private Integer freezerTemperature;
    private Integer temperature;
    private String mode;

    public Refrigerator(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    public Integer getFreezerTemperature() {
        return freezerTemperature;
    }

    public void setFreezerTemperature(Integer freezerTemperature) {
        this.freezerTemperature = freezerTemperature;
    }

    public Integer getTemperature() {
        return temperature;
    }

    public void setTemperature(Integer temperature) {
        this.temperature = temperature;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }
}
