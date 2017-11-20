package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.DeviceAPI;
import com.falopa.smarthome.utils.Callback;

public class Refrigerator extends Device {
    private Integer freezerTemperature;
    private Integer temperature;
    private String mode;

    public Refrigerator(String id, String name, String typeId, String roomId) {
        super(id, name, typeId, roomId);
    }

    public Refrigerator(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    /*public static Refrigerator create(String name, String typeId, String roomId) {
        String id = DeviceAPI.createDevice(name, typeId, roomId);
        if (id != null) {
            return new Refrigerator(id, name, typeId, roomId);
        }
        return null;
    }*/

    @Override
    public void update(Callback callback) {
        //request
    }

    public Integer getFreezerTemperature() {
        return freezerTemperature;
    }

    public boolean setFreezerTemperature(Integer freezerTemperature) {
        final int oldTemp = this.freezerTemperature;
        DeviceAPI.doAction(id, "setFreezerTemperature", new IntegerParam(freezerTemperature), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
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
        DeviceAPI.doAction(id, "setTemperature", new IntegerParam(temperature), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
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
        DeviceAPI.doAction(id, "setMode", new StringParam(mode), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
                Refrigerator.this.mode = oldMode;
            }
        });
        this.mode = mode;
        return true;
    }
}
