package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.APIConnector;
import com.falopa.smarthome.utils.Callback;

public class Refrigerator extends Device {
    private Integer freezerTemperature;
    private Integer temperature;
    private String mode;

    public Refrigerator(String id, String name, DeviceType type, String roomId) {
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
        final int oldTemp = this.freezerTemperature;
        APIConnector.doAction(id, "setFreezerTemperature", new IntegerParam(freezerTemperature), new Callback() {
            @Override
            public void execute() {
                Refrigerator.this.freezerTemperature = oldTemp;
            }
        });
        this.freezerTemperature = freezerTemperature;
        return true;
    }

    public Integer getTemperature() {
        return temperature;
    }

    public boolean setTemperature(Integer temperature) {
        final int oldTemp = this.temperature;
        APIConnector.doAction(id, "setTemperature", new IntegerParam(temperature), new Callback() {
            @Override
            public void execute() {
                Refrigerator.this.temperature = oldTemp;
            }
        });
        this.temperature = temperature;
        return true;
    }

    public String getMode() {
        return mode;
    }

    public boolean setMode(String mode) {
        final String oldMode = this.mode;
        APIConnector.doAction(id, "setMode", new StringParam(mode), new Callback() {
            @Override
            public void execute() {
                Refrigerator.this.mode = oldMode;
            }
        });
        this.mode = mode;
        return true;
    }
}
