package com.falopa.smarthome.model;


import com.falopa.smarthome.utils.DeviceAPI;
import com.falopa.smarthome.utils.Callback;

public class Oven extends Device {
    private boolean status;
    private Integer temperature;
    private String heat;
    private String grill;
    private String convection;

    public Oven(String id, String name, String typeId, String roomId) {
        super(id, name, typeId, roomId);
    }

    public Oven(String id, String name, DeviceType type, String roomId) {
        super(id, name, type, roomId);
    }

    /*public static Oven create(String name, String typeId, String roomId) {
        String id = DeviceAPI.createDevice(name, typeId, roomId);
        if (id != null) {
            return new Oven(id, name, typeId, roomId);
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
        if (status) {
            final boolean oldStatus = this.status;
            DeviceAPI.doAction(id, "turnOn", new Callback() {
                @Override
                public void onSuccess() {
                }

                @Override
                public void onFail() {
                    Oven.this.status = oldStatus;
                }
            });
            this.status = status;
        } else {
            final boolean oldStatus = this.status;
            DeviceAPI.doAction(id, "turnOff", new Callback() {
                @Override
                public void onSuccess() {
                }

                @Override
                public void onFail() {
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
        DeviceAPI.doAction(id, "setTemperature", new IntegerParam(temperature), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
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
        DeviceAPI.doAction(id, "setHeat", new StringParam(heat), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
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
        DeviceAPI.doAction(id, "setGrill", new StringParam(grill), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
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
        DeviceAPI.doAction(id, "setConvection", new StringParam(convection), new Callback() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onFail() {
                Oven.this.convection = oldConv;
            }
        });
        this.convection = convection;
        return true;
    }
}
