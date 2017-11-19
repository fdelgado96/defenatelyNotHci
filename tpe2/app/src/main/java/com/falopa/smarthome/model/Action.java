package com.falopa.smarthome.model;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;


public class Action {
    private String deviceId;
    @SerializedName("actionName")
    private String name;
    private ArrayList<Param> params;

    private transient Device device;
    private transient ActionType type;

    public Action(ActionType type, Device device) {
        this.type = type;
        this.name = type.getName();
        this.device = device;
        this.deviceId = device.getId();
        this.params = new ArrayList<>();
    }

    public Action() { //TODO: le wat
        this.params = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public ArrayList<Param> getParams() {
        return params; //Clone?
    }

    public Device getDevice() {
        if(device == null) {
            //TODO: search for Device
            //Query for deviceId
        }
        return device;
    }

    public ActionType getType() {
        if(type == null) {
            //TODO: search for Type
        }
        return type;
    }

    public boolean addParam(Param param) {
        return params.add(param);
    }

    public boolean removeParam(Param param) {
        return params.remove(param);
    }
}
