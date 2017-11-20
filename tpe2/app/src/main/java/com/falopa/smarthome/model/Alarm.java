package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.DeviceAPI;
import com.falopa.smarthome.utils.Callback;

import java.util.ArrayList;

public class Alarm extends Device {
    private String status;

    public Alarm(String id, String name, String typeId, String roomId) {
        super(id, name, typeId, roomId);
    }

    public Alarm(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    /*public static Alarm create(String name, String typeId, String roomId) {
        String id = DeviceAPI.createDevice(name, typeId, roomId);
        if (id != null) {
            return new Alarm(id, name, typeId, roomId);
        }
        return null;
    }*/

    @Override
    public void update(Callback callback) {
        //request
    }

    public String getStatus() {
        return status;
    }

    public boolean changeSecurityCode(String oldCode, String newCode) {
        ArrayList<Param> params = new ArrayList<>();
        params.add(new StringParam(oldCode));
        params.add(new StringParam(newCode));
        DeviceAPI.doAction(id, "changeSecurityCode", params, new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
                //Toast
            }
        });
        return true;
    }

    public boolean armStay(String code) {
        final String oldStatus = this.status;
        DeviceAPI.doAction(id, "armStay", new StringParam(code), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
                Alarm.this.status = oldStatus;
            }
        });
        this.status = "armedStay";
        return true;
    }

    public boolean armAway(String code) {
        final String oldStatus = this.status;
        DeviceAPI.doAction(id, "armAway", new StringParam(code), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
                Alarm.this.status = oldStatus;
            }
        });
        this.status = "armedAway";
        return true;
    }

    public boolean disarm(String code) {
        final String oldStatus = this.status;
        DeviceAPI.doAction(id, "disarm", new StringParam(code), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
                Alarm.this.status = oldStatus;
            }
        });
        this.status = "disarmed";
        return true;
    }

}
