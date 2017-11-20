package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.DeviceAPI;
import com.falopa.smarthome.utils.Callback;

public class Door extends Device {
    private boolean status;
    private boolean locked;

    public Door(String id, String name, String typeId, String roomId) {
        super(id, name, typeId, roomId);
    }

    public Door(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    /*public static Door create(String name, String typeId, String roomId) {
        String id = DeviceAPI.createDevice(name, typeId, roomId);
        if (id != null) {
            return new Door(id, name, typeId, roomId);
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
            DeviceAPI.doAction(id, "open", new Callback() {
                @Override
                public void onSuccess() {
                }

                @Override
                public void onFail() {
                    Door.this.status = oldStatus;
                }
            });
        } else {
            DeviceAPI.doAction(id, "close", new Callback() {
                @Override
                public void onSuccess() {
                }

                @Override
                public void onFail() {
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
        if (locked) {
            DeviceAPI.doAction(id, "lock", new Callback() {
                @Override
                public void onSuccess() {
                }

                @Override
                public void onFail() {
                    Door.this.locked = oldLocked;
                }
            });
        } else {
            DeviceAPI.doAction(id, "unlock", new Callback() {
                @Override
                public void onSuccess() {
                }

                @Override
                public void onFail() {
                    Door.this.locked = oldLocked;
                }
            });
        }
        this.locked = locked;
        return true;
    }
}
