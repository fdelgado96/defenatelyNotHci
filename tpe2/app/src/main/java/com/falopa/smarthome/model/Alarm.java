package com.falopa.smarthome.model;


public class Alarm extends Device {
    private boolean status;

    public Alarm(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    public static Alarm create(String name, DeviceType type, String roomId) {
        String id = Device.createDevice(name, type, roomId);
        if (id != null) {
            return new Alarm(id, name, type, roomId);
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
}
