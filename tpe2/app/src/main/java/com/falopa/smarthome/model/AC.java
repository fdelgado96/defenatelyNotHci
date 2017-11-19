package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.APIConnector;

public class AC extends Device {
    private boolean status;
    private Integer temperature;
    private String mode;
    private String verticalSwing;
    private String horizontalSwing;
    private String fanSpeed;

    public AC(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    public static AC create(String name, DeviceType type, String roomId) {
        String id = Device.createDevice(name, type, roomId);
        if (id != null) {
            return new AC(id, name, type, roomId);
        }
        return null;
    }

    public boolean getStatus() {
        return status;
    }

    @Override
    public boolean update() {
        //request
        return false;
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

    public String getVerticalSwing() {
        return verticalSwing;
    }

    public boolean setVerticalSwing(String verticalSwing) {
        if(APIConnector.doAction(id, "setVerticalSwing", new StringParam(verticalSwing))) {
            this.verticalSwing = verticalSwing;
            return true;
        }
        return false;
    }

    public String getHorizontalSwing() {
        return horizontalSwing;
    }

    public boolean setHorizontalSwing(String horizontalSwing) {
        if(APIConnector.doAction(id, "setHorizontalSwing", new StringParam(horizontalSwing))) {
            this.horizontalSwing = horizontalSwing;
            return true;
        }
        return false;
    }

    public String getFanSpeed() {
        return fanSpeed;
    }

    public boolean setFanSpeed(String fanSpeed) {
        if(APIConnector.doAction(id, "setFanSpeed", new StringParam(fanSpeed))) {
            this.fanSpeed = fanSpeed;
            return true;
        }
        return false;
    }
}
