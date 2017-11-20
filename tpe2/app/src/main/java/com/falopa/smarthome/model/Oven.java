package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.APIConnector;
import com.falopa.smarthome.utils.Callback;

public class Oven extends Device {
    private boolean status;
    private Integer temperature;
    private String heat;
    private String grill;
    private String convection;

    public Oven(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    public static Oven create(String name, DeviceType type, String roomId) {
        String id = Device.createDevice(name, type, roomId);
        if (id != null) {
            return new Oven(id, name, type, roomId);
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
            final boolean oldStatus = this.status;
            APIConnector.doAction(id, "turnOn", new Callback() {
                @Override
                public void execute() {
                    Oven.this.status = oldStatus;
                }
            });
            this.status = status;
        }
        else {
            final boolean oldStatus = this.status;
            APIConnector.doAction(id, "turnOff", new Callback() {
                @Override
                public void execute() {
                    Oven.this.status = oldStatus;
                }
            });
            this.status = status;
        }
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
                Oven.this.temperature = oldTemp;
            }
        });
        this.temperature = temperature;
        return true;
    }

    public String getHeat() {
        return heat;
    }

    public boolean setHeat(String heat) {
        final String oldHeat = this.heat;
        APIConnector.doAction(id, "setHeat", new StringParam(heat), new Callback() {
            @Override
            public void execute() {
                Oven.this.heat = oldHeat;
            }
        });
        this.heat = heat;
        return true;
    }

    public String getGrill() {
        return grill;
    }

    public boolean setGrill(String grill) {
        final String oldGrill = this.grill;
        APIConnector.doAction(id, "setGrill", new StringParam(grill), new Callback() {
            @Override
            public void execute() {
                Oven.this.grill = oldGrill;
            }
        });
        this.grill = grill;
        return true;
    }

    public String getConvection() {
        return convection;
    }

    public boolean setConvection(String convection) {
        final String oldConv = this.convection;
        APIConnector.doAction(id, "setConvection", new StringParam(convection), new Callback() {
            @Override
            public void execute() {
                Oven.this.convection = oldConv;
            }
        });
        this.convection = convection;
        return true;
    }
}
