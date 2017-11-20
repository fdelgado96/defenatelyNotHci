package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.DeviceAPI;
import com.falopa.smarthome.utils.Callback;

public class Lamp extends Device {
    private boolean status;
    private String color;
    private Integer brightness;

    public Lamp(String id, String name, String typeId, String roomId) {
        super(id, name, typeId, roomId);
    }

    public Lamp(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    /*public static Lamp create(String name, String typeId, String roomId) {
        String id = DeviceAPI.createDevice(name, typeId, roomId);
        if (id != null) {
            return new Lamp(id, name, typeId, roomId);
        }
        return null;
    }*/

    @Override
    public void update(Callback callback) {
        //request
    }

    public boolean getStatus() {
        return status;
    }

    public boolean setStatus(boolean status) {
        final boolean oldStatus = this.status;
        if (status) {
            DeviceAPI.doAction(id, "turnOn", new Callback() {
                @Override
                public void onSuccess() {
                }

                @Override
                public void onFail() {
                    Lamp.this.status = oldStatus;
                }
            });
        } else {
            DeviceAPI.doAction(id, "turnOff", new Callback() {
                @Override
                public void onSuccess() {
                }

                @Override
                public void onFail() {
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
        DeviceAPI.doAction(id, "changeColor", new StringParam(color), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
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
        DeviceAPI.doAction(id, "changeBrightness", new IntegerParam(brightness), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
                Lamp.this.brightness = oldBright;
            }
        });
        this.brightness = brightness;
        return true;
    }
}
