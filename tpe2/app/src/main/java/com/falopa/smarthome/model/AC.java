package com.falopa.smarthome.model;


import android.telecom.Call;

import com.falopa.smarthome.utils.DeviceAPI;
import com.falopa.smarthome.utils.Callback;

public class AC extends Device {
    private boolean status;
    private Integer temperature;
    private String mode;
    private String verticalSwing;
    private String horizontalSwing;
    private String fanSpeed;

    public AC(String id, String name, String typeId, String roomId) {
        super(id, name, typeId, roomId);
    }

    public AC(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    public boolean getStatus() {
        return status;
    }

    @Override
    public void update(Callback callback) {
        //request
    }

    public boolean setStatus(boolean status) {
        final boolean oldStatus = this.status;
        if (status) {
            DeviceAPI.doAction(id, "turnOn", new Callback() {
                @Override
                public void onSuccess() {
                }

                @Override
                public void onFail() {
                    AC.this.status = oldStatus;
                }
            });
        } else {
            DeviceAPI.doAction(id, "turnOff", new Callback() {
                @Override
                public void onSuccess() {
                }

                @Override
                public void onFail() {
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
        DeviceAPI.doAction(id, "setTemperature", new IntegerParam(temperature), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
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
        DeviceAPI.doAction(id, "setMode", new StringParam(mode), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
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
        DeviceAPI.doAction(id, "setVerticalSwing", new StringParam(verticalSwing), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
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
        DeviceAPI.doAction(id, "setHorizontalSwing", new StringParam(horizontalSwing), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
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
        DeviceAPI.doAction(id, "setFanSpeed", new StringParam(fanSpeed), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
                AC.this.fanSpeed = oldFanSpeed;
            }
        });
        this.fanSpeed = fanSpeed;
        return true;
    }
}
