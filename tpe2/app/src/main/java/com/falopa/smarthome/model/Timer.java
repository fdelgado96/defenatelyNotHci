package com.falopa.smarthome.model;


public class Timer extends Device {
    private boolean status;
    private Integer interval;
    private Integer remaining;

    public Timer(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Integer getInterval() {
        return interval;
    }

    public void setInterval(Integer interval) {
        this.interval = interval;
    }

    public Integer getRemaining() {
        return remaining;
    }

    public void setRemaining(Integer remaining) {
        this.remaining = remaining;
    }
}
