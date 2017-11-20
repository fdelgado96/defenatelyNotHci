package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.APIConnector;
import com.falopa.smarthome.utils.Callback;

public class Blind extends Device {
    private String status;
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
        if(open) {
            final String oldStatus = this.status;
            APIConnector.doAction(id, "up", new Callback(){
                @Override
                public void execute() {
                    Blind.this.status = oldStatus;
                }
            });
            this.status = "opening";
        }
        else {
            final String oldStatus = this.status;
            APIConnector.doAction(id, "down", new Callback() {
                @Override
                public void execute() {
                    Blind.this.status = oldStatus;
                }
            });
            this.status = "opening";
        }
        return true;
    }
}
