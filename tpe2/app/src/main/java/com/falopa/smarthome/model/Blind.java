package com.falopa.smarthome.model;


public class Blind extends Device {
    private boolean status;
    private Integer level;

    public Blind(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    public static Blind create(String name, DeviceType type, String roomId) {
        String id = Device.createDevice(name, type, roomId);
        if (id != null) {
            return new Blind(id, name, type, roomId);
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

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }
}
