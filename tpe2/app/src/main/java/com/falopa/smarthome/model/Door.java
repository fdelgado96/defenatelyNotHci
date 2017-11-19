package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.APIConnector;

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

    public boolean setStatus(boolean status) {
        if(status) {
            if (APIConnector.doAction(id, "open")) {
                this.status = status;
                return true;
            }
        }
        else {
            if (APIConnector.doAction(id, "close")) {
                this.status = status;
                return true;
            }
        }
        return false;
    }

    public boolean isLocked() {
        return locked;
    }

    public boolean setLocked(boolean locked) {
        if(locked) {
            if (APIConnector.doAction(id, "lock")) {
                this.locked = locked;
                return true;
            }
        }
        else {
            if (APIConnector.doAction(id, "unlock")) {
                this.locked = locked;
                return true;
            }
        }
        return false;
    }
}
