package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.APIConnector;

public class Timer extends Device {
    private boolean status;
    private Integer interval;
    private Integer remaining;

    private Timer(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    public static Timer create(String name, DeviceType type, String roomId) {
        String id = Device.createDevice(name, type, roomId);
        if (id != null) {
            return new Timer(id, name, type, roomId);
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
            if (APIConnector.doAction(id, "start")) {
                this.status = status;
                return true;
            }
        }
        else {
            if (APIConnector.doAction(id, "stop")) {
                this.status = status;
                return true;
            }
        }
        return false;
    }

    public Integer getInterval() {
        return interval;
    }

    public boolean setInterval(Integer interval) {
        if(APIConnector.doAction(id, "setInterval", new IntegerParam(interval))) {
            this.interval = interval;
            return true;
        }
        return false;
    }

    public Integer getRemaining() {
        return remaining;
    }
}
