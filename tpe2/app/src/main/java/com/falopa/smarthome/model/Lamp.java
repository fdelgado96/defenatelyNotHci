package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.APIConnector;
import com.falopa.smarthome.utils.Callback;

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
        final boolean oldStatus = this.status;
        if(status) {
            APIConnector.doAction(id, "turnOn", new Callback() {
                @Override
                public void execute() {
                    Lamp.this.status = oldStatus;
                }
            });
        }
        else {
            APIConnector.doAction(id, "turnOff", new Callback() {
                @Override
                public void execute() {
                    Lamp.this.status = oldStatus;
                }
            });
        }
        this.status = status;
        return true;
    }

    public String getColor() {
        return color;
    }

    public boolean setColor(String color) {
        final String oldColor = this.color;
        APIConnector.doAction(id, "changeColor", new StringParam(color), new Callback() {
            @Override
            public void execute() {
                Lamp.this.color = oldColor;
            }
        });
        this.color = color;
        return true;
    }

    public Integer getBrightness() {
        return brightness;
    }

    public boolean setBrightness(Integer brightness) {
        final int oldBright = this.brightness;
        APIConnector.doAction(id, "changeBrightness", new IntegerParam(brightness), new Callback() {
            @Override
            public void execute() {
                Lamp.this.brightness = oldBright;
            }
        });
        this.brightness = brightness;
        return true;
    }
}
