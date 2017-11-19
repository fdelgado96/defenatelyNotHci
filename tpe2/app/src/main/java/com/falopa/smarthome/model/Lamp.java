package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.APIConnector;

public class Lamp extends Device {
    private boolean status;
    private String color;
    private Integer brightness;

    public Lamp(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    public static Lamp create(String name, DeviceType type, String roomId) {
        String id = Device.createDevice(name, type, roomId);
        if (id != null) {
            return new Lamp(id, name, type, roomId);
        }
        return null;
    }

    @Override
    public boolean update() {
        //request
        return false;
    }

    public boolean getStatus() {
        return status;
    }

    public boolean setStatus(boolean status) {
        if(status) {
            if (APIConnector.doAction(id, "turnOn")) {
                this.status = status;
                return true;
            }
        }
        else {
            if (APIConnector.doAction(id, "turnOff")) {
                this.status = status;
                return true;
            }
        }
        return false;
    }

    public String getColor() {
        return color;
    }

    public boolean setColor(String color) {
        if(APIConnector.doAction(id, "changeColor", new StringParam(color))) {
            this.color = color;
            return true;
        }
        return false;
    }

    public Integer getBrightness() {
        return brightness;
    }

    public boolean setBrightness(Integer brightness) {
        if(APIConnector.doAction(id, "changeBrightness", new IntegerParam(brightness))) {
            this.brightness = brightness;
            return true;
        }
        return false;
    }
}
