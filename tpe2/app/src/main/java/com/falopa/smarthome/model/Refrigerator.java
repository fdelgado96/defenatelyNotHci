package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.APIConnector;

public class Refrigerator extends Device {
    private Integer freezerTemperature;
    private Integer temperature;
    private String mode;

    private Refrigerator(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    public static Refrigerator create(String name, DeviceType type, String roomId) {
        String id = Device.createDevice(name, type, roomId);
        if (id != null) {
            return new Refrigerator(id, name, type, roomId);
        }
        return null;
    }

    @Override
    public boolean update() {
        //request
        return false;
    }

    public Integer getFreezerTemperature() {
        return freezerTemperature;
    }

    public boolean setFreezerTemperature(Integer freezerTemperature) {
        if(APIConnector.doAction(id, "setFreezerTemperature", new IntegerParam(freezerTemperature))) {
            this.freezerTemperature = freezerTemperature;
            return true;
        }
        return false;
    }

    public Integer getTemperature() {
        return temperature;
    }

    public boolean setTemperature(Integer temperature) {
        if(APIConnector.doAction(id, "setTemperature", new IntegerParam(temperature))) {
            this.temperature = temperature;
            return true;
        }
        return false;
    }

    public String getMode() {
        return mode;
    }

    public boolean setMode(String mode) {
        if(APIConnector.doAction(id, "setMode", new StringParam(mode))) {
            this.mode = mode;
            return true;
        }
        return false;
    }
}
