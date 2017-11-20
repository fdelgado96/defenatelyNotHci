package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.APIConnector;
import com.falopa.smarthome.utils.Callback;

import java.util.ArrayList;

public class Alarm extends Device {
    private String status;

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

    public String getStatus() {
        return status;
    }

    public boolean changeSecurityCode(String oldCode, String newCode) {
        ArrayList<Param> params = new ArrayList<>();
        params.add(new StringParam(oldCode));
        params.add(new StringParam(newCode));
        APIConnector.doAction(id, "changeSecurityCode", params, new Callback() {
            @Override
            public void execute() {
                //Toast
            }
        });
        return true;
    }

    public boolean armStay(String code) {
        final String oldStatus = this.status;
        APIConnector.doAction(id, "armStay", new StringParam(code), new Callback() {
            @Override
            public void execute() {
                Alarm.this.status = oldStatus;
            }
        });
        this.status = "armedStay";
        return true;
    }

    public boolean armAway(String code) {
        final String oldStatus = this.status;
        APIConnector.doAction(id, "armAway", new StringParam(code), new Callback() {
            @Override
            public void execute() {
                Alarm.this.status = oldStatus;
            }
        });
        this.status = "armedAway";
        return true;
    }

    public boolean disarm(String code) {
        final String oldStatus = this.status;
        APIConnector.doAction(id, "disarm", new StringParam(code), new Callback() {
            @Override
            public void execute() {
                Alarm.this.status = oldStatus;
            }
        });
        this.status = "disarmed";
        return true;
    }

}
