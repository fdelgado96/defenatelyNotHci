package com.falopa.smarthome.model;


import java.util.ArrayList;

public class DeviceType {
    private String id;
    private String name;
    private ArrayList<ActionType> actions;

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
