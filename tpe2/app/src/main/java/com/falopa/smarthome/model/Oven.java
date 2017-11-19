package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.APIConnector;

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
            if (APIConnector.doAction(id, "turnOn")) {
                this.status = status;
                return true;
            }
        }
        else {
            if (APIConnector.doAction(id, "turnOff")) {
                this.status = status;
                return true;
            }
        }
        return false;
    }

    public Integer getTemperature() {
        return temperature;
    }

    public boolean setTemperature(Integer temperature) {
        if(APIConnector.doAction(id, "setTemperature", new IntegerParam(temperature))) {
            this.temperature = temperature;
            return true;
        }
        return false;
    }

    public String getHeat() {
        return heat;
    }

    public boolean setHeat(String heat) {
        if(APIConnector.doAction(id, "setHeat", new StringParam(heat))) {
            this.heat = heat;
            return true;
        }
        return false;
    }

    public String getGrill() {
        return grill;
    }

    public boolean setGrill(String grill) {
        if(APIConnector.doAction(id, "setGrill", new StringParam(grill))) {
            this.grill = grill;
            return true;
        }
        return false;
    }

    public String getConvection() {
        return convection;
    }

    public boolean setConvection(String convection) {
        if(APIConnector.doAction(id, "setConvection", new StringParam(convection))) {
            this.convection = convection;
            return true;
        }
        return false;
    }
}
