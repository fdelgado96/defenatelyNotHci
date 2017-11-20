package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.APIConnector;
import com.falopa.smarthome.utils.Callback;

public class Timer extends Device {
    private boolean status;
    private Integer interval;
    private Integer remaining;

    public Timer(String id, String name, DeviceType type, String roomId) {
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
        final boolean oldStatus = this.status;
        if(status) {
            APIConnector.doAction(id, "start", new Callback() {
                @Override
                public void execute() {
                    Timer.this.status = oldStatus;
                }
            });
        }
        else {
            APIConnector.doAction(id, "stop", new Callback() {
                @Override
                public void execute() {
                    Timer.this.status = oldStatus;
                }
            });
        }
        this.status = status;
        return true;
    }

    public Integer getInterval() {
        return interval;
    }

    public boolean setInterval(Integer interval) {
        final int oldInterval = this.interval;
        APIConnector.doAction(id, "setInterval", new IntegerParam(interval), new Callback() {
            @Override
            public void execute() {
                Timer.this.interval = oldInterval;
            }
        });
        this.interval = interval;
        return true;
    }

    public Integer getRemaining() {
        return remaining;
    }
}
