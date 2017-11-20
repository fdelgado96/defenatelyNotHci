package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.APIConnector;
import com.falopa.smarthome.utils.Callback;

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
        final boolean oldStatus = this.status;
        if(status) {
            APIConnector.doAction(id, "open", new Callback() {
                @Override
                public void execute() {
                    Door.this.status = oldStatus;
                }
            });
        }
        else {
            APIConnector.doAction(id, "close", new Callback() {
                @Override
                public void execute() {
                    Door.this.status = oldStatus;
                }
            });
        }
        this.status = status;
        return true;
    }

    public boolean isLocked() {
        return locked;
    }

    public boolean setLocked(boolean locked) {
        final boolean oldLocked = this.locked;
        if(locked) {
            APIConnector.doAction(id, "lock", new Callback() {
                @Override
                public void execute() {
                    Door.this.locked = oldLocked;
                }
            });
        }
        else {
            APIConnector.doAction(id, "unlock", new Callback() {
                @Override
                public void execute() {
                    Door.this.locked = oldLocked;
                }
            });
        }
        this.locked = locked;
        return true;
    }
}
