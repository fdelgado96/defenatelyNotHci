package com.falopa.smarthome.model;


public class Door extends Device {
    private boolean status;
    private boolean locked;

    public Door(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    public static Door create(String name, DeviceType type, String roomId) {
        String id = Device.createDevice(name, type, roomId);
        if (id != null) {
            return new Door(id, name, type, roomId);
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

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }
}
