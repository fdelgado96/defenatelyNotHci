package com.falopa.smarthome.model;


public class Alarm extends Device {
    private boolean status;

    public Alarm(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
