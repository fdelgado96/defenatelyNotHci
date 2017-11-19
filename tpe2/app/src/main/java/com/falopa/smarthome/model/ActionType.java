package com.falopa.smarthome.model;

import java.util.ArrayList;


public class ActionType {
    private String name;
    private ArrayList<ParamType> params;

    public String getName() {
        return name;
    }

    public ArrayList<ParamType> getParams() {
        return params;
    }
}
