package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.APIConnector;

import java.util.ArrayList;

public class Alarm extends Device {
    private String status;

    private Alarm(String id, String name, DeviceType type, String roomId) {
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
        return APIConnector.doAction(id, "changeSecurityCode", params);
    }

    public boolean armStay(String code) {
        if(APIConnector.doAction(id, "armStay", new StringParam(code))) {
            this.status = "armedStay";
            return true;
        }
        return false;
    }

    public boolean armAway(String code) {
        if(APIConnector.doAction(id, "armAway", new StringParam(code))) {
            this.status = "armedAway";
            return true;
        }
        return false;
    }

    public boolean disarm(String code) {
        if(APIConnector.doAction(id, "disarm", new StringParam(code))) {
            this.status = "disarmed";
            return true;
        }
        return false;
    }

}
