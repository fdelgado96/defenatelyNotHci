package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.DeviceAPI;
import com.falopa.smarthome.utils.Callback;

public class Timer extends Device {
    private boolean status;
    private Integer interval;
    private Integer remaining;

    public Timer(String id, String name, String typeId, String roomId) {
        super(id, name, typeId, roomId);
    }

    public Timer(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    /*public static Timer create(String name, String typeId, String roomId) {
        String id = DeviceAPI.createDevice(name, typeId, roomId);
        if (id != null) {
            return new Timer(id, name, typeId, roomId);
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
            DeviceAPI.doAction(id, "start", new Callback() {
                @Override
                public void onSuccess() {
                }

                @Override
                public void onFail() {
                    Timer.this.status = oldStatus;
                }
            });
        } else {
            DeviceAPI.doAction(id, "stop", new Callback() {
                @Override
                public void onSuccess() {
                }

                @Override
                public void onFail() {
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
        DeviceAPI.doAction(id, "setInterval", new IntegerParam(interval), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
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
