package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.DeviceAPI;
import com.falopa.smarthome.utils.Callback;

public class Blind extends Device {
    private String status;
    private Integer level;

    public Blind(String id, String name, String typeId, String roomId) {
        super(id, name, typeId, roomId);
    }

    public Blind(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

   /* public static Blind create(String name, String typeId, String roomId) {
        String id = DeviceAPI.createDevice(name, typeId, roomId);
        if (id != null) {
            return new Blind(id, name, typeId, roomId);
        }
        return null;
    }*/

    @Override
    public void update(Callback callback) {
        //request
    }

    public String getStatus() {
//        if(status.equals("opening") || status.equals("closing"))
//            update();
        return status;
    }

    public Integer getLevel() {
//        if(status.equals("opening") || status.equals("closing"))
//            update();
        return level;
    }

    public boolean setOpen(boolean open) {
        if (open) {
            final String oldStatus = this.status;
            DeviceAPI.doAction(id, "up", new Callback() {
                @Override
                public void onSuccess() {
                }

                @Override
                public void onFail() {
                    Blind.this.status = oldStatus;
                }
            });
            this.status = "opening";
        } else {
            final String oldStatus = this.status;
            DeviceAPI.doAction(id, "down", new Callback() {
                @Override
                public void onSuccess() {
                }

                @Override
                public void onFail() {
                    Blind.this.status = oldStatus;
                }
            });
            this.status = "opening";
        }
        return true;
    }
}
