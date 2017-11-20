package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.APIConnector;
import com.falopa.smarthome.utils.Callback;

public class AC extends Device {
    private boolean status;
    private Integer temperature;
    private String mode;
    private String verticalSwing;
    private String horizontalSwing;
    private String fanSpeed;

    public AC(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    public static AC create(String name, DeviceType type, String roomId) {
        String id = Device.createDevice(name, type, roomId);
        if (id != null) {
            return new AC(id, name, type, roomId);
        }
        return null;
    }

    public boolean getStatus() {
        return status;
    }

    @Override
    public boolean update() {
        //request
        return false;
    }

    public boolean setStatus(boolean status) {
        final boolean oldStatus = this.status;
        if(status) {
            APIConnector.doAction(id, "turnOn", new Callback() {
                @Override
                public void execute() {
                    AC.this.status = oldStatus;
                }
            });
        }
        else {
            APIConnector.doAction(id, "turnOff", new Callback() {
                @Override
                public void execute() {
                    AC.this.status = oldStatus;
                }
            });
        }
        this.status = status;
        return true;
    }

    public Integer getTemperature() {
        return temperature;
    }

    public boolean setTemperature(Integer temperature) {
        final int oldTemp = this.temperature;
        APIConnector.doAction(id, "setTemperature", new IntegerParam(temperature), new Callback() {
            @Override
            public void execute() {
                AC.this.temperature = oldTemp;
            }
        });
        this.temperature = temperature;
        return true;
    }

    public String getMode() {
        return mode;
    }

    public boolean setMode(String mode) {
        final String oldMode = this.mode;
        APIConnector.doAction(id, "setMode", new StringParam(mode), new Callback() {
            @Override
            public void execute() {
                AC.this.mode = oldMode;
            }
        });
        this.mode = mode;
        return true;
    }

    public String getVerticalSwing() {
        return verticalSwing;
    }

    public boolean setVerticalSwing(String verticalSwing) {
        final String oldVerticalSwing = this.verticalSwing;
        APIConnector.doAction(id, "setVerticalSwing", new StringParam(verticalSwing), new Callback() {
            @Override
            public void execute() {
                AC.this.verticalSwing = oldVerticalSwing;
            }
        });
        this.verticalSwing = verticalSwing;
        return true;
    }

    public String getHorizontalSwing() {
        return horizontalSwing;
    }

    public boolean setHorizontalSwing(String horizontalSwing) {
        final String oldHorizontalSwing = this.horizontalSwing;
        APIConnector.doAction(id, "setHorizontalSwing", new StringParam(horizontalSwing), new Callback() {
            @Override
            public void execute() {
                AC.this.horizontalSwing = oldHorizontalSwing;
            }
        });
        this.horizontalSwing = horizontalSwing;
        return true;
    }

    public String getFanSpeed() {
        return fanSpeed;
    }

    public boolean setFanSpeed(String fanSpeed) {
        final String oldFanSpeed = this.fanSpeed;
        APIConnector.doAction(id, "setFanSpeed", new StringParam(fanSpeed), new Callback() {
            @Override
            public void execute() {
                AC.this.fanSpeed = oldFanSpeed;
            }
        });
        this.fanSpeed = fanSpeed;
        return true;
    }
}
