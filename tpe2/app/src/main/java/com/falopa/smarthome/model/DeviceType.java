package com.falopa.smarthome.model;


import java.util.ArrayList;

public class DeviceType {
    private String id;
    private String name;
    private ArrayList<ActionType> actions;

    public DeviceType(String id, String name, ArrayList<ActionType> actions){
        this.id = id;
        this.name = name;
        this.actions = actions;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public ArrayList<ActionType> getActions() {
        return actions;
    }
}
